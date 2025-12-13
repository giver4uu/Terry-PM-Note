/**
 * Data Migration Utilities
 * 
 * Converts existing React Flow-based ontology data to the new pure schema format.
 * Handles:
 * - Property normalization (deduplication)
 * - Class extraction
 * - Relation extraction from edges
 */

import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData, PropertyDefinition } from '../types/ontology';
import {
    OntologySchema,
    OntologyClass,
    OntologyProperty,
    ClassPropertyLink,
    OntologyRelation
} from '../types/schema';

// =============================================================================
// Property Normalization
// =============================================================================

/**
 * Creates a unique key for property deduplication.
 * Properties with same name and type are considered identical.
 */
function createPropertyKey(prop: PropertyDefinition): string {
    return `${prop.name.toLowerCase()}::${prop.type}`;
}

/**
 * Normalizes properties by merging duplicates.
 * Returns:
 * - Unique properties map
 * - Mapping from old property IDs to new normalized IDs
 */
export function normalizeProperties(
    nodes: Node<OntologyNodeData>[]
): {
    properties: Map<string, OntologyProperty>;
    idMapping: Map<string, string>;  // oldId -> newId
} {
    const properties = new Map<string, OntologyProperty>();
    const idMapping = new Map<string, string>();
    const seenKeys = new Map<string, string>();  // key -> propertyId

    nodes.forEach(node => {
        if (node.data.kind !== 'class') return;

        node.data.properties.forEach(prop => {
            const key = createPropertyKey(prop);

            if (seenKeys.has(key)) {
                // Property already exists, map to existing ID
                idMapping.set(prop.id, seenKeys.get(key)!);
            } else {
                // New unique property
                const newId = prop.name.toLowerCase().replace(/\s+/g, '_');
                seenKeys.set(key, newId);
                idMapping.set(prop.id, newId);

                properties.set(newId, {
                    id: newId,
                    name: prop.name,
                    dataType: prop.type,
                    description: prop.description
                });
            }
        });
    });

    return { properties, idMapping };
}

// =============================================================================
// Class Extraction
// =============================================================================

/**
 * Extracts class definitions from React Flow nodes.
 */
export function extractClasses(
    nodes: Node<OntologyNodeData>[]
): Map<string, OntologyClass> {
    const classes = new Map<string, OntologyClass>();

    nodes.forEach(node => {
        if (node.data.kind !== 'class') return;

        classes.set(node.id, {
            id: node.id,
            name: node.data.label,
            description: node.data.description
        });
    });

    return classes;
}

// =============================================================================
// Property Links Extraction
// =============================================================================

/**
 * Creates class-property links using the normalized property IDs.
 */
export function extractPropertyLinks(
    nodes: Node<OntologyNodeData>[],
    idMapping: Map<string, string>
): ClassPropertyLink[] {
    const links: ClassPropertyLink[] = [];

    nodes.forEach(node => {
        if (node.data.kind !== 'class') return;

        node.data.properties.forEach(prop => {
            const normalizedPropertyId = idMapping.get(prop.id);
            if (!normalizedPropertyId) return;

            links.push({
                classId: node.id,
                propertyId: normalizedPropertyId,
                required: prop.required
            });
        });
    });

    return links;
}

// =============================================================================
// Relation Extraction
// =============================================================================

/**
 * Extracts relations from React Flow edges.
 */
export function extractRelations(
    edges: Edge<OntologyEdgeData>[]
): OntologyRelation[] {
    return edges
        .filter(edge => !edge.data?.isPropertyEdge)  // Exclude property edges from Graph View
        .map(edge => ({
            id: edge.id,
            sourceClassId: edge.source,
            targetClassId: edge.target,
            name: edge.data?.label || 'RELATION',
            cardinality: edge.data?.cardinality || '1:1',
            description: edge.data?.description
        }));
}

// =============================================================================
// Full Migration
// =============================================================================

/**
 * Migrates complete React Flow ontology to pure schema format.
 */
export function migrateToSchema(
    nodes: Node<OntologyNodeData>[],
    edges: Edge<OntologyEdgeData>[]
): OntologySchema {
    // Filter to only class nodes (exclude property nodes from Graph View)
    const classNodes = nodes.filter(n => n.data.kind !== 'property');

    // Step 1: Normalize properties (deduplicate)
    const { properties, idMapping } = normalizeProperties(classNodes);

    // Step 2: Extract classes
    const classes = extractClasses(classNodes);

    // Step 3: Create property links
    const propertyLinks = extractPropertyLinks(classNodes, idMapping);

    // Step 4: Extract relations
    const relations = extractRelations(edges);

    return {
        classes,
        properties,
        propertyLinks,
        relations,
        version: 1,
        lastModified: new Date().toISOString()
    };
}

// =============================================================================
// Migration Report
// =============================================================================

export interface MigrationReport {
    classCount: number;
    propertyCount: number;
    originalPropertyCount: number;
    deduplicatedCount: number;
    relationCount: number;
    duplicateProperties: Array<{
        name: string;
        occurrences: number;
        classes: string[];
    }>;
}

/**
 * Generates a report of the migration results.
 */
export function generateMigrationReport(
    originalNodes: Node<OntologyNodeData>[],
    schema: OntologySchema
): MigrationReport {
    const classNodes = originalNodes.filter(n => n.data.kind !== 'property');

    // Count original properties
    let originalPropertyCount = 0;
    const propertyOccurrences = new Map<string, string[]>();

    classNodes.forEach(node => {
        node.data.properties.forEach(prop => {
            originalPropertyCount++;
            const key = `${prop.name.toLowerCase()}::${prop.type}`;
            const classes = propertyOccurrences.get(key) || [];
            classes.push(node.data.label);
            propertyOccurrences.set(key, classes);
        });
    });

    // Find duplicates
    const duplicateProperties: MigrationReport['duplicateProperties'] = [];
    propertyOccurrences.forEach((classes, key) => {
        if (classes.length > 1) {
            const [name] = key.split('::');
            duplicateProperties.push({
                name,
                occurrences: classes.length,
                classes
            });
        }
    });

    return {
        classCount: schema.classes.size,
        propertyCount: schema.properties.size,
        originalPropertyCount,
        deduplicatedCount: originalPropertyCount - schema.properties.size,
        relationCount: schema.relations.length,
        duplicateProperties
    };
}

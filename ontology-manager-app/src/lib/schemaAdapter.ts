/**
 * Schema Adapter
 * 
 * Converts between pure OntologySchema and React Flow nodes/edges.
 * This adapter layer keeps the schema layer clean while providing
 * the data format React Flow needs for visualization.
 */

import { Node, Edge, MarkerType } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData, PropertyDefinition } from '../types/ontology';
import {
    OntologySchema,
    OntologyClass,
    getClassProperties
} from '../types/schema';

// =============================================================================
// Types
// =============================================================================

export interface NodePosition {
    x: number;
    y: number;
}

export type PositionMap = Map<string, NodePosition>;

// =============================================================================
// Schema → React Flow Conversion
// =============================================================================

/**
 * Converts schema classes to React Flow nodes for Schema View.
 */
export function schemaToClassNodes(
    schema: OntologySchema,
    positions: PositionMap,
    viewMode: 'schema' | 'graph' = 'schema'
): Node<OntologyNodeData>[] {
    const nodes: Node<OntologyNodeData>[] = [];

    schema.classes.forEach((cls, classId) => {
        // Get properties for this class
        const classProperties = getClassProperties(schema, classId);

        // Convert to PropertyDefinition format for backward compatibility
        const properties: PropertyDefinition[] = classProperties.map(prop => ({
            id: prop.id,
            name: prop.name,
            type: prop.dataType,
            required: prop.required,
            description: prop.description
        }));

        const position = positions.get(classId) || { x: Math.random() * 400, y: Math.random() * 400 };

        nodes.push({
            id: classId,
            type: viewMode === 'graph' ? 'graphNode' : 'classNode',
            position,
            data: {
                label: cls.name,
                kind: 'class',
                description: cls.description,
                properties,
                rules: []
            }
        });
    });

    return nodes;
}

/**
 * Expands properties as separate nodes for Graph View.
 */
export function schemaToPropertyNodes(
    schema: OntologySchema,
    classPositions: PositionMap
): Node<OntologyNodeData>[] {
    const propertyNodes: Node<OntologyNodeData>[] = [];
    const processedProperties = new Set<string>();

    // Group property links by property
    const propertyToClasses = new Map<string, string[]>();
    schema.propertyLinks.forEach(link => {
        const classes = propertyToClasses.get(link.propertyId) || [];
        classes.push(link.classId);
        propertyToClasses.set(link.propertyId, classes);
    });

    // Create one node per unique property
    schema.properties.forEach((prop, propId) => {
        if (processedProperties.has(propId)) return;
        processedProperties.add(propId);

        // Position property nodes based on average position of connected classes
        const connectedClasses = propertyToClasses.get(propId) || [];
        let avgX = 0, avgY = 0;
        let count = 0;

        connectedClasses.forEach(classId => {
            const pos = classPositions.get(classId);
            if (pos) {
                avgX += pos.x;
                avgY += pos.y;
                count++;
            }
        });

        const basePosition = count > 0
            ? { x: avgX / count, y: avgY / count + 150 }
            : { x: Math.random() * 400, y: Math.random() * 400 };

        // Get required status from first link (for display)
        const firstLink = schema.propertyLinks.find(l => l.propertyId === propId);

        propertyNodes.push({
            id: `prop_${propId}`,
            type: 'graphNode',
            position: basePosition,
            data: {
                label: prop.name,
                kind: 'property',
                description: prop.description,
                properties: [],
                rules: [],
                _metadata: {
                    originalType: prop.dataType,
                    originalRequired: firstLink?.required || false,
                    originalId: propId
                }
            }
        });
    });

    return propertyNodes;
}

/**
 * Creates edges connecting classes to shared properties in Graph View.
 */
export function schemaToPropertyEdges(
    schema: OntologySchema
): Edge<OntologyEdgeData>[] {
    return schema.propertyLinks.map(link => ({
        id: `e_prop_${link.classId}_${link.propertyId}`,
        source: link.classId,
        target: `prop_${link.propertyId}`,
        type: 'default',
        animated: false,
        style: { stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4' },
        data: {
            label: '',
            cardinality: '1:1' as const,
            isPropertyEdge: true
        }
    }));
}

/**
 * Converts schema relations to React Flow edges.
 */
export function schemaToRelationEdges(
    schema: OntologySchema
): Edge<OntologyEdgeData>[] {
    return schema.relations.map(rel => ({
        id: rel.id,
        source: rel.sourceClassId,
        target: rel.targetClassId,
        type: 'smoothstep',
        label: rel.name,
        markerEnd: { type: MarkerType.ArrowClosed },
        data: {
            label: rel.name,
            cardinality: rel.cardinality,
            description: rel.description
        }
    }));
}

// =============================================================================
// Combined Conversion Functions
// =============================================================================

/**
 * Generates all nodes for Schema View (classes only).
 */
export function schemaToSchemaViewNodes(
    schema: OntologySchema,
    positions: PositionMap
): Node<OntologyNodeData>[] {
    return schemaToClassNodes(schema, positions, 'schema');
}

/**
 * Generates all nodes for Graph View (classes + properties).
 */
export function schemaToGraphViewNodes(
    schema: OntologySchema,
    positions: PositionMap
): Node<OntologyNodeData>[] {
    const classNodes = schemaToClassNodes(schema, positions, 'graph');
    const propertyNodes = schemaToPropertyNodes(schema, positions);
    return [...classNodes, ...propertyNodes];
}

/**
 * Generates all edges for Schema View (relations only).
 */
export function schemaToSchemaViewEdges(
    schema: OntologySchema
): Edge<OntologyEdgeData>[] {
    return schemaToRelationEdges(schema);
}

/**
 * Generates all edges for Graph View (relations + property connections).
 */
export function schemaToGraphViewEdges(
    schema: OntologySchema
): Edge<OntologyEdgeData>[] {
    const relationEdges = schemaToRelationEdges(schema);
    const propertyEdges = schemaToPropertyEdges(schema);
    return [...relationEdges, ...propertyEdges];
}

// =============================================================================
// Position Extraction
// =============================================================================

/**
 * Extracts position map from existing React Flow nodes.
 */
export function extractPositions(
    nodes: Node<OntologyNodeData>[]
): PositionMap {
    const positions = new Map<string, NodePosition>();

    nodes.forEach(node => {
        // Only store positions for class nodes
        if (node.data.kind !== 'property') {
            positions.set(node.id, { ...node.position });
        }
    });

    return positions;
}

/**
 * Generates default positions for classes using a grid layout.
 */
export function generateDefaultPositions(
    classes: Map<string, OntologyClass>,
    columns: number = 3
): PositionMap {
    const positions = new Map<string, NodePosition>();
    const spacing = { x: 350, y: 250 };
    const offset = { x: 50, y: 50 };

    let index = 0;
    classes.forEach((_, classId) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        positions.set(classId, {
            x: offset.x + col * spacing.x,
            y: offset.y + row * spacing.y
        });

        index++;
    });

    return positions;
}

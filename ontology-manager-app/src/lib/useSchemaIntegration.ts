/**
 * Schema Integration Hook
 * 
 * Provides integration between the new pure schema layer and existing
 * React Flow-based components. This hook handles:
 * - Initial schema loading
 * - Syncing schema changes to React Flow nodes/edges
 * - Migration from legacy localStorage data
 */

import { useEffect, useMemo, useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { useSchemaStore } from '../stores/useSchemaStore';
import { OntologyNodeData, OntologyEdgeData } from '../types/ontology';
import { initialSchema, initialPositions } from './initialSchema';
import {
    schemaToSchemaViewNodes,
    schemaToSchemaViewEdges,
    schemaToGraphViewNodes,
    schemaToGraphViewEdges,
    PositionMap
} from './schemaAdapter';

// =============================================================================
// Hook Return Type
// =============================================================================

interface UseSchemaIntegration {
    // Derived React Flow data
    nodes: Node<OntologyNodeData>[];
    edges: Edge<OntologyEdgeData>[];

    // Schema state
    isInitialized: boolean;

    // Actions that update schema
    addClass: (name: string, description?: string) => string;
    updateClass: (id: string, name: string, description?: string) => void;
    removeClass: (id: string) => void;

    addPropertyToClass: (classId: string, propertyName: string, dataType: 'text' | 'number' | 'date' | 'boolean', required: boolean, description?: string) => void;
    removePropertyFromClass: (classId: string, propertyId: string) => void;
    updatePropertyRequired: (classId: string, propertyId: string, required: boolean) => void;

    // Get shared properties
    getAvailableProperties: () => Array<{ id: string; name: string; dataType: string; usedByClasses: string[] }>;
    linkExistingProperty: (classId: string, propertyId: string, required: boolean) => void;
}

// =============================================================================
// Position Management
// =============================================================================

let positionMap: PositionMap = new Map(initialPositions);

export function updateNodePosition(nodeId: string, x: number, y: number) {
    positionMap.set(nodeId, { x, y });
}

export function getNodePositions(): PositionMap {
    return positionMap;
}

// =============================================================================
// Main Hook
// =============================================================================

export function useSchemaIntegration(viewMode: 'schema' | 'graph' = 'schema'): UseSchemaIntegration {
    const { schema, setSchema, addClass: addClassToStore, updateClass: updateClassInStore, removeClass: removeClassFromStore, addProperty, linkPropertyToClass, unlinkPropertyFromClass, updatePropertyLink } = useSchemaStore();

    // Initialize schema on first load
    useEffect(() => {
        if (schema.classes.size === 0) {
            setSchema(initialSchema);
        }
    }, [schema.classes.size, setSchema]);

    // Derive React Flow nodes from schema
    const nodes = useMemo(() => {
        if (viewMode === 'graph') {
            return schemaToGraphViewNodes(schema, positionMap);
        }
        return schemaToSchemaViewNodes(schema, positionMap);
    }, [schema, viewMode]);

    // Derive React Flow edges from schema
    const edges = useMemo(() => {
        if (viewMode === 'graph') {
            return schemaToGraphViewEdges(schema);
        }
        return schemaToSchemaViewEdges(schema);
    }, [schema, viewMode]);

    // === Class Actions ===
    const addClass = useCallback((name: string, description?: string): string => {
        const id = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
        addClassToStore({ id, name, description });
        // Set default position
        const existingCount = schema.classes.size;
        positionMap.set(id, { x: 100 + (existingCount % 4) * 300, y: 100 + Math.floor(existingCount / 4) * 200 });
        return id;
    }, [addClassToStore, schema.classes.size]);

    const updateClass = useCallback((id: string, name: string, description?: string) => {
        updateClassInStore(id, { name, description });
    }, [updateClassInStore]);

    const removeClass = useCallback((id: string) => {
        removeClassFromStore(id);
        positionMap.delete(id);
    }, [removeClassFromStore]);

    // === Property Actions ===
    const addPropertyToClass = useCallback((
        classId: string,
        propertyName: string,
        dataType: 'text' | 'number' | 'date' | 'boolean',
        required: boolean,
        description?: string
    ) => {
        const propertyId = propertyName.toLowerCase().replace(/\s+/g, '_');

        // Check if property already exists globally
        if (!schema.properties.has(propertyId)) {
            // Create new global property
            addProperty({
                id: propertyId,
                name: propertyName,
                dataType,
                description
            });
        }

        // Link to class
        linkPropertyToClass(classId, propertyId, required);
    }, [schema.properties, addProperty, linkPropertyToClass]);

    const removePropertyFromClass = useCallback((classId: string, propertyId: string) => {
        unlinkPropertyFromClass(classId, propertyId);
    }, [unlinkPropertyFromClass]);

    const updatePropertyRequired = useCallback((classId: string, propertyId: string, required: boolean) => {
        updatePropertyLink(classId, propertyId, { required });
    }, [updatePropertyLink]);

    // === Property Discovery ===
    const getAvailableProperties = useCallback(() => {
        const result: Array<{ id: string; name: string; dataType: string; usedByClasses: string[] }> = [];

        schema.properties.forEach((prop, propId) => {
            const usedByClasses = schema.propertyLinks
                .filter(link => link.propertyId === propId)
                .map(link => {
                    const cls = schema.classes.get(link.classId);
                    return cls?.name || link.classId;
                });

            result.push({
                id: propId,
                name: prop.name,
                dataType: prop.dataType,
                usedByClasses
            });
        });

        return result;
    }, [schema]);

    const linkExistingProperty = useCallback((classId: string, propertyId: string, required: boolean) => {
        linkPropertyToClass(classId, propertyId, required);
    }, [linkPropertyToClass]);

    return {
        nodes,
        edges,
        isInitialized: schema.classes.size > 0,
        addClass,
        updateClass,
        removeClass,
        addPropertyToClass,
        removePropertyFromClass,
        updatePropertyRequired,
        getAvailableProperties,
        linkExistingProperty
    };
}

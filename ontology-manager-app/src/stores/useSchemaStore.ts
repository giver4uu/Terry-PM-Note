/**
 * Pure Ontology Schema Store
 * 
 * Manages the ontology schema state completely separate from UI concerns.
 * This store handles:
 * - Class CRUD operations
 * - Property CRUD operations (global property pool)
 * - Property-Class linking
 * - Relation CRUD operations
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
    OntologySchema,
    OntologyClass,
    OntologyProperty,
    ClassPropertyLink,
    OntologyRelation,
    createEmptySchema
} from '../types/schema';

// =============================================================================
// Store Interface
// =============================================================================

interface SchemaState {
    schema: OntologySchema;

    // === Class Operations ===
    addClass: (cls: OntologyClass) => void;
    updateClass: (id: string, updates: Partial<Omit<OntologyClass, 'id'>>) => void;
    removeClass: (id: string) => void;
    getClass: (id: string) => OntologyClass | undefined;

    // === Property Operations (Global Pool) ===
    addProperty: (prop: OntologyProperty) => void;
    updateProperty: (id: string, updates: Partial<Omit<OntologyProperty, 'id'>>) => void;
    removeProperty: (id: string) => void;
    getProperty: (id: string) => OntologyProperty | undefined;

    // === Property-Class Link Operations ===
    linkPropertyToClass: (classId: string, propertyId: string, required: boolean) => void;
    unlinkPropertyFromClass: (classId: string, propertyId: string) => void;
    updatePropertyLink: (classId: string, propertyId: string, updates: Partial<Omit<ClassPropertyLink, 'classId' | 'propertyId'>>) => void;
    getClassPropertyLinks: (classId: string) => ClassPropertyLink[];

    // === Relation Operations ===
    addRelation: (rel: OntologyRelation) => void;
    updateRelation: (id: string, updates: Partial<Omit<OntologyRelation, 'id'>>) => void;
    removeRelation: (id: string) => void;
    getRelation: (id: string) => OntologyRelation | undefined;

    // === Bulk Operations ===
    setSchema: (schema: OntologySchema) => void;
    resetSchema: () => void;
}

// =============================================================================
// JSON Serialization for Map
// =============================================================================

function schemaToJSON(schema: OntologySchema): object {
    return {
        classes: Array.from(schema.classes.entries()),
        properties: Array.from(schema.properties.entries()),
        propertyLinks: schema.propertyLinks,
        relations: schema.relations,
        version: schema.version,
        lastModified: schema.lastModified
    };
}

function jsonToSchema(json: any): OntologySchema {
    return {
        classes: new Map(json.classes || []),
        properties: new Map(json.properties || []),
        propertyLinks: json.propertyLinks || [],
        relations: json.relations || [],
        version: json.version || 1,
        lastModified: json.lastModified
    };
}

// =============================================================================
// Store Implementation
// =============================================================================

export const useSchemaStore = create<SchemaState>()(
    persist(
        (set, get) => ({
            schema: createEmptySchema(),

            // ========= Class Operations =========
            addClass: (cls) => set((state) => {
                const newClasses = new Map(state.schema.classes);
                newClasses.set(cls.id, cls);
                return {
                    schema: {
                        ...state.schema,
                        classes: newClasses,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            updateClass: (id, updates) => set((state) => {
                const existing = state.schema.classes.get(id);
                if (!existing) return state;

                const newClasses = new Map(state.schema.classes);
                newClasses.set(id, { ...existing, ...updates });
                return {
                    schema: {
                        ...state.schema,
                        classes: newClasses,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            removeClass: (id) => set((state) => {
                const newClasses = new Map(state.schema.classes);
                newClasses.delete(id);

                // Also remove related property links and relations
                const newPropertyLinks = state.schema.propertyLinks.filter(
                    link => link.classId !== id
                );
                const newRelations = state.schema.relations.filter(
                    rel => rel.sourceClassId !== id && rel.targetClassId !== id
                );

                return {
                    schema: {
                        ...state.schema,
                        classes: newClasses,
                        propertyLinks: newPropertyLinks,
                        relations: newRelations,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            getClass: (id) => get().schema.classes.get(id),

            // ========= Property Operations =========
            addProperty: (prop) => set((state) => {
                const newProperties = new Map(state.schema.properties);
                newProperties.set(prop.id, prop);
                return {
                    schema: {
                        ...state.schema,
                        properties: newProperties,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            updateProperty: (id, updates) => set((state) => {
                const existing = state.schema.properties.get(id);
                if (!existing) return state;

                const newProperties = new Map(state.schema.properties);
                newProperties.set(id, { ...existing, ...updates });
                return {
                    schema: {
                        ...state.schema,
                        properties: newProperties,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            removeProperty: (id) => set((state) => {
                const newProperties = new Map(state.schema.properties);
                newProperties.delete(id);

                // Also remove all links to this property
                const newPropertyLinks = state.schema.propertyLinks.filter(
                    link => link.propertyId !== id
                );

                return {
                    schema: {
                        ...state.schema,
                        properties: newProperties,
                        propertyLinks: newPropertyLinks,
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            getProperty: (id) => get().schema.properties.get(id),

            // ========= Property-Class Link Operations =========
            linkPropertyToClass: (classId, propertyId, required) => set((state) => {
                // Check if link already exists
                const exists = state.schema.propertyLinks.some(
                    link => link.classId === classId && link.propertyId === propertyId
                );
                if (exists) return state;

                return {
                    schema: {
                        ...state.schema,
                        propertyLinks: [
                            ...state.schema.propertyLinks,
                            { classId, propertyId, required }
                        ],
                        lastModified: new Date().toISOString()
                    }
                };
            }),

            unlinkPropertyFromClass: (classId, propertyId) => set((state) => ({
                schema: {
                    ...state.schema,
                    propertyLinks: state.schema.propertyLinks.filter(
                        link => !(link.classId === classId && link.propertyId === propertyId)
                    ),
                    lastModified: new Date().toISOString()
                }
            })),

            updatePropertyLink: (classId, propertyId, updates) => set((state) => ({
                schema: {
                    ...state.schema,
                    propertyLinks: state.schema.propertyLinks.map(link =>
                        link.classId === classId && link.propertyId === propertyId
                            ? { ...link, ...updates }
                            : link
                    ),
                    lastModified: new Date().toISOString()
                }
            })),

            getClassPropertyLinks: (classId) =>
                get().schema.propertyLinks.filter(link => link.classId === classId),

            // ========= Relation Operations =========
            addRelation: (rel) => set((state) => ({
                schema: {
                    ...state.schema,
                    relations: [...state.schema.relations, rel],
                    lastModified: new Date().toISOString()
                }
            })),

            updateRelation: (id, updates) => set((state) => ({
                schema: {
                    ...state.schema,
                    relations: state.schema.relations.map(rel =>
                        rel.id === id ? { ...rel, ...updates } : rel
                    ),
                    lastModified: new Date().toISOString()
                }
            })),

            removeRelation: (id) => set((state) => ({
                schema: {
                    ...state.schema,
                    relations: state.schema.relations.filter(rel => rel.id !== id),
                    lastModified: new Date().toISOString()
                }
            })),

            getRelation: (id) => get().schema.relations.find(rel => rel.id === id),

            // ========= Bulk Operations =========
            setSchema: (schema) => set({ schema }),

            resetSchema: () => set({ schema: createEmptySchema() })
        }),
        {
            name: 'ontology-schema-storage',
            storage: createJSONStorage(() => localStorage),
            // Custom serialization for Map objects
            partialize: (state) => ({
                schema: schemaToJSON(state.schema)
            }),
            merge: (persistedState: any, currentState) => ({
                ...currentState,
                schema: persistedState?.schema
                    ? jsonToSchema(persistedState.schema)
                    : createEmptySchema()
            })
        }
    )
);

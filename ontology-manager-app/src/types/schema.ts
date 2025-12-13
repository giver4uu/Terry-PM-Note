/**
 * Pure Ontology Schema Types
 * 
 * This module defines the core ontology data model, completely independent
 * of React Flow or any UI framework. This separation enables:
 * 1. Clean data layer for Neo4j integration
 * 2. Reusable properties across classes
 * 3. Clear distinction between schema and UI state
 */

// =============================================================================
// Property Types (Data Properties)
// =============================================================================

export type PropertyDataType = 'text' | 'number' | 'date' | 'boolean';

/**
 * Global property definition.
 * Properties are defined once and can be shared across multiple classes.
 */
export interface OntologyProperty {
  id: string;
  name: string;
  dataType: PropertyDataType;
  description?: string;
}

/**
 * Links a property to a class with class-specific settings.
 * The same property can have different 'required' status in different classes.
 */
export interface ClassPropertyLink {
  classId: string;
  propertyId: string;
  required: boolean;
  constraints?: string[];  // Future: validation rules
}

// =============================================================================
// Class Types
// =============================================================================

/**
 * Ontology class definition.
 * Represents a domain concept (e.g., Candidate, Job Posting, Interview).
 */
export interface OntologyClass {
  id: string;
  name: string;
  description?: string;
}

// =============================================================================
// Relation Types (Object Properties)
// =============================================================================

export type Cardinality = '1:1' | '1:N' | 'N:1' | 'N:M';

/**
 * Relation between two classes.
 * Represents an Object Property in ontology terms (e.g., "CREATES", "ASSIGNED_TO").
 */
export interface OntologyRelation {
  id: string;
  sourceClassId: string;
  targetClassId: string;
  name: string;           // Relationship label (e.g., "CREATES", "ASSIGNED_TO")
  cardinality: Cardinality;
  description?: string;
}

// =============================================================================
// Complete Schema
// =============================================================================

/**
 * Complete ontology schema.
 * This is the core data structure that can be:
 * - Persisted to localStorage
 * - Exported to Neo4j
 * - Used for validation
 */
export interface OntologySchema {
  classes: Map<string, OntologyClass>;
  properties: Map<string, OntologyProperty>;
  propertyLinks: ClassPropertyLink[];
  relations: OntologyRelation[];
  
  // Metadata
  version: number;
  lastModified?: string;
}

// =============================================================================
// Type Guards
// =============================================================================

export function isOntologyClass(obj: unknown): obj is OntologyClass {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as OntologyClass).id === 'string' &&
    typeof (obj as OntologyClass).name === 'string'
  );
}

export function isOntologyProperty(obj: unknown): obj is OntologyProperty {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'dataType' in obj
  );
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all properties linked to a specific class.
 */
export function getClassProperties(
  schema: OntologySchema,
  classId: string
): Array<OntologyProperty & { required: boolean }> {
  const links = schema.propertyLinks.filter(link => link.classId === classId);
  
  return links
    .map(link => {
      const property = schema.properties.get(link.propertyId);
      if (!property) return null;
      return { ...property, required: link.required };
    })
    .filter((p): p is OntologyProperty & { required: boolean } => p !== null);
}

/**
 * Get all classes that use a specific property.
 */
export function getPropertyClasses(
  schema: OntologySchema,
  propertyId: string
): OntologyClass[] {
  const links = schema.propertyLinks.filter(link => link.propertyId === propertyId);
  
  return links
    .map(link => schema.classes.get(link.classId))
    .filter((c): c is OntologyClass => c !== undefined);
}

/**
 * Create an empty schema.
 */
export function createEmptySchema(): OntologySchema {
  return {
    classes: new Map(),
    properties: new Map(),
    propertyLinks: [],
    relations: [],
    version: 1,
    lastModified: new Date().toISOString()
  };
}

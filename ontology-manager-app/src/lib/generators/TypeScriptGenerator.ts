import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData, PropertyType } from '../../types/ontology';

/**
 * Generates TypeScript interfaces from ontology schema.
 * Useful for developers to use the schema in their code.
 */
export class TypeScriptGenerator {
    /**
     * Maps ontology property types to TypeScript types.
     */
    private mapPropertyType(type: PropertyType): string {
        switch (type) {
            case 'text': return 'string';
            case 'number': return 'number';
            case 'date': return 'Date';
            case 'boolean': return 'boolean';
            default: return 'unknown';
        }
    }

    /**
     * Converts a class name to a valid TypeScript interface name.
     */
    private toInterfaceName(label: string): string {
        return label
            .split(/[\s_-]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    /**
     * Converts a property name to camelCase.
     */
    private toCamelCase(name: string): string {
        return name
            .split(/[\s_-]+/)
            .map((word, index) =>
                index === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');
    }

    /**
     * Generates TypeScript interfaces from ontology nodes and edges.
     */
    generate(
        nodes: Node<OntologyNodeData>[],
        edges: Edge<OntologyEdgeData>[]
    ): string {
        const classNodes = nodes.filter(n => n.data.kind === 'class');

        let output = '/**\n';
        output += ' * Auto-generated TypeScript interfaces from Ontology Manager\n';
        output += ` * Generated: ${new Date().toISOString()}\n`;
        output += ' */\n\n';

        // Generate interfaces for each class
        classNodes.forEach(node => {
            const interfaceName = this.toInterfaceName(node.data.label);

            output += `/**\n`;
            output += ` * ${node.data.description || node.data.label}\n`;
            output += ` */\n`;
            output += `export interface ${interfaceName} {\n`;
            output += `  id: string;\n`;

            // Properties
            node.data.properties.forEach(prop => {
                const propName = this.toCamelCase(prop.name);
                const propType = this.mapPropertyType(prop.type);
                const optional = prop.required ? '' : '?';

                if (prop.description) {
                    output += `  /** ${prop.description} */\n`;
                }
                output += `  ${propName}${optional}: ${propType};\n`;
            });

            // Relation references (edges from this class)
            const outgoingEdges = edges.filter(
                e => e.source === node.id && !e.data?.isPropertyEdge
            );

            outgoingEdges.forEach(edge => {
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!targetNode) return;

                const targetInterface = this.toInterfaceName(targetNode.data.label);
                const relationName = this.toCamelCase(edge.data?.label || 'relation');
                const cardinality = edge.data?.cardinality || '1:1';

                // Determine if array based on cardinality
                const isArray = cardinality.endsWith(':N') || cardinality.endsWith(':M');
                const typeRef = isArray ? `${targetInterface}[]` : targetInterface;

                if (edge.data?.description) {
                    output += `  /** ${edge.data.description} */\n`;
                }
                output += `  ${relationName}?: ${typeRef};\n`;
            });

            output += '}\n\n';
        });

        // Generate Cardinality type
        output += '// Cardinality types\n';
        output += "export type Cardinality = '1:1' | '1:N' | 'N:1' | 'N:M';\n\n";

        // Generate relation types
        output += '// Relation types\n';
        output += 'export interface OntologyRelation {\n';
        output += '  id: string;\n';
        output += '  sourceId: string;\n';
        output += '  targetId: string;\n';
        output += '  type: string;\n';
        output += '  cardinality: Cardinality;\n';
        output += '}\n';

        return output;
    }
}

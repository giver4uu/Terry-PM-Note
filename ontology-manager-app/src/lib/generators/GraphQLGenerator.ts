import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData, PropertyType } from '../../types/ontology';

/**
 * Generates GraphQL Schema Definition Language (SDL) from ontology schema.
 * Useful for creating a GraphQL API based on the ontology.
 */
export class GraphQLGenerator {
    /**
     * Maps ontology property types to GraphQL scalar types.
     */
    private mapPropertyType(type: PropertyType, required: boolean): string {
        let graphqlType: string;
        switch (type) {
            case 'text': graphqlType = 'String'; break;
            case 'number': graphqlType = 'Float'; break;
            case 'date': graphqlType = 'DateTime'; break;
            case 'boolean': graphqlType = 'Boolean'; break;
            default: graphqlType = 'String';
        }
        return required ? `${graphqlType}!` : graphqlType;
    }

    /**
     * Converts a class name to a valid GraphQL type name.
     */
    private toTypeName(label: string): string {
        return label
            .split(/[\s_-]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    /**
     * Converts a property/field name to camelCase.
     */
    private toFieldName(name: string): string {
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
     * Generates GraphQL SDL from ontology nodes and edges.
     */
    generate(
        nodes: Node<OntologyNodeData>[],
        edges: Edge<OntologyEdgeData>[]
    ): string {
        const classNodes = nodes.filter(n => n.data.kind === 'class');

        let output = '"""\n';
        output += 'Auto-generated GraphQL Schema from Ontology Manager\n';
        output += `Generated: ${new Date().toISOString()}\n`;
        output += '"""\n\n';

        // Custom scalar for DateTime
        output += '# Custom Scalars\n';
        output += 'scalar DateTime\n\n';

        // Generate types for each class
        classNodes.forEach(node => {
            const typeName = this.toTypeName(node.data.label);

            output += `"""\n${node.data.description || node.data.label}\n"""\n`;
            output += `type ${typeName} {\n`;
            output += `  id: ID!\n`;

            // Properties
            node.data.properties.forEach(prop => {
                const fieldName = this.toFieldName(prop.name);
                const fieldType = this.mapPropertyType(prop.type, prop.required);

                if (prop.description) {
                    output += `  "${prop.description}"\n`;
                }
                output += `  ${fieldName}: ${fieldType}\n`;
            });

            // Relation fields (edges from this class)
            const outgoingEdges = edges.filter(
                e => e.source === node.id && !e.data?.isPropertyEdge
            );

            outgoingEdges.forEach(edge => {
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!targetNode) return;

                const targetType = this.toTypeName(targetNode.data.label);
                const fieldName = this.toFieldName(edge.data?.label || 'relation');
                const cardinality = edge.data?.cardinality || '1:1';

                // Determine if array based on cardinality
                const isArray = cardinality.endsWith(':N') || cardinality.endsWith(':M');
                const typeRef = isArray ? `[${targetType}!]` : targetType;

                if (edge.data?.description) {
                    output += `  "${edge.data.description}"\n`;
                }
                output += `  ${fieldName}: ${typeRef}\n`;
            });

            output += '}\n\n';
        });

        // Generate Query type
        output += '# Root Query\n';
        output += 'type Query {\n';
        classNodes.forEach(node => {
            const typeName = this.toTypeName(node.data.label);
            const fieldName = this.toFieldName(node.data.label);
            const pluralName = fieldName + 's';

            output += `  ${fieldName}(id: ID!): ${typeName}\n`;
            output += `  ${pluralName}(limit: Int, offset: Int): [${typeName}!]!\n`;
        });
        output += '}\n\n';

        // Generate Mutation type
        output += '# Root Mutation\n';
        output += 'type Mutation {\n';
        classNodes.forEach(node => {
            const typeName = this.toTypeName(node.data.label);

            output += `  create${typeName}(input: ${typeName}Input!): ${typeName}!\n`;
            output += `  update${typeName}(id: ID!, input: ${typeName}Input!): ${typeName}!\n`;
            output += `  delete${typeName}(id: ID!): Boolean!\n`;
        });
        output += '}\n\n';

        // Generate Input types
        output += '# Input Types\n';
        classNodes.forEach(node => {
            const typeName = this.toTypeName(node.data.label);

            output += `input ${typeName}Input {\n`;
            node.data.properties.forEach(prop => {
                const fieldName = this.toFieldName(prop.name);
                const fieldType = this.mapPropertyType(prop.type, false); // Inputs are optional for updates
                output += `  ${fieldName}: ${fieldType}\n`;
            });
            output += '}\n\n';
        });

        return output;
    }
}

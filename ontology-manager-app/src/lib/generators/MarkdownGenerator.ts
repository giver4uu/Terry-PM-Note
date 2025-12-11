import { Node, Edge } from 'reactflow';
import { OntologyNodeData, OntologyEdgeData } from '../../types/ontology';

export class MarkdownGenerator {
    generate(
        nodes: Node<OntologyNodeData>[],
        edges: Edge<OntologyEdgeData>[]
    ): string {
        const classNodes = nodes.filter(n => n.data.kind === 'class');

        let markdown = '# ATS 온톨로지 구조\n\n';
        markdown += `생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;
        markdown += '---\n\n';

        // 1. 개요
        markdown += '## 개요\n\n';
        markdown += `이 문서는 ATS (채용관리시스템) 온톨로지 구조를 설명합니다.\n\n`;
        markdown += `- **클래스 수:** ${classNodes.length}\n`;
        markdown += `- **관계 수:** ${edges.filter(e => !e.data?.isPropertyEdge).length}\n\n`;
        markdown += '---\n\n';

        // 2. 클래스 목록
        markdown += '## 클래스\n\n';

        classNodes.forEach((node) => {
            markdown += `### ${node.data.label}\n\n`;
            if (node.data.description) {
                markdown += `${node.data.description}\n\n`;
            }

            // 프로퍼티 테이블
            if (node.data.properties.length > 0) {
                markdown += '**프로퍼티:**\n\n';
                markdown += '| 이름 | 타입 | 필수 | 설명 |\n';
                markdown += '|------|------|------|------|\n';

                node.data.properties.forEach((prop) => {
                    const required = prop.required ? '✅' : '❌';
                    const description = prop.description || '-';
                    markdown += `| \`${prop.name}\` | ${prop.type} | ${required} | ${description} |\n`;
                });
                markdown += '\n';
            }
        });

        markdown += '---\n\n';

        // 3. 관계
        markdown += '## 관계\n\n';
        markdown += '| 출발 | 관계 | 도착 | Cardinality | 설명 |\n';
        markdown += '|------|------|------|-------------|------|\n';

        const classEdges = edges.filter(e => !e.data?.isPropertyEdge);
        classEdges.forEach((edge) => {
            const source = nodes.find(n => n.id === edge.source)?.data.label || edge.source;
            const target = nodes.find(n => n.id === edge.target)?.data.label || edge.target;
            const label = edge.data?.label || '-';
            const cardinality = edge.data?.cardinality || '-';
            const description = edge.data?.description || '-';

            markdown += `| ${source} | ${label} | ${target} | ${cardinality} | ${description} |\n`;
        });

        markdown += '\n---\n\n';

        // 4. 메타데이터
        markdown += '## 메타데이터\n\n';
        markdown += `- **버전:** 1.0.0\n`;
        markdown += `- **생성 도구:** 온톨로지 매니저 v1.0\n`;
        markdown += `- **라이선스:** -\n\n`;

        return markdown;
    }
}

import { useCallback, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    NodeTypes,
    ReactFlowProvider,
    Panel,
    ConnectionMode,
    useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useOntologyStore } from '../stores/useOntologyStore';
import ClassNode from './ClassNode';
import GraphNode from './GraphNode';
import { useLayout } from '../lib/useLayout';
import { Plus, LayoutDashboard, Network, BoxSelect } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

import { useThemeStore } from '../stores/useThemeStore';

const nodeTypes: NodeTypes = {
    classNode: ClassNode,
    graphNode: GraphNode
};

// Separated component to use the ReactFlowProvider context
const OntologyCanvasInternal = () => {
    const { t } = useTranslation();
    const { theme } = useThemeStore();
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        selectNode,
        selectEdge,
        addNode,
        viewMode,
        setViewMode
    } = useOntologyStore();

    const { onLayout, onForceLayout } = useLayout();
    const { fitView } = useReactFlow();

    const bgColor = theme === 'dark' ? '#334155' : '#cbd5e1'; // Slate-700 vs Slate-300
    // miniMapBg is handled by className (bg-slate-50 dark:bg-slate-900)
    const miniMapMask = theme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)';
    const miniMapNode = theme === 'dark' ? '#1e293b' : '#cbd5e1';

    // Layout effect when view mode changes
    useEffect(() => {
        if (viewMode === 'graph') {
            // Give it a moment for the node types to switch then layout
            setTimeout(onForceLayout, 10);
        } else {
            // For schema mode, we might want to keep the positions or re-layout
            // For now, let's just leave them or do a TB layout
            // setTimeout(() => onLayout('TB'), 10);
        }
    }, [viewMode, onForceLayout, onLayout]);

    const handleAddNode = useCallback(() => {
        const id = `node_${Date.now()}`;
        const position = { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 };
        const newNode = {
            id,
            type: viewMode === 'graph' ? 'graphNode' : 'classNode',
            position,
            data: {
                label: 'New Class',
                kind: 'class' as const,
                properties: [],
                rules: []
            }
        };
        addNode(newNode);

        // Select the new node and focus on it
        selectNode(id);
        setTimeout(() => {
            fitView({
                nodes: [{ id, position, data: newNode.data }],
                duration: 300,
                padding: 0.5
            });
        }, 50);
    }, [addNode, viewMode, selectNode, fitView]);

    const handleToggleView = useCallback(() => {
        const newMode = viewMode === 'schema' ? 'graph' : 'schema';
        setViewMode(newMode);
    }, [viewMode, setViewMode]);

    const onPaneClick = useCallback(() => {
        selectNode(null);
        selectEdge(null);
    }, [selectNode, selectEdge]);

    const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
        selectNode(node.id);
    }, [selectNode]);

    const onEdgeClick = useCallback((_: React.MouseEvent, edge: any) => {
        selectEdge(edge.id);
    }, [selectEdge]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (!type) return;

            const position = { x: event.clientX - 200, y: event.clientY - 100 };

            const newNode = {
                id: `node_${Date.now()}`,
                type: viewMode === 'graph' ? 'graphNode' : 'classNode', // Respect current mode
                position,
                data: {
                    label: 'New Class',
                    kind: 'class' as const,
                    properties: [],
                    rules: []
                },
            };

            addNode(newNode);
        },
        [addNode, viewMode]
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            connectionMode={ConnectionMode.Loose}
            fitView
            className="bg-background transition-colors"
        >
            <Background color={bgColor} gap={16} size={1} />
            <Controls className="bg-card dark:bg-muted border-border fill-foreground" />
            <MiniMap
                className="bg-card dark:bg-muted border-border"
                nodeColor={miniMapNode}
                maskColor={miniMapMask}
            />
            <Panel position="top-right" className="flex gap-2">
                <button
                    onClick={handleAddNode}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all shadow-lg border",
                        "bg-primary border-primary text-primary-foreground hover:bg-blue-500"
                    )}
                >
                    <Plus className="w-4 h-4" />
                    <span>{t('add_class') || 'Add Class'}</span>
                </button>
                <button
                    onClick={() => onLayout('TB')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all shadow-lg border",
                        "bg-secondary border-border text-secondary-foreground hover:bg-slate-700 hover:text-white"
                    )}
                    title="Tree Layout"
                >
                    <LayoutDashboard className="w-4 h-4 fill-current" />
                </button>
                <button
                    onClick={handleToggleView}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all shadow-lg border",
                        viewMode === 'graph'
                            ? "bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                            : "bg-secondary border-border text-secondary-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                >
                    {viewMode === 'graph' ? <BoxSelect className="w-4 h-4" /> : <Network className="w-4 h-4" />}
                    <span>{viewMode === 'graph' ? 'Schema View' : 'Graph View'}</span>
                </button>
            </Panel>
        </ReactFlow>
    );
};

const OntologyCanvas = () => {
    return (
        <div className="h-full w-full bg-background transition-colors">
            <ReactFlowProvider>
                <OntologyCanvasInternal />
            </ReactFlowProvider>
        </div>
    )
}

export default OntologyCanvas;

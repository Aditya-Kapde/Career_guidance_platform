import React, { useState, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
  MiniMap, 
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import api from '../services/api';
import { useAssessment } from '../context/AssessmentContext';
import FlowNode from './FlowNode';
import FlowLegend from './FlowLegend';
import FlowControls from './FlowControls';
import { Compass, Info } from 'lucide-react';

const nodeTypes = { careerNode: FlowNode };

const LEVEL_VALUES = {
  'class-8': 1,
  'class-9': 2,
  'class-10': 3,
  'puc': 4,
  'diploma': 5,
  'undergraduate': 6
};

// Inner component to access useReactFlow hook
function FlowDiagramContent({ careerId }) {
  const { educationLevel } = useAssessment();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInteractive, setIsInteractive] = useState(true);
  const { fitView } = useReactFlow();

  const getLayoutedElements = (rawNodes, rawEdges) => {
    // 1. Calculate layers/levels
    const incoming = {};
    const adj = {};
    rawNodes.forEach(n => {
      incoming[n.id] = 0;
      adj[n.id] = [];
    });
    rawEdges.forEach(e => {
      if (incoming[e.target] !== undefined) {
        incoming[e.target]++;
      }
      if (adj[e.source] !== undefined) {
        adj[e.source].push(e.target);
      }
    });

    // Find root nodes
    let queue = rawNodes.filter(n => incoming[n.id] === 0).map(n => ({ id: n.id, level: 0 }));
    const levels = {};
    const levelGroups = {};

    if (queue.length === 0 && rawNodes.length > 0) {
      queue = [{ id: rawNodes[0].id, level: 0 }];
    }

    while (queue.length > 0) {
      const { id, level } = queue.shift();
      if (levels[id] !== undefined && levels[id] >= level) continue;
      levels[id] = level;
      if (!levelGroups[level]) {
        levelGroups[level] = [];
      }
      if (!levelGroups[level].includes(id)) {
        levelGroups[level].push(id);
      }
      adj[id].forEach(child => {
        queue.push({ id: child, level: level + 1 });
      });
    }

    rawNodes.forEach(n => {
      if (levels[n.id] === undefined) {
        levels[n.id] = 0;
        if (!levelGroups[0]) levelGroups[0] = [];
        levelGroups[0].push(n.id);
      }
    });

    const xSpacing = 240;
    const ySpacing = 135;

    // 2. Personalization checks & coordinate mapping
    const userLevelVal = LEVEL_VALUES[educationLevel] || 6; // Default to undergrad

    const layoutedNodes = rawNodes.map(node => {
      let status = 'future';

      // Status assignment
      if (userLevelVal === 1 || userLevelVal === 2) {
        if (node.level < 3) {
          status = 'completed';
        } else if (node.level === 3) {
          status = 'current';
        } else {
          status = 'future';
        }
      } else {
        if (node.level < userLevelVal) {
          status = 'completed';
        } else if (node.level === userLevelVal) {
          status = 'current';
        } else {
          status = 'future';
        }
      }

      const lvl = levels[node.id] || 0;
      const group = levelGroups[lvl] || [node.id];
      const index = group.indexOf(node.id);
      const totalInLevel = group.length;

      const x = (index - (totalInLevel - 1) / 2) * xSpacing + 250;
      const y = lvl * ySpacing + 50;

      return {
        id: node.id,
        type: 'careerNode',
        position: { x, y },
        data: {
          label: node.label,
          type: node.type,
          status
        }
      };
    });

    // 3. Style edges
    const layoutedEdges = rawEdges.map(edge => {
      const sourceNode = layoutedNodes.find(n => n.id === edge.source);
      const targetNode = layoutedNodes.find(n => n.id === edge.target);

      let strokeColor = '#e2e8f0'; // slate-200
      let animated = false;

      if (sourceNode && targetNode) {
        const sourceStatus = sourceNode.data.status;
        const targetStatus = targetNode.data.status;

        if (sourceStatus === 'completed' && targetStatus === 'completed') {
          strokeColor = '#10b981'; // emerald-500
          animated = true;
        } else if (sourceStatus === 'completed' && targetStatus === 'current') {
          strokeColor = '#6366f1'; // indigo-500
          animated = true;
        } else if (sourceStatus === 'current') {
          strokeColor = '#6366f1';
          animated = true;
        }
      }

      return {
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        animated,
        style: { stroke: strokeColor, strokeWidth: 2.5 }
      };
    });

    return { nodes: layoutedNodes, edges: layoutedEdges };
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    api.get(`/api/flow-tree/${careerId}`)
      .then((res) => {
        if (isMounted && res) {
          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(res.nodes, res.edges);
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          setLoading(false);
          // Wait briefly for canvas nodes to register before fitting view
          setTimeout(() => {
            if (isMounted) fitView({ padding: 0.15, duration: 400 });
          }, 100);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error loading career flow tree:", err);
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [careerId, educationLevel]);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
        <p className="text-xs text-slate-550 font-semibold">Generating path decision tree...</p>
      </div>
    );
  }

  if (error || nodes.length === 0) {
    return (
      <div className="w-full h-[300px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100 px-6 text-center">
        <Info className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-xs text-slate-500 font-bold">Flow tree visualization is not available for this pathway yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            Alternative Career Decision Flow
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Interactive map displaying alternative branch pathways leading to this profession.
          </p>
        </div>
        <FlowControls 
          isInteractive={isInteractive} 
          onToggleInteractive={() => setIsInteractive(prev => !prev)} 
        />
      </div>

      {/* React Flow Container */}
      <div className="w-full h-[460px] bg-slate-50/30 rounded-2xl border border-slate-200/80 overflow-hidden relative shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={isInteractive}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={isInteractive}
          zoomOnScroll={isInteractive}
          zoomOnDoubleClick={isInteractive}
          maxZoom={1.5}
          minZoom={0.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#cbd5e1" />
          <MiniMap 
            nodeColor={(n) => {
              if (n.data?.status === 'completed') return '#10b981';
              if (n.data?.status === 'current') return '#4f46e5';
              return '#e2e8f0';
            }} 
            style={{ borderRadius: '12px', border: '1px solid #f1f5f9' }} 
            zoomable
            pannable
          />
        </ReactFlow>
      </div>

      {/* Legend Footer */}
      <div className="flex justify-start">
        <FlowLegend />
      </div>
    </div>
  );
}

// Main wrapping component to supply ReactFlowProvider
export default function CareerFlowDiagram({ careerId }) {
  return (
    <ReactFlowProvider>
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/20 rounded-full blur-3xl pointer-events-none" />
        <FlowDiagramContent careerId={careerId} />
      </div>
    </ReactFlowProvider>
  );
}

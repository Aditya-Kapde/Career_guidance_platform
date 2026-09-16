import React, { useState, useEffect, useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import api from '../services/api';
import { useAssessment } from '../context/AssessmentContext';
import FlowNode from './FlowNode';
import FlowLegend from './FlowLegend';
import FlowControls from './FlowControls';
import { GitBranch, Info, Filter } from 'lucide-react';

const nodeTypes = { careerNode: FlowNode };

const LEVEL_VALUES = {
  'class-8': 1,
  'class-9': 1,
  'class-10': 2,
  'puc': 3,
  'diploma': 3,
  'undergraduate': 5
};

function FlowDiagramContent({ careerId }) {
  const { educationLevel } = useAssessment();
  const [rawData, setRawData] = useState({ nodes: [], edges: [] });
  const [selectedStream, setSelectedStream] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInteractive, setIsInteractive] = useState(true);
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Extract available streams for filtering
  const availableStreams = useMemo(() => {
    const streams = new Set(['all']);
    rawData.nodes.forEach(n => {
      if (n.stream && n.stream !== 'Core') {
        streams.add(n.stream);
      }
    });
    return Array.from(streams);
  }, [rawData.nodes]);

  // Layout calculations
  const getLayoutedElements = (rawNodes, rawEdges, activeStream) => {
    // Filter nodes if a specific stream is chosen
    const filteredNodes = rawNodes.filter(n => {
      if (activeStream === 'all') return true;
      return !n.stream || n.stream === 'Core' || n.stream === activeStream;
    });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = rawEdges.filter(e => 
      filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );

    // Group by level for structured tiered branching
    const levelMap = {};
    filteredNodes.forEach(node => {
      const lvl = node.level || 1;
      if (!levelMap[lvl]) levelMap[lvl] = [];
      levelMap[lvl].push(node);
    });

    const userLevelVal = LEVEL_VALUES[educationLevel] || 2;
    const xSpacing = 280;
    const ySpacing = 160;

    const layoutedNodes = [];

    Object.keys(levelMap).sort((a, b) => Number(a) - Number(b)).forEach((lvlKey) => {
      const lvl = Number(lvlKey);
      const group = levelMap[lvl];
      const count = group.length;

      group.forEach((node, index) => {
        let status = 'future';

        if (node.level < userLevelVal) {
          status = 'completed';
        } else if (node.level === userLevelVal) {
          status = 'current';
        } else {
          status = 'future';
        }

        // Center nodes in each tier horizontally
        const x = (index - (count - 1) / 2) * xSpacing + 500;
        const y = (lvl - 1) * ySpacing + 40;

        layoutedNodes.push({
          id: node.id,
          type: 'careerNode',
          position: { x, y },
          data: {
            label: node.label,
            type: node.type || 'education',
            stream: node.stream,
            status
          }
        });
      });
    });

    const layoutedEdges = filteredEdges.map((edge) => {
      const sourceNode = layoutedNodes.find((n) => n.id === edge.source);
      const targetNode = layoutedNodes.find((n) => n.id === edge.target);

      let strokeColor = '#94A3B8';
      let strokeWidth = 2;
      let animated = false;

      if (sourceNode && targetNode) {
        const sourceStatus = sourceNode.data.status;
        const targetStatus = targetNode.data.status;

        if (sourceStatus === 'completed' && targetStatus === 'completed') {
          strokeColor = '#10B981';
          strokeWidth = 2.5;
          animated = true;
        } else if (sourceStatus === 'completed' && targetStatus === 'current') {
          strokeColor = '#4F46E5';
          strokeWidth = 2.5;
          animated = true;
        } else if (sourceStatus === 'current') {
          strokeColor = '#4F46E5';
          strokeWidth = 2.5;
          animated = true;
        }
      }

      return {
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated,
        style: { stroke: strokeColor, strokeWidth },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: strokeColor
        }
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
        if (isMounted && res && res.nodes) {
          setRawData({ nodes: res.nodes, edges: res.edges || [] });
          const { nodes: lNodes, edges: lEdges } = getLayoutedElements(res.nodes, res.edges || [], 'all');
          setNodes(lNodes);
          setEdges(lEdges);
          setLoading(false);
          setTimeout(() => {
            if (isMounted) fitView({ padding: 0.15, duration: 400 });
          }, 120);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error loading career flow tree:', err);
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [careerId, educationLevel]);

  const handleStreamChange = (stream) => {
    setSelectedStream(stream);
    const { nodes: lNodes, edges: lEdges } = getLayoutedElements(rawData.nodes, rawData.edges, stream);
    setNodes(lNodes);
    setEdges(lEdges);
    setTimeout(() => {
      fitView({ padding: 0.15, duration: 400 });
    }, 80);
  };

  if (loading) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-indigo-600 border-t-transparent mb-3" />
        <p className="text-xs text-slate-500 font-semibold">Synthesizing full multi-branch decision flow tree...</p>
      </div>
    );
  }

  if (error || nodes.length === 0) {
    return (
      <div className="w-full h-[320px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100 px-6 text-center">
        <Info className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-xs text-slate-500 font-bold">Decision tree visualization is not available for this pathway yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-5 h-5 text-indigo-600" />
            <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">
              Comprehensive Career Decision Map
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Decision Trees & Branching Routes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-3xl">
            Detailed academic pathways starting from middle school (Class 8/9/10), through multiple 11th & 12th streams, competitive entrance exams, premier degrees, and real-world career advancements.
          </p>
        </div>

        <FlowControls 
          isInteractive={isInteractive} 
          onToggleInteractive={() => setIsInteractive((prev) => !prev)} 
        />
      </div>

      {/* Stream Filter Tabs */}
      {availableStreams.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter Track:
          </span>
          {availableStreams.map((stream) => (
            <button
              key={stream}
              type="button"
              onClick={() => handleStreamChange(stream)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedStream === stream
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {stream === 'all' ? 'All Pathways & Streams' : stream}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Flow Canvas */}
      <div className="w-full h-[640px] sm:h-[720px] bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden relative shadow-inner">
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
          maxZoom={1.6}
          minZoom={0.3}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} color="#cbd5e1" />
        </ReactFlow>
      </div>

      <div className="flex justify-start">
        <FlowLegend />
      </div>
    </div>
  );
}

export default function CareerFlowDiagram({ careerId }) {
  return (
    <ReactFlowProvider>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-sm border border-slate-200/80 neu-flat mb-8 relative overflow-hidden">
        <FlowDiagramContent careerId={careerId} />
      </div>
    </ReactFlowProvider>
  );
}

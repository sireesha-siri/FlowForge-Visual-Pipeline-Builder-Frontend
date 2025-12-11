// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, MarkerType } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import all node types
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-[70vh] bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        defaultEdgeOptions={{
          style: { stroke: '#a78bfa', strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#a78bfa' }
        }}
      >
        <Background color="#4b5563" gap={gridSize} className="bg-slate-950" />
        <Controls className="bg-slate-800 border-violet-500/30" />
        <MiniMap
          nodeColor={() => '#8b5cf6'}
          maskColor="rgba(15, 23, 42, 0.8)"
          className="bg-slate-900 border border-violet-500/30"
        />
      </ReactFlow>
    </div>
  );
};

// import { useState, useRef, useCallback } from 'react';
// import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
// import { useStore } from './store';
// import { shallow } from 'zustand/shallow';
// import { InputNode } from './nodes/inputNode';
// import { LLMNode } from './nodes/llmNode';
// import { OutputNode } from './nodes/outputNode';
// import { TextNode } from './nodes/textNode';

// import 'reactflow/dist/style.css';

// const gridSize = 20;
// const proOptions = { hideAttribution: true };
// const nodeTypes = {
//   customInput: InputNode,
//   llm: LLMNode,
//   customOutput: OutputNode,
//   text: TextNode,
// };

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   getNodeID: state.getNodeID,
//   addNode: state.addNode,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   onConnect: state.onConnect,
// });

// export const PipelineUI = () => {
//     const reactFlowWrapper = useRef(null);
//     const [reactFlowInstance, setReactFlowInstance] = useState(null);
//     const {
//       nodes,
//       edges,
//       getNodeID,
//       addNode,
//       onNodesChange,
//       onEdgesChange,
//       onConnect
//     } = useStore(selector, shallow);

//     const getInitNodeData = (nodeID, type) => {
//       let nodeData = { id: nodeID, nodeType: `${type}` };
//       return nodeData;
//     }

//     const onDrop = useCallback(
//         (event) => {
//           event.preventDefault();
    
//           const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//           if (event?.dataTransfer?.getData('application/reactflow')) {
//             const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
//             const type = appData?.nodeType;
      
//             // check if the dropped element is valid
//             if (typeof type === 'undefined' || !type) {
//               return;
//             }
      
//             const position = reactFlowInstance.project({
//               x: event.clientX - reactFlowBounds.left,
//               y: event.clientY - reactFlowBounds.top,
//             });

//             const nodeID = getNodeID(type);
//             const newNode = {
//               id: nodeID,
//               type,
//               position,
//               data: getInitNodeData(nodeID, type),
//             };
      
//             addNode(newNode);
//           }
//         },
//         [reactFlowInstance]
//     );

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     return (
//         <>
//         <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 onDrop={onDrop}
//                 onDragOver={onDragOver}
//                 onInit={setReactFlowInstance}
//                 nodeTypes={nodeTypes}
//                 proOptions={proOptions}
//                 snapGrid={[gridSize, gridSize]}
//                 connectionLineType='smoothstep'
//             >
//                 <Background color="#aaa" gap={gridSize} />
//                 <Controls />
//                 <MiniMap />
//             </ReactFlow>
//         </div>
//         </>
//     )
// }

// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfigs } from './nodes/nodeConfigs';

export const PipelineToolbar = () => {
  return (
    <div className="p-4 border-b bg-slate-900 border-violet-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text">
          Sireesha Aguru
        </div>
        <div className="text-sm text-violet-300">Pipeline Builder</div>
      </div>
      <div className="flex flex-wrap gap-3">
        <DraggableNode 
          type="customInput" 
          label="Input" 
          icon={nodeConfigs.customInput.icon} 
        />
        <DraggableNode 
          type="llm" 
          label="LLM" 
          icon={nodeConfigs.llm.icon} 
        />
        <DraggableNode 
          type="customOutput" 
          label="Output" 
          icon={nodeConfigs.customOutput.icon} 
        />
        <DraggableNode 
          type="text" 
          label="Text" 
          icon={nodeConfigs.text.icon} 
        />
        <DraggableNode 
          type="transform" 
          label="Transform" 
          icon={nodeConfigs.transform.icon} 
        />
        <DraggableNode 
          type="filter" 
          label="Filter" 
          icon={nodeConfigs.filter.icon} 
        />
        <DraggableNode 
          type="merge" 
          label="Merge" 
          icon={nodeConfigs.merge.icon} 
        />
        <DraggableNode 
          type="split" 
          label="Split" 
          icon={nodeConfigs.split.icon} 
        />
        <DraggableNode 
          type="condition" 
          label="Condition" 
          icon={nodeConfigs.condition.icon} 
        />
      </div>
    </div>
  );
};

// import { DraggableNode } from './draggableNode';

// export const PipelineToolbar = () => {

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//                 <DraggableNode type='customInput' label='Input' />
//                 <DraggableNode type='llm' label='LLM' />
//                 <DraggableNode type='customOutput' label='Output' />
//                 <DraggableNode type='text' label='Text' />
//             </div>
//         </div>
//     );
// };

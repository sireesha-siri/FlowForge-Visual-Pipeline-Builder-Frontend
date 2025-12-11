import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Base Node Component - This is the abstraction!
// All nodes use this component with different configurations
export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [dynamicHandles, setDynamicHandles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 280, height: 'auto' });

  // Handle dynamic variables for Text node (Part 3 requirement)
  useEffect(() => {
    if (config.supportsDynamicHandles && data.text) {
      // Extract variables like {{variable}} from text
      const variables = data.text.match(/\{\{(\s*\w+\s*)\}\}/g) || [];
      const uniqueVars = [...new Set(variables.map(v => 
        v.replace(/\{\{|\}\}/g, '').trim()
      ))];
      setDynamicHandles(uniqueVars);

      // Dynamically adjust size (Part 3 requirement)
      const lines = data.text.split('\n').length;
      const newHeight = Math.max(140, 80 + lines * 24);
      const newWidth = Math.max(280, Math.min(500, data.text.length * 2.5));
      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [data.text, config.supportsDynamicHandles]);

  const handleChange = (e) => {
    updateNodeField(id, config.fieldName || 'value', e.target.value);
  };

  return (
    <div 
      className="rounded-xl shadow-2xl border-2 bg-slate-900 border-violet-500/30 hover:border-violet-500/50 transition-all"
      style={{ 
        minWidth: '280px', 
        width: dimensions.width, 
        minHeight: config.supportsDynamicHandles ? dimensions.height : 'auto'
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 rounded-t-xl">
        <div className="flex items-center gap-2">
          {config.icon && (
            <config.icon 
              size={24} 
              className="text-white"
              strokeWidth={2}
            />
          )}
          <span className="font-bold text-white text-lg">{config.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {config.showNameField && (
          <div>
            <label className="block text-sm font-medium text-violet-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={data.name || id}
              onChange={(e) => updateNodeField(id, 'name', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-violet-500/30 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
            />
          </div>
        )}

        {config.showInputField && (
          <div>
            <label className="block text-sm font-medium text-violet-300 mb-1">
              {config.inputLabel || 'Input'}
            </label>
            {config.inputType === 'select' ? (
              <select
                value={data[config.fieldName] || config.options[0]}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-violet-500/30 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
              >
                {config.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : config.inputType === 'textarea' ? (
              <textarea
                value={data[config.fieldName] || ''}
                onChange={handleChange}
                rows={Math.max(3, (data[config.fieldName] || '').split('\n').length)}
                className="w-full px-3 py-2 bg-slate-800 border border-violet-500/30 rounded-lg text-white focus:ring-2 focus:ring-violet-500 resize-none outline-none"
                placeholder={config.placeholder}
              />
            ) : (
              <input
                type="text"
                value={data[config.fieldName] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-800 border border-violet-500/30 rounded-lg text-white focus:ring-2 focus:ring-violet-500 outline-none"
                placeholder={config.placeholder}
              />
            )}
          </div>
        )}
      </div>

      {/* Input Handles (Left side) */}
      {config.inputs?.map((input, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${50 + idx * 30}px`,
            background: '#8b5cf6',
            width: '12px',
            height: '12px',
            border: '2px solid #1e293b'
          }}
        />
      ))}

      {/* Dynamic Variable Handles for Text Node (Part 3 requirement) */}
      {config.supportsDynamicHandles && dynamicHandles.map((varName, idx) => (
        <div key={`var-${varName}`}>
          <Handle
            type="target"
            position={Position.Left}
            id={varName}
            style={{
              top: `${100 + idx * 25}px`,
              background: '#a78bfa',
              width: '10px',
              height: '10px',
              border: '2px solid #1e293b'
            }}
          />
          <div 
            className="absolute text-xs text-violet-300 font-mono"
            style={{ 
              left: '-80px', 
              top: `${95 + idx * 25}px`,
              width: '70px',
              textAlign: 'right'
            }}
          >
            {varName}
          </div>
        </div>
      ))}

      {/* Output Handles (Right side) */}
      {config.outputs?.map((output, idx) => (
        <Handle
          key={`output-${idx}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: `${50 + idx * 30}px`,
            background: '#8b5cf6',
            width: '12px',
            height: '12px',
            border: '2px solid #1e293b'
          }}
        />
      ))}
    </div>
  );
};
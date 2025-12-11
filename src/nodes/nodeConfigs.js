// Import icons from lucide-react
import { 
  Download,        // Input
  Bot,            // LLM
  Upload,         // Output
  FileText,       // Text
  RotateCw,       // Transform
  Filter,         // Filter
  GitMerge,       // Merge
  Scissors,       // Split
  Workflow       // Condition
} from 'lucide-react';

// Central configuration for all node types
// This demonstrates the node abstraction - all nodes use BaseNode with different configs

export const nodeConfigs = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    icon: Download,
    iconColor: '#10b981', // green
    showNameField: true,
    showInputField: true,
    inputLabel: 'Input Name',
    inputType: 'text',
    fieldName: 'inputName',
    placeholder: 'Enter input name...',
    inputs: [],
    outputs: [{ id: 'value' }]
  },
  
  llm: {
    type: 'llm',
    label: 'LLM',
    icon: Bot,
    iconColor: '#8b5cf6', // purple
    showNameField: false,
    showInputField: true,
    inputLabel: 'Model',
    inputType: 'select',
    fieldName: 'model',
    options: ['GPT-4', 'GPT-3.5-Turbo', 'Claude-3', 'Llama-2'],
    inputs: [{ id: 'system' }, { id: 'prompt' }],
    outputs: [{ id: 'response' }]
  },
  
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    icon: Upload,
    iconColor: '#ef4444', // red
    showNameField: true,
    showInputField: true,
    inputLabel: 'Output Name',
    inputType: 'text',
    fieldName: 'outputName',
    placeholder: 'Enter output name...',
    inputs: [{ id: 'value' }],
    outputs: []
  },
  
  text: {
    type: 'text',
    label: 'Text',
    icon: FileText,
    iconColor: '#3b82f6', // blue
    showNameField: false,
    showInputField: true,
    inputLabel: 'Text Content',
    inputType: 'textarea',
    fieldName: 'text',
    placeholder: 'Enter text... Use {{variable}} for dynamic inputs',
    inputs: [],
    outputs: [{ id: 'output' }],
    supportsDynamicHandles: true
  },
  
  transform: {
    type: 'transform',
    label: 'Transform',
    icon: RotateCw,
    iconColor: '#f59e0b', // amber
    showNameField: false,
    showInputField: true,
    inputLabel: 'Transform Type',
    inputType: 'select',
    fieldName: 'transformType',
    options: ['Uppercase', 'Lowercase', 'Trim', 'Reverse', 'Capitalize'],
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }]
  },
  
  filter: {
    type: 'filter',
    label: 'Filter',
    icon: Filter,
    iconColor: '#06b6d4', // cyan
    showNameField: false,
    showInputField: true,
    inputLabel: 'Filter Condition',
    inputType: 'text',
    fieldName: 'condition',
    placeholder: 'e.g., length > 10',
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'passed' }, { id: 'failed' }]
  },
  
  merge: {
    type: 'merge',
    label: 'Merge',
    icon: GitMerge,
    iconColor: '#ec4899', // pink
    showNameField: false,
    showInputField: true,
    inputLabel: 'Separator',
    inputType: 'text',
    fieldName: 'separator',
    placeholder: ', ',
    inputs: [{ id: 'input1' }, { id: 'input2' }],
    outputs: [{ id: 'merged' }]
  },
  
  split: {
    type: 'split',
    label: 'Split',
    icon: Scissors,
    iconColor: '#14b8a6', // teal
    showNameField: false,
    showInputField: true,
    inputLabel: 'Delimiter',
    inputType: 'text',
    fieldName: 'delimiter',
    placeholder: ',',
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'parts' }]
  },
  
  condition: {
    type: 'condition',
    label: 'Condition',
    icon: Workflow,
    iconColor: '#a855f7', // purple
    showNameField: false,
    showInputField: true,
    inputLabel: 'Condition',
    inputType: 'text',
    fieldName: 'condition',
    placeholder: 'value > 0',
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'true' }, { id: 'false' }]
  }
};
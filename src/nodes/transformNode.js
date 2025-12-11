import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const TransformNode = (props) => {
  return <BaseNode {...props} config={nodeConfigs.transform} />;
};
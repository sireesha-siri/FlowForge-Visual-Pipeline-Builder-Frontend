import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const SplitNode = (props) => {
  return <BaseNode {...props} config={nodeConfigs.split} />;
};
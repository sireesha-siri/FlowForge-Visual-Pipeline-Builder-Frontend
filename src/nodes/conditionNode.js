import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const ConditionNode = (props) => {
  return <BaseNode {...props} config={nodeConfigs.condition} />;
};
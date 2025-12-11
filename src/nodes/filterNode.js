import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const FilterNode = (props) => {
  return <BaseNode {...props} config={nodeConfigs.filter} />;
};
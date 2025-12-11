import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const MergeNode = (props) => {
  return <BaseNode {...props} config={nodeConfigs.merge} />;
};
export type NodeType = {
  name: string;
  id: string;
  children?: NodeType[];
  parent?: NodeType;
  isFolder: boolean;
};

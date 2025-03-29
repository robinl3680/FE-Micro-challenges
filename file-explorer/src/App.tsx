import { useState } from "react";
import "./App.css";
import { FileExporer } from "./components/Explorer";
import { initialNodes } from "./data";
import { NodeType } from "./types";

const addNewItem = (
  id: string,
  isFolder: boolean,
  name: string,
  nodeList: NodeType[]
): NodeType[] => {
  return nodeList.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        children: [
          ...(node.children || []),
          {
            name,
            id: new Date().getTime().toString(),
            isFolder,
            children: isFolder ? [] : undefined,
          },
        ],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNewItem(id, isFolder, name, node.children),
      };
    }
    return node;
  });
};

const deleteItem = (id: string, nodeList: NodeType[]): NodeType[] => {
  return nodeList.reduce((acc, node) => {
    if (node.id === id) {
      return acc;
    }
    if (node.children) {
      return [...acc, { ...node, children: deleteItem(id, node.children) }];
    }
    return [...acc, node];
  }, [] as NodeType[]);
};

function App() {
  const addItem = (id: string, isFolder: boolean) => {
    const name = prompt("Enter the name of the new item") || "";
    const updatedList = addNewItem(id, isFolder, name, data);
    setData(updatedList);
  };
  const handleDelete = (id: string) => {
    const updatedList = deleteItem(id, data);
    setData(updatedList);
  };
  const [data, setData] = useState(initialNodes);
  return (
    <>
      <FileExporer
        list={data}
        onAddItem={addItem}
        onDeleteItem={handleDelete}
      />
    </>
  );
}

export default App;

import { useState } from "react";
import { NodeType } from "../types";
import { Container } from "./style";
import { NewItem } from "./NewItem";

export interface FileExplorerProps {
  list: NodeType[];
  onAddItem: (id: string, isFolder: boolean) => void;
  onDeleteItem: (id: string) => void;
}
export const FileExporer: React.FC<FileExplorerProps> = ({
  list,
  onAddItem,
  onDeleteItem,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleNewItem = (type: "folder" | "file", id: string) => {
    onAddItem(id, type === "folder");
  };

  return (
    <Container>
      {list.map((node) => {
        return (
          <div key={node.id}>
            {node.isFolder && (
              <span
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [node.id]: !prev[node.id],
                  }))
                }
              >
                {expanded[node.id] ? "-" : "+"}
              </span>
            )}
            <span>
              {node.isFolder ? "📁" : "📄"} {node.name}
            </span>
            <span
              style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
              onClick={() => onDeleteItem(node.id)}
            >
              🗑️
            </span>
            {node.isFolder && (
              <NewItem onItemClick={(type) => handleNewItem(type, node.id)} />
            )}
            {expanded[node.id] && node.children && (
              <FileExporer
                list={node.children}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
              />
            )}
          </div>
        );
      })}
    </Container>
  );
};

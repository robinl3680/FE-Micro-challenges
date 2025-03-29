export interface NewItemProps {
  onItemClick: (type: "folder" | "file") => void;
}
export const NewItem: React.FC<NewItemProps> = ({ onItemClick }) => {
  return (
    <span style={{ marginLeft: "20px", cursor: "pointer" }} title="Add Folder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
        style={{ verticalAlign: "middle" }}
        onClick={() => onItemClick("folder")}
      >
        <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
        <path d="M12 10v2h2v2h-2v2h-2v-2H8v-2h2v-2h2z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
        style={{
          verticalAlign: "middle",
          marginLeft: "10px",
          cursor: "pointer",
        }}
        onClick={() => onItemClick("file")}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6" />
        <path d="M12 11v2h2v2h-2v2h-2v-2H8v-2h2v-2h2z" />
      </svg>
    </span>
  );
};

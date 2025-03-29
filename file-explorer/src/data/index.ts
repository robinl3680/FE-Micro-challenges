import { NodeType } from "../types";

export const initialNodes: NodeType[] = [
  {
    name: "root",
    id: "1",
    isFolder: true,
    children: [
      {
        name: "folder 1",
        id: "2",
        isFolder: true,
        children: [
          {
            name: "folder 1.1",
            id: "3",
            isFolder: true,
            children: [
              {
                name: "file 1.1.1",
                id: "4",
                isFolder: false,
              },
            ],
          },
          {
            name: "file 1.2",
            id: "5",
            isFolder: false,
          },
        ],
      },
      {
        name: "file 2",
        id: "6",
        isFolder: false,
      },
    ],
  },
];

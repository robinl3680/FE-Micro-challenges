import { useState } from "react";
import initialData from "./data";
import CommentsTree from "./CommentsTree";

const App = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(initialData);

  const addComment = (commentId, text) => {
    if (!text) return;

    if (commentId === -1) {
      setComments((state) => {
        const newState = structuredClone(state);
        newState.unshift({ id: Date.now(), text, replies: [] });
        return newState;
      });
    } else {
      setComments((state) => {
        const newState = structuredClone(state);
        addCommentsToTree(newState, commentId, text);
        return newState;
      });
    }
  };

  const deleteComment = (commentId) => {
    setComments((state) => {
      const newState = structuredClone(state);
      deleteCommentFromTree(newState, commentId);
      return newState;
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addComment(-1, commentText);
      setCommentText("");
    }
    if (e.key === "Escape") {
      setCommentText("");
    }
  };

  return (
    <>
      <h1>Comments</h1>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Add comment..."
          onKeyDown={onKeyDown}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button
          onClick={() => {
            addComment(-1, commentText);
            setCommentText("");
          }}
        >
          Add
        </button>
      </div>

      <CommentsTree
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </>
  );
};

export default App;

const addCommentsToTree = (tree, commentId, text) => {
  for (const node of tree) {
    if (node.id === commentId) {
      node.replies.unshift({
        id: Date.now(),
        text,
        replies: [],
      });
      return true;
    }

    if (addCommentsToTree(node.replies, commentId, text)) return true;
  }
  return false;
};

const deleteCommentFromTree = (tree, commentId) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === commentId) {
      tree.splice(i, 1);
      return true;
    }
    if (deleteCommentFromTree(tree[i].replies, commentId)) return true;
  }
  return false;
};

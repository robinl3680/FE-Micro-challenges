import { useState } from "react";
import styles from "./style.module.css";

const CommentsTree = ({ comments, addComment, deleteComment }) => {
  const [showInput, setShowInput] = useState(-1);
  const [commentText, setCommentText] = useState("");

  const handleAdd = (commentId) => {
    if (commentText) {
      addComment(commentId, commentText);
      setShowInput(-1);
    }
    setCommentText("");
  };

  const cancelReply = () => {
    setShowInput(-1);
    setCommentText("");
  };

  const onKeyDown = (e, commentId) => {
    if (e.key === "Enter") handleAdd(commentId);
    else if (e.key === "Escape") cancelReply();
  };

  return comments.map((comment) => (
    <div key={comment.id}>
      <div className={styles.comment}>
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt={comment.text}
        />
        <div>
          <p>{comment.text}</p>
          {showInput === comment.id && (
            <input
              type="text"
              placeholder="Reply..."
              autoFocus
              value={commentText}
              onKeyDown={(e) => onKeyDown(e, comment.id)}
              onChange={(e) => setCommentText(e.target.value)}
            />
          )}
          {showInput === comment.id ? (
            <>
              <button onClick={() => handleAdd(comment.id)}>Add</button>
              <button onClick={cancelReply}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowInput(comment.id)}>Reply</button>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </>
          )}
        </div>
      </div>

      <div className={styles.comment_replies}>
        <CommentsTree
          comments={comment.replies}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  ));
};

export default CommentsTree;

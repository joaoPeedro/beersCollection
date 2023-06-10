import React from "react";
import Avatar from "../shared/avatar";
import styles from "./styles/comments.module.scss";

type CommentsListProps = {
  comments?: CommentBeer[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  if (!comments) return <p className="heading-5">Loading...</p>;

  if (comments && comments.length > 0) {
    return (
      <>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentsItems}>
            <Avatar
              url={comment.avatar}
              alt={comment.name}
              description={comment.name}
            />
            <p>{comment.comment}</p>
          </div>
        ))}
      </>
    );
  } else {
    return <p className="heading-5">No comments... 🤔</p>;
  }
}

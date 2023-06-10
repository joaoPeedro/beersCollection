"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getJsonData, sendJsonData } from "@/utils";
import styles from "./styles/comments.module.scss";
import CommentsList from "./commentsList";

type CommentsProps = {
  beerId: number;
};

const initialFormData = {
  name: "",
  comment: "",
};

export default function Comments({ beerId }: CommentsProps) {
  const [comments, setComments] = useState<CommentBeer[]>();
  const [isSendingData, setIsSendingData] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  function getComments() {
    getJsonData<CommentBeer[]>({
      endPoint: `${process.env.COMMENTS_GATEWAY}`,
    }).then((response) => {
      if (response) {
        setComments(
          response.filter((ele) => {
            return ele.beerId === beerId;
          })
        );
      }
    });
  }

  useEffect(() => {
    getComments();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSendingData(true);
    sendJsonData({
      data: { beerId, ...formData },
      endPoint: `${process.env.COMMENTS_GATEWAY}`,
    }).then((response) => {
      if (response) {
        setFormData(initialFormData);
        getComments();
      }

      setIsSendingData(false);
    });
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <section className={styles.containerComments}>
        <h3 className="heading-5">User Comments</h3>
        <CommentsList comments={comments} />
        {comments && (
          <form className={styles.addComment} onSubmit={handleSubmit}>
            <h3>Add comment</h3>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Your comment here..."
              rows={5}
              cols={33}
              value={formData.comment}
              required
              onChange={handleChange}
            />

            <button disabled={isSendingData}>Submit</button>
          </form>
        )}
      </section>
    </>
  );
}

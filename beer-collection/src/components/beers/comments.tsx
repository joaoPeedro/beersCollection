"use client";
import { getJsonData } from "@/utils";
import { useEffect, useState } from "react";

type CommentsProps = {
  beerId: number;
};

export default function Comments({ beerId }: CommentsProps) {
  const [comments, setComments] = useState<comment[]>();

  useEffect(() => {
    getJsonData<comment[]>({
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
  }, []);

  return (
    <>
      <section style={{ marginTop: "2rem" }}>
        <h2 className="heading-3">User Comments</h2>
        {comments &&
          comments.map((comment) => (
            <>
              <div>
                <p className="heading-5">{comment.name}</p>
                <p>{comment.comment}</p>
              </div>
            </>
          ))}
      </section>
      #TODO ADD COMMENT
    </>
  );
}

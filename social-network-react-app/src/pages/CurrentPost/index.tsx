import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../app/services/postApi";
import Card from "../../components/Card";
import GoBack from "../../components/GoBack";
import { Spinner } from "@nextui-org/react";
import CreateComment from "../../components/CreateComment";

const CurrentPost = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetPostByIdQuery(params?.id ?? "");

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <h2>This post doesn't exist</h2>;
  }

  const {
    id,
    content,
    author: { name, avatarUrl },
    comments,
    likes,
    authorId,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={avatarUrl ?? ""}
        content={content}
        name={name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commendId={comment.id}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default CurrentPost;

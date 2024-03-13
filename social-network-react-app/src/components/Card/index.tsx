import React, { useState } from "react";
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUICard,
  Spinner,
} from "@nextui-org/react";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app/services/likesApi";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postApi";
import { useDeleteCommentMutation } from "../../app/services/commentApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../features/user/userSlice";
import User from "../User";
import { formatToDate } from "../../utils/formatToDate";
import { RiDeleteBinLine } from "react-icons/ri";
import Typography from "../Typography";
import MetaInfo from "../MetaInfo";
import { FcDislike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import ErrorMessage from "../ErrorMessage";
import { hasErrorField } from "../../utils/hasErrorField";

type CardPropsType = {
  id?: string;
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commendId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  cardFor: "comment" | "post" | "current-post";
  likedByUser?: boolean;
};

const Card: React.FC<CardPropsType> = ({
  id = "",
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commendId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Invalid argument cardFor");
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(commendId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Invalid argument cardFor");
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();

      if (cardFor === "current-post") {
        await triggerGetPostById(id).unwrap();
      }

      if (cardFor === "post") {
        await triggerGetAllPosts().unwrap();
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  return (
    <NextUICard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div
              onClick={authorId !== currentUser?.id ? handleClick : () => {}}
            >
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUICard>
  );
};

export default Card;

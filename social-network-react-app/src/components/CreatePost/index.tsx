import React from "react";
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Textarea } from "@nextui-org/react";
import ErrorMessage from "../ErrorMessage";
import { IoMdCreate } from "react-icons/io";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue("post", "");
      await triggerAllPosts().unwrap();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Required field",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="New post"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}

      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Add post
      </Button>
    </form>
  );
};

export default CreatePost;

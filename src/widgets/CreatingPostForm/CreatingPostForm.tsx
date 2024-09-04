import React from "react";
import { useForm } from "react-hook-form";
import styles from "./CreatingPostForm.module.css";
import {
  useCreateNewPostMutation,
  useUpdatePostMutation,
} from "../../services/posts/posts.api";
import {
  StoredToken,
  DataValues,
  NewPostBody,
} from "../../types/posts/postsTypes";
import { date } from "../../services/lib/constants";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

type Props = {
  token: StoredToken | null;
  isEdit?: boolean;
  setIsEdit?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  post?: NewPostBody;
};

export const CreatingPostForm: React.FC<Props> = ({
  token,
  isEdit,
  setIsEdit,
  post,
}) => {
  const [createNewPost, { isLoading }] = useCreateNewPostMutation();
  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<DataValues>({
    defaultValues: {
      title: post?.companySignatureName ?? "",
      description: post?.documentStatus ?? "",
      status: post?.documentType ?? "",
      postType: post?.documentName ?? "",
      text: post?.employeeNumber ?? "",
      comment: post?.employeeSignatureName ?? "",
    },
    mode: "onBlur",
  });

  const onFormCreateSubmit = async (data: DataValues) => {
    try {
      const newPost = {
        companySigDate: date.toISOString(),
        companySignatureName: data.title,
        documentName: data.description,
        documentStatus: data.status,
        documentType: data.postType,
        employeeNumber: data.text,
        employeeSigDate: date.toISOString(),
        employeeSignatureName: data.comment,
        id: nanoid(),
      };
      await createNewPost({
        body: newPost,
        token: token,
      }).unwrap();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      reset();
      navigate("/posts", { replace: true });
    }
  };

  const onFormEditSubmit = async (data: DataValues) => {
    try {
      const newPost = {
        companySigDate: date.toISOString(),
        companySignatureName: data.title,
        documentName: data.description,
        documentStatus: data.status,
        documentType: data.postType,
        employeeNumber: data.text,
        employeeSigDate: date.toISOString(),
        employeeSignatureName: data.comment,
        id: post?.id,
      };
      await updatePost({
        id: newPost.id,
        token: token,
        body: newPost,
      }).unwrap();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      {
        setIsEdit && setIsEdit(false);
      }
      navigate("/posts", { replace: true });
      reset();
    }
  };

  return (
    <>
      {isLoading || updateLoading ? (
        <Spin fullscreen />
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit(onFormCreateSubmit)}
        >
          <span className={styles.phrase}>
            {isEdit ? "Edit post" : "Create new post"}
          </span>
          <label htmlFor="title">
            <span>Title</span>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className={errors?.title ? styles.titleError : styles.title}
              {...register("title", {
                required: "This field is required!",
                maxLength: {
                  value: 5000,
                  message: "Your title is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your title should contain at least 1 letter!",
                },
              })}
            />
            {errors?.title && <p>{errors?.title?.message}</p>}
          </label>
          <label htmlFor="description">
            <span>Description</span>
            <input
              type="text"
              id="description"
              placeholder="Description"
              className={errors?.description ? styles.titleError : styles.title}
              {...register("description", {
                required: "This field is required!",
                maxLength: {
                  value: 150,
                  message: "Your text is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your text should contain at least 1 letter!",
                },
              })}
            />
            {errors?.description && <p>{errors?.description?.message}</p>}
          </label>
          <label htmlFor="status">
            <span>Status</span>
            <input
              id="status"
              placeholder="Status"
              className={errors?.status ? styles.titleError : styles.title}
              {...register("status", {
                required: "This field is required!",
                maxLength: {
                  value: 150,
                  message: "Your text is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your text should contain at least 1 letter!",
                },
              })}
            />
            {errors?.status && <p>{errors?.status?.message}</p>}
          </label>
          <label htmlFor="postType">
            <span>Post Type</span>
            <input
              id="postType"
              placeholder="Post Type"
              className={errors?.postType ? styles.titleError : styles.title}
              {...register("postType", {
                required: "This field is required!",
                maxLength: {
                  value: 150,
                  message: "Your text is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your text should contain at least 1 letter!",
                },
              })}
            />
            {errors?.postType && <p>{errors?.postType?.message}</p>}
          </label>
          <label htmlFor="text">
            <span>Text</span>
            <input
              id="text"
              placeholder="Text"
              className={errors?.text ? styles.titleError : styles.title}
              {...register("text", {
                required: "This field is required!",
                maxLength: {
                  value: 150,
                  message: "Your text is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your text should contain at least 1 letter!",
                },
              })}
            />
            {errors?.text && <p>{errors?.text?.message}</p>}
          </label>
          <label htmlFor="comment">
            <span>Comment</span>
            <input
              id="comment"
              placeholder="Comment"
              className={errors?.comment ? styles.titleError : styles.title}
              {...register("comment", {
                required: "This field is required!",
                maxLength: {
                  value: 150,
                  message: "Your text is too long",
                },
                minLength: {
                  value: 1,
                  message: "Your text should contain at least 1 letter!",
                },
              })}
            />
            {errors?.comment && <p>{errors?.comment?.message}</p>}
          </label>
          <input
            type="submit"
            className={styles.sendButton}
            value="Send"
            disabled={!isValid}
            onClick={
              isEdit
                ? handleSubmit(onFormEditSubmit)
                : handleSubmit(onFormCreateSubmit)
            }
          />
        </form>
      )}
    </>
  );
};

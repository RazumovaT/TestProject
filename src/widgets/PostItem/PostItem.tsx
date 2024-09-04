import React, { useState } from "react";
import styles from "../PostItem/PostItem.module.css";
import { NewPostBody, StoredToken } from "../../types/posts/postsTypes";
import { converDate, converTime } from "./model/convertDate";
import { CloseOutlined, SettingFilled } from "@ant-design/icons";
import { useDeletePostMutation } from "../../services/posts/posts.api";
import { CreatingPostForm } from "../CreatingPostForm/CreatingPostForm";

type Props = {
  post: NewPostBody;
  token: StoredToken | null;
};

export const PostItem: React.FC<Props> = ({ post, token }) => {
  const [deletePost] = useDeletePostMutation();
  const [isEdit, setIsEdit] = useState(false);

  const onDeleteSubmit = async (id: string | undefined) => {
    try {
      await deletePost({ id, token: token }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  const onEditSubmit = () => {
    setIsEdit(true);
  };
  if (isEdit) {
    return (
      <CreatingPostForm
        token={token}
        isEdit={isEdit}
        post={post}
        setIsEdit={setIsEdit}
      />
    );
  }
  return (
    <div className={styles.post}>
      <div className={styles.info}>
        <div className={styles.block}>
          <div className={styles.about}>
            <div className={styles.title}>
              {post?.companySignatureName?.length > 40
                ? post.companySignatureName.substring(0, 40) + "..."
                : post.companySignatureName}
            </div>
          </div>
        </div>
        <div className={styles.block}>
          <SettingFilled
            style={{
              fontSize: "16px",
              color: "#08c",
              marginTop: "13px",
              marginRight: "7px",
              cursor: "pointer",
            }}
            onClick={() => onEditSubmit()}
          />
          <CloseOutlined
            style={{
              fontSize: "16px",
              color: "#08c",
              marginTop: "13px",
              cursor: "pointer",
            }}
            onClick={() => onDeleteSubmit(post?.id)}
          />
          <div className={styles.user}>
            <p className={styles.line}>{converDate(post.companySigDate)}</p>
            <p className={styles.date}>{converTime(post.employeeSigDate)}</p>
          </div>

          <img
            src={
              "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            }
            className={styles.img}
            alt="avatar"
          />
        </div>
      </div>
      <article className={styles.article}>{post.documentStatus}</article>
      <article className={styles.article}>{post.documentType}</article>
      <article className={styles.article}>{post.documentName}</article>
      <article className={styles.article}>{post.employeeNumber}</article>
      <article className={styles.article}>{post.employeeSignatureName}</article>
    </div>
  );
};

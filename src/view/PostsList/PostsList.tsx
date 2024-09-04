import React, { useState } from "react";
import { useGetAllPostsQuery } from "../../services/posts/posts.api";
import { nanoid } from "@reduxjs/toolkit";
import styles from "../PostsList/PostsList.module.css";
import { PostItem } from "../../widgets/PostItem/PostItem";
import { MockData } from "../../tests/mocks/mockData";
import { NewPostBody, StoredToken } from "../../types/posts/postsTypes";
import { Spin } from "antd";
type Props = {
  token: StoredToken | null;
};
export const PostsList: React.FC<Props> = ({ token }) => {
  const [data, setData] = useState<NewPostBody[] | null>(null);
  setData(MockData);

  const { data: posts, isLoading } = useGetAllPostsQuery(token);
  console.log(posts);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <div className={styles.list}>
          {data &&
            data.map((post) => (
              <div className={styles.posts} key={nanoid()}>
                <PostItem post={post} token={token} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

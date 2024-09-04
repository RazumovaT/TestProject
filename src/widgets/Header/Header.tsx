import React from "react";
import styles from "../Header/Header.module.css";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../shared/Layout/Layout";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const onLogOutSubmit = () => {
    window.localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Layout>
      <>
        <div className={styles.buttons}>
          <div>
            <Link to="/createPost">
              <Button className={styles.createButton}>Create article</Button>
            </Link>
          </div>
          <div>
            {
              <img
                src={
                  "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                }
                className={styles.avatar}
                alt="avatar"
              />
            }
          </div>
          <Button className={styles.logoutButton} onClick={onLogOutSubmit}>
            Log out
          </Button>
        </div>
        <Link className={styles.title} to="/posts">
          Blog Posts
        </Link>
        <div className={styles.links}>
          <Link to="/signIn">
            <Button className={styles.signButton}>Sign In</Button>
          </Link>
          <Link to="/">
            <Button className={styles.signButton}>Sign Up</Button>
          </Link>
        </div>
      </>
    </Layout>
  );
};

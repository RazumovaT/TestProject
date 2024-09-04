import React, { useState, useEffect } from "react";
import { Landing } from "../features/Landing/Landing";
import { AuthorizationForm } from "../widgets/AuthorizationForm/AuthorizationForm";
import { Header } from "../widgets/Header/Header";
import { CreatingPostForm } from "../widgets/CreatingPostForm/CreatingPostForm";
import { PostsList } from "../view/PostsList/PostsList";
import { SignInForm } from "../widgets/SignInForm/SignInForm";
import { Routes, Route } from "react-router-dom";
import { StoredToken } from "../types/posts/postsTypes";
import { ProtectedRoute } from "../features/ProtectedRoute/ProtectedRoute";
import { Footer } from "../widgets/Footer/Footer";


const getToken = (token: any): StoredToken | null => {
  let result = null;
  const storedToken = localStorage.getItem(token);
  storedToken && (result = JSON.parse(storedToken));
  return result;
};

export const App: React.FC = () => {
  const [logged, setLogged] = useState<StoredToken | null>(
    getToken("isLoggedIn")
  );
  const [token, setToken] = useState<StoredToken | null>(getToken("token"));

  useEffect(() => {
    const onStorage = () => {
      setLogged(getToken("isLoggedIn"));
      setToken(getToken("token"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <>
      <Landing>
        <Header />
        <Routes>
          <Route path="posts" element={<PostsList token={token} />} />
          <Route path="/" element={<AuthorizationForm />} />
          <Route path="signIn" element={<SignInForm />} />
          <Route
            path="createPost"
            element={
              <ProtectedRoute logged={logged}>
                <CreatingPostForm token={token} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Landing>
      <Footer />
    </>
  );
};

import React from "react";
import { Card } from "antd";
import styles from "../SignInForm/SignInForm.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
type SignInValues = {
  username: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignInValues>({
    mode: "onBlur",
  });

  const onSignInSubmit = (data: SignInValues) => {
    const token = `supersecrettoken_for_${data.username}`;
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.dispatchEvent(new Event("storage"));
    reset();
    navigate("/posts", { replace: true });
  };

  return (
    <>
      <Card className={styles.box}>
        <div className={styles.title}>Sign In</div>
        <form onSubmit={handleSubmit(onSignInSubmit)}>
          <label htmlFor="username">
            <div className={styles.inputTitle}>Username</div>
            <input
              type="text"
              id="username"
              className={errors?.username ? styles.errorInput : styles.input}
              placeholder="Username"
              {...register("username", {
                required: "This field is required!",
                minLength: {
                  value: 3,
                  message: "Your username needs to be at least 3 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Your username needs to be less than 20 characters.",
                },
              })}
            />
            {errors?.username && <p>{errors?.username?.message}</p>}
          </label>
          <label htmlFor="password">
            <div className={styles.inputTitle}>Password</div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={errors?.password ? styles.errorInput : styles.input}
              {...register("password", {
                required: "This field is required!",
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Your password needs to be less than 20 characters.",
                },
              })}
            />
            {errors?.password && <p>{errors?.password?.message}</p>}
          </label>
          <input
            type="submit"
            value="Login"
            disabled={!isValid}
            onClick={handleSubmit(onSignInSubmit)}
          />
          <div className={styles.signBox}>
            <span className={styles.accountText}>Dont have an account? </span>
            <Link to="/auth" className={styles.signText}>
              Sing Up.
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
};

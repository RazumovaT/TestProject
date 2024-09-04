import React from "react";
import { Card, Divider, Spin } from "antd";
import { useForm } from "react-hook-form";
import styles from "./AuthorizationForm.module.css";
import { useRegisterUserMutation } from "../../services/auth/registration.api";
import { RegisterUserBodyRequest } from "../../types/auth/registrationTypes";
import { useNavigate, Link } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
  repeatPassword: string;
};

export const AuthorizationForm: React.FC = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmitForm = async (data: RegisterUserBodyRequest) => {
    let formData;
    try {
      formData = {
        username: data.username,
        password: data.password,
      };
      const formDataResponse = await registerUser(formData).unwrap();
      window.localStorage.setItem(
        "token",
        JSON.stringify(formDataResponse.data.token)
      );
      window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
      window.dispatchEvent(new Event("storage"));
      navigate("/posts", { replace: true });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      reset();
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <Card className={styles.box}>
          <div className={styles.title}>Create new account</div>
          <form onSubmit={handleSubmit(onSubmitForm)}>
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
                    message:
                      "Your username needs to be less than 20 characters.",
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
                    message:
                      "Your password needs to be less than 20 characters.",
                  },
                })}
              />
              {errors?.password && <p>{errors?.password?.message}</p>}
            </label>
            <label htmlFor="repeatPassword">
              <div className={styles.inputTitle}>Repeat password</div>
              <input
                type="password"
                id="repeatPassword"
                placeholder="Repeat password"
                className={
                  errors?.repeatPassword ? styles.errorInput : styles.input
                }
                {...register("repeatPassword", {
                  required: "This field is required!",
                  minLength: {
                    value: 6,
                    message: "Your password needs to be at least 6 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "Your password needs to be less than 20 characters.",
                  },
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "Your passwords don`t match!";
                    }
                  },
                })}
              />
              {errors?.repeatPassword && (
                <p>{errors?.repeatPassword?.message}</p>
              )}
            </label>
            <Divider className={styles.divider} />
            <input type="submit" value="Create" disabled={!isValid} />
            <div className={styles.signBox}>
              <span className={styles.accountText}>
                Already have an account?
              </span>
              <Link to="/signIn" className={styles.signText}>
                Sing in.
              </Link>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

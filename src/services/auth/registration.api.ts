import {
  RegisterUserBodyRequest,
  RegisterUserResponse,
} from "../../types/auth/registrationTypes";
import { postApi } from "../api/configuration.api";

export const registrationAPI = postApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<RegisterUserResponse, RegisterUserBodyRequest>(
      {
        query: (body) => ({
          url: "/ru/data/v3/testmethods/docs/login",
          method: "POST",
          body,
        }),
      }
    ),
  }),
});

export const { useRegisterUserMutation } = registrationAPI;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../lib/constants";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({}),
});

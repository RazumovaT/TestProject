import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://test.v5.pryaniky.com";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const date = new Date();

import { postApi } from "../api/configuration.api";
import { NewPostBody, StoredToken } from "../../types/posts/postsTypes";

export const postAPI = postApi.injectEndpoints({
  endpoints: (build) => ({
    createNewPost: build.mutation<
      any,
      { body: NewPostBody; token: StoredToken | null }
    >({
      query: ({ body, token }) => ({
        url: "/ru/data/v3/testmethods/docs/userdocs/create",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body,
        invalidatesTags: () => [{ type: "Post", id: "LIST" }],
      }),
    }),
    getAllPosts: build.query<NewPostBody[], StoredToken | null>({
      query: (token) => ({
        url: "/ru/data/v3/testmethods/docs/userdocs/get",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        providesTags: (result: NewPostBody[]) =>
          result
            ? [
                ...result.map((_, id) => ({ type: "Posts" as const, id })),
                { type: "Posts", id: "LIST" },
              ]
            : [{ type: "Posts", id: "LIST" }],
      }),
    }),
    deletePost: build.mutation<void, { id: string | undefined; token: StoredToken | null }>(
      {
        query: ({ id, token }) => ({
          url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          invalidatesTags: () => [{ type: "Post", id: "LIST" }],
        }),
      }
    ),
    updatePost: build.mutation<
      NewPostBody,
      {
        id: string | undefined;
        token: StoredToken | null;
        body: NewPostBody | undefined;
      }
    >({
      query: ({ id, token, body }) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body,
        invalidatesTags: () => [{ type: "Post", id: "LIST" }],
      }),
    }),
  }),
});

export const {
  useCreateNewPostMutation,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postAPI;

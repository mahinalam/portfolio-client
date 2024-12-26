// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => `/projects`,
    }),
    getAllSkills: builder.query({
      query: () => `/skills`,
    }),
    getAllBlogs: builder.query({
      query: () => `/blogs`,
    }),
    createProject: builder.mutation({
      query: (payload) => ({
        url: `/projects`,
        method: "POST",
        body: payload,
      }),
    }),
    createSkills: builder.mutation({
      query: (payload) => ({
        url: `/skills`,
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetAllSkillsQuery,
  useCreateSkillsMutation,
  useGetAllBlogsQuery,
  useLoginMutation,
} = baseApi;

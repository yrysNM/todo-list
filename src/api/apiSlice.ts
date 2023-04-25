import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArchiveItem } from "../Interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      );
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<IArchiveItem[], "">({
      query: () => `/tasks`,
    }),
  }),
});

export const { useGetItemsQuery } = apiSlice;

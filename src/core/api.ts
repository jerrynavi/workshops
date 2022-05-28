import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryType, Workshop } from 'models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001/' }),
  endpoints: (builder) => ({
    getWorkshops: builder.query<Workshop[], void>({
      query: () => 'workshops',
    }),
    getWorkshopById: builder.query<Workshop, number>({
      query: (id: number) => `workshops/${id}`,
    }),
    getCategories: builder.query<CategoryType[], void>({
      query: () => 'categories',
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetWorkshopByIdQuery,
  useGetWorkshopsQuery,
} = api;

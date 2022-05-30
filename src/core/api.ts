import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryType, Workshop } from 'models';
import li from 'li';

type WorkshopCollectionQueryType = {
  _page?: number;
  category?: CategoryType;
} | void;

type WorkshopCollectionResponseType = {
  data: Workshop[];
  next?: number;
  last?: number;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001/' }),
  endpoints: (builder) => ({
    getWorkshops: builder.query<
      WorkshopCollectionResponseType,
      WorkshopCollectionQueryType
    >({
      query: (query) => {
        if (query == null) {
          return 'workshops';
        }
        const { _page, category } = query;
        const _query = new URLSearchParams({
          _limit: `${9}`,
          ...(_page != null && {
            _page: `${_page}`,
          }),
          ...(category != null && {
            category,
          }),
        });
        return `workshops?` + _query.toString();
      },
      transformResponse: (response: Workshop[], meta) => {
        const links: Record<string, string> = li.parse(
          meta?.response?.headers.get('Link'),
        );
        const next = new URLSearchParams(links['next'])?.get('_page');
        const last = new URLSearchParams(links['last'])?.get('_page');
        return {
          data: response,
          ...(next != null &&
            next !== '' && {
              next: Number(next),
            }),
          ...(last != null &&
            last !== '' && {
              last: Number(last),
            }),
        };
      },
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
  useLazyGetWorkshopsQuery,
} = api;

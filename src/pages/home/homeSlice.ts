import { createSlice } from '@reduxjs/toolkit';
import { api } from 'core';
import { CategoryType, Workshop } from 'models';
import uniqBy from 'lodash/uniqBy';

type HomeState = {
  data: Workshop[];
  lastPage?: number;
  activeCategory?: CategoryType;
};

const initialState: HomeState = {
  data: [],
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getWorkshops.matchFulfilled,
      (state, { payload, meta }) => {
        const {
          arg: { originalArgs },
        } = meta;
        const { data, last } = payload;
        state.data = uniqBy([...state.data, ...data], 'id').sort((a, b) =>
          b.date.localeCompare(a.date),
        );
        state.lastPage = last;
        if (originalArgs != null) {
          state.activeCategory = originalArgs.category;
        }
      },
    );
    builder.addMatcher(
      api.endpoints.getWorkshops.matchPending,
      (state, { meta }) => {
        const { activeCategory, lastPage } = state;
        const {
          arg: { originalArgs },
        } = meta;
        const shouldCheckForInvalidPagination =
          lastPage != null && originalArgs?._page != null;
        if (shouldCheckForInvalidPagination && lastPage > originalArgs._page!) {
          state.lastPage = 1;
        }
        if (
          activeCategory !== originalArgs?.category ||
          (!originalArgs?.category && activeCategory != null)
        ) {
          state.data = [];
          state.lastPage = 1;
        }
      },
    );
  },
});

export default slice.reducer;

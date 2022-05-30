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
        state.data = uniqBy([...state.data, ...data], 'id');
        state.lastPage = last;
        if (originalArgs != null) {
          state.activeCategory = originalArgs.category;
        }
      },
    );
    builder.addMatcher(
      api.endpoints.getWorkshops.matchPending,
      (state, { meta }) => {
        const { activeCategory } = state;
        const {
          arg: { originalArgs },
        } = meta;
        if (
          activeCategory !== originalArgs?.category ||
          (!originalArgs?.category && activeCategory != null)
        ) {
          state.data = [];
        }
      },
    );
  },
});

export default slice.reducer;

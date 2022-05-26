import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  pageTitle: string;
}

const initialState: AppState = {
  pageTitle: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;

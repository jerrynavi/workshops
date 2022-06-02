import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CheckoutState = {
  isOpen: boolean;
};

const initialState: CheckoutState = {
  isOpen: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    toggleCheckoutOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload;
    },
  },
});

export default checkoutSlice.reducer;

export const { toggleCheckoutOpen } = checkoutSlice.actions;

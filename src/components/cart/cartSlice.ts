import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workshop } from 'models';

type CartItem = {
  workshop: Workshop;
  total: number;
};

type CartState = {
  subtotal: number;
  items: CartItem[];
  open: boolean;
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  open: false,
};

function getSubtotal(items: CartItem[]) {
  return items.map((item) => item.total).reduce((a, b) => a + b);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      { payload }: PayloadAction<{ workshop: Workshop; total: number }>,
    ) {
      state.items.push(payload);
      state.subtotal = getSubtotal(state.items);
    },
    removeFromCart(state, { payload }: PayloadAction<{ id: number }>) {
      state.items.splice(
        state.items.findIndex(({ workshop }) => workshop.id === payload.id),
        1,
      );
      state.subtotal = getSubtotal(state.items);
    },
    updateCart(
      state,
      { payload }: PayloadAction<{ id: number; data: CartItem }>,
    ) {
      state.items.splice(
        state.items.findIndex(({ workshop }) => workshop.id === payload.id),
        1,
        payload.data,
      );
      state.subtotal = getSubtotal(state.items);
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

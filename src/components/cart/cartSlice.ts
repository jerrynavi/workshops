import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workshop } from 'models';

export type CartItemType = {
  workshop: Workshop;
  total: number;
};

type CartState = {
  subtotal: number;
  items: CartItemType[];
  open: boolean;
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  open: false,
};

function getSubtotal(items: CartItemType[]) {
  return items
    .map(({ workshop: { price }, total }) => {
      return price * total;
    })
    .reduce((a, b) => a + b);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      { payload }: PayloadAction<{ workshop: Workshop; total: number }>,
    ) {
      const itemIndex = state.items.findIndex(
        ({ workshop }) => workshop.id === payload.workshop.id,
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1, payload);
        state.subtotal = getSubtotal(state.items);
      } else {
        state.items.push(payload);
        state.subtotal = getSubtotal(state.items);
      }
      if (!state.open) {
        state.open = true;
      }
    },
    removeFromCart(state, { payload }: PayloadAction<{ id: number }>) {
      state.items.splice(
        state.items.findIndex(({ workshop }) => workshop.id === payload.id),
        1,
      );
      if (state.items.length > 0) {
        state.subtotal = getSubtotal(state.items);
      }
    },
    updateCart(
      state,
      { payload }: PayloadAction<{ id: number; data: CartItemType }>,
    ) {
      state.items.splice(
        state.items.findIndex(({ workshop }) => workshop.id === payload.id),
        1,
        payload.data,
      );
      state.subtotal = getSubtotal(state.items);
    },
    toggleOpen(state, { payload }: PayloadAction<boolean>) {
      state.open = payload;
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, updateCart, toggleOpen } =
  cartSlice.actions;

import { Action, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from 'store';
import { RootState } from './rootReducer';

type AppDispatch = typeof store.dispatch;
type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type { RootState, AppThunk };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useCart() {
  const cart = useAppSelector((s) => s.cart);
  return cart;
}

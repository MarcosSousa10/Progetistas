/* eslint-disable prettier/prettier */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartType } from '../../../shared/types/cartType';
interface CartStore {
    cart?: CartType;
}
const initialState: CartStore = {
  cart: undefined,
}
export const CartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    setCartAction: (state, action: PayloadAction<CartType>) => {
      state.cart = action.payload;
    },
  },
});

export const { setCartAction } = CartSlice.actions;

export default CartSlice.reducer;

/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux';
import {useAppSelector} from '../../hooks';
import { setCartAction } from '.';
import { CartType } from '../../../shared/types/cartType';


export const useCartReducer = () => { 
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.cartReducer);
  const setCart = (currentCart: CartType) => {
    dispatch(setCartAction(currentCart));
   };

  return {
    cart,
    setCart,
  };
};

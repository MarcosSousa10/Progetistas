/* eslint-disable prettier/prettier */
import Text from '../../../shared/components/text/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductType } from '../../../shared/types/productType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
export type ProductNavigationProp = NativeStackNavigationProp<Record<string, ProductParams>>;
export interface ProductParams{
    product: ProductType;
}
const Product = () => {
    const {params} = useRoute<RouteProp<Record<string,ProductParams >>>();
    const {product} = params;
  return <Text>{product.name}</Text>;
};
export default Product;

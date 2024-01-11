/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { useProductReducer } from '../../../story/reducers/productReducer/useProductReducer';
import { PaginationType } from '../../../shared/types/paginationType';
import { ProductType } from '../../../shared/types/productType';
import { URL_PRODUCT_PAGE } from '../../../shared/constants/urls';
import Input from '../../../shared/components/input/input';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, TextInputChangeEventData } from 'react-native';
import ProductThumbnail from '../../../shared/components/productThumbnail/ProductThumbnail';
import { ActivityIndicatorButton } from '../../../shared/components/button/button.syle';
import { theme } from '../../../shared/themes/theme';
import { SearchPosductConatainer, SerachProductView } from '../styles/searchProduct.style';
export type SearchProductNavigationProp = NativeStackNavigationProp<Record<string, SearchProductParams>>;
export interface SearchProductParams{
  search?: string;
}
const SearchProduct = () => {
  const {searchProducts, setSearchProducts, insertSearchProducts } = useProductReducer();
  const {params} = useRoute<RouteProp<Record<string,SearchProductParams >>>();
  // const {search} = params;
  const [value, setValue] = useState(params?.search || '');

  const {request, loading} = useRequest();
  useEffect(() => {
 return setValue(params?.search || '');
  }, [params]);

  useEffect(() => {
    setSearchProducts(undefined);
      request<PaginationType<ProductType[]>>({
      url: `${URL_PRODUCT_PAGE}?search=${value}`,
      method: MethodEnum.GET,
      saveGlobal:setSearchProducts,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const findNewPage = () => {
    if (searchProducts && searchProducts?.meta.currentPage < searchProducts?.meta.totalPages)  {
      request<PaginationType<ProductType[]>>({
      url: `${URL_PRODUCT_PAGE}?search=${value}&page=${searchProducts?.meta.currentPage + 1}`,
      method: MethodEnum.GET,
      saveGlobal:insertSearchProducts,
    });
  }
}
  const handleOnChangeinput = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(event.nativeEvent.text);
  };
const handelScroll = (event: NativeSyntheticEvent<NativeScrollEvent>)=>{
 const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
 const isEndScroll = contentOffset.y >= (contentSize.height) - layoutMeasurement.height;
 if (isEndScroll && !loading){
  findNewPage();
 }
};
  return (
    <SearchPosductConatainer>
    <Input onChange={handleOnChangeinput} value={value}  iconRight='search'/>
    {searchProducts && searchProducts.data && ( 
    <ScrollView onScroll={handelScroll}> <SerachProductView>{searchProducts.data.map((product) => <ProductThumbnail margin='4px 0px' product={product}/>)}</SerachProductView></ScrollView>
    )}
    {loading && <ActivityIndicatorButton color={theme.colors.mainTheme.primary}/>}
    </SearchPosductConatainer>
  );
};
export default SearchProduct;
/* eslint-disable react/react-in-jsx-scope *//* eslint-disable prettier/prettier *//* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FlatList, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native';
import { useProductReducer } from '../../../story/reducers/productReducer/useProductReducer';
import { useRequest } from '../../../shared/hooks/useRequest';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
import { ProductType } from '../../../shared/types/productType';

import ProductThumbnail from '../../../shared/components/productThumbnail/ProductThumbnail';
import Input from '../../../shared/components/input/input';
import { DisplayFlexColumn } from '../../../shared/components/globalStyles/globalView.style';
import { HomeContainer } from '../styles/home.style';
import {useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../../../shared/enums/MenuUrl.wnum';
import { SearchProductNavigationProp } from '../../searchProduct/screen/SearchProduct';
import React from 'react';

const Home = () => {
  const navigation = useNavigation<SearchProductNavigationProp>();
 const [search, setSearch] = React.useState('');
  const {request} = useRequest();
const {products, setProducts} = useProductReducer();
useEffect(() => {
    request<ProductType[]>({
      url: URL_PRODUCT,
      method: MethodEnum.GET,
      saveGlobal: setProducts,
    });
    console.log(products);
}, []);
 const handlGoToProduct = ()=>{
  navigation.navigate(MenuUrl.SEARCH_PRODUCT,{
    search,
  });
 };
 const handleOnChangeSearch = (event: NativeSyntheticEvent<TextInputChangeEventData>) =>{
  setSearch(event.nativeEvent.text);
 };
 return (
    <View>
      <HomeContainer>
                <Input onPressIconRight={handlGoToProduct} value={search} onChange={handleOnChangeSearch} iconRight='search'/>
      </HomeContainer>


      <DisplayFlexColumn/>
      
    <FlatList
    horizontal
    data={products} 
    renderItem={({item}) => <ProductThumbnail margin='0px 8px' product={item}/> }/>
    {/* {products.map((product)=> (    
    <TouchableOpacity onPress={()=>handlGoToProduct(product)}><Text>{product.name}</Text></TouchableOpacity>
    ))} */}
    </View>
);
};
export default Home;

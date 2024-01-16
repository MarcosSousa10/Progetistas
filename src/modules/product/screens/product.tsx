/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';
import { Icon } from '../../../shared/components/icon/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { ContainerPrincipal, ImagelogPrincipal, TextPrincipal, TextPrincipalF,
   ViewPrincipalCenter, ViewPrincipalCondicao, ViewPrincipalCondicaoColumn, ViewPrincipalrCentro }
    from '../styles/product.styles';
import { useProduct } from '../hooks/useProduct';

const Product = () => {

  const { refreshing1, datas, handleOnPress, update, onRefresh } = useProduct();

  useFocusEffect(
    React.useCallback(() => {
      handleOnPress();
    }, []),
  );
  const styles = {
    container: {
      margin: 5,
      borderColor: 'black',
    },
  };
  return (
    <ContainerPrincipal>
      <ImagelogPrincipal
        resizeMode="contain"
        source={require('../../../assets/images/2021_logo-luminato_othon-de-carvalho_page-0002-removebg-preview.png')}
      />

      <FlatList
        style={styles.container}
        data={datas}
        keyExtractor={item => item.numorca.toString()}
        renderItem={({ item, index }) => (
          <View key={index}>
            <ViewPrincipalCondicao key={item.codprod}>
              <ViewPrincipalCondicaoColumn>
                <ViewPrincipalCenter>
                  <Text
                    type={textTypes.TITLE_SEMI_BOLD}
                    style={{ fontSize: 30 }}
                    color={theme.colors.neutraTheme.darkBlack}>
                    {item.projetista}
                  </Text>
                </ViewPrincipalCenter>
                <ViewPrincipalrCentro>
                  <TextPrincipalF>
                    <Text
                      type={textTypes.PARAGRAPH_SEMI_BOLD}
                      color={theme.colors.neutraTheme.black}>
                      Cliente:
                    </Text>
                    {item.cliente}
                  </TextPrincipalF>
                  <TextPrincipalF>
                    <Text
                      type={textTypes.PARAGRAPH_SEMI_BOLD}
                      color={theme.colors.neutraTheme.black}>
                      Orçamento:
                    </Text>
                    {item.numorca}
                  </TextPrincipalF>
                  <TextPrincipalF>
                    <Text
                      type={textTypes.PARAGRAPH_SEMI_BOLD}
                      color={theme.colors.neutraTheme.black}>
                      Fisica/Juridico:
                    </Text>
                    {item.tipocliente}
                  </TextPrincipalF>
                  <View style={{ flexDirection: 'row' }}>
                    <TextPrincipalF>
                      <Text
                        type={textTypes.PARAGRAPH_SEMI_BOLD}
                        color={theme.colors.neutraTheme.black}>
                        Valor:
                      </Text>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(Number(item.valor))}
                    </TextPrincipalF>
                    <TextPrincipal>
                      <Text
                        type={textTypes.PARAGRAPH_SEMI_BOLD}
                        color={theme.colors.neutraTheme.black}>
                        Comissão:
                      </Text>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(Number(item.vlcomissaoproj))}
                    </TextPrincipal>
                  </View>
                </ViewPrincipalrCentro>
              </ViewPrincipalCondicaoColumn>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity
                  onPress={() =>
                    update(item.numorca, 'AP')
                  }>
                  <Text
                    style={{
                      fontSize: 50,
                      marginLeft: 7,
                      marginBottom: '50%',
                    }}>
                    <Icon
                      color={theme.colors.neutraTheme.darkBlack}
                      name={'checkmark2'}
                      size={40}
                    />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update(item.numorca, 'RP')
                  }>
                  <Text
                    style={{
                      fontSize: 50,
                      marginLeft: 7,
                    }}
                    color={theme.colors.neutraTheme.darkBlack}>
                    <Icon
                      color={theme.colors.neutraTheme.darkGray}
                      name={'cross'}
                      size={40}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </ViewPrincipalCondicao>

          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing1} onRefresh={onRefresh} />
        }
      />
    </ContainerPrincipal>
  );
};

export default Product;

/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable prettier/prettier *//* eslint-disable react-native/no-inline-styles */
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { Icon } from '../../../shared/components/icon/Icon';
import { textTypes } from '../../../shared/components/text/textTypes';
import { useFocusEffect } from '@react-navigation/native';
import { useBaixar } from '../hooks/useBaixar';
import { TextBaixar, ViewBaixar, ViewBaixarCenter, ViewBaixarCentro, ViewBaixarCondicao, ViewBaixarCondicaoColumn, ViewBaixarLoading } from '../styles/baixa.styles';

const Baixar = () => {
  const {condicao,data,handleOnPress,sendStatusToServer} = useBaixar();

  useFocusEffect(
    React.useCallback(() => {
      handleOnPress();
        }, [])
  );

  return (
    <ScrollView >
      <Text style={{textAlign:'center'}} type={textTypes.TITLE_SEMI_BOLD} color={theme.colors.neutraTheme.darkBlack}>Baixar </Text>
      {data ? (
      <ViewBaixar>
        {data.map((item, index) => (
        <View key={index}>
          { condicao ? (
            <ViewBaixarCondicao
              key={item.codprod}
            >
              <ViewBaixarCondicaoColumn>
                 <ViewBaixarCenter>

                <Text type={textTypes.TITLE_SEMI_BOLD} style={{fontSize: 40 }} color= {theme.colors.neutraTheme.darkBlack}>
                {item.projetista}
                </Text>
                </ViewBaixarCenter>
                  <ViewBaixarCentro>
                <TextBaixar>
                  <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Cliente: </Text>{item.cliente}
                </TextBaixar>
                <TextBaixar>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Orçamento: </Text>{item.numorca}
                </TextBaixar>
                <View style={{ flexDirection: 'row' }}>
                <TextBaixar>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Fisica/Juridico: </Text>{item.tipocliente}
                </TextBaixar>
                <TextBaixar>
                <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Status: </Text>{item.statusprojetista}
                </TextBaixar>
                </View>
                <View style={{ flexDirection: 'row' }}>

                <TextBaixar>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Valor: </Text>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor))}
                </TextBaixar>
                <Text  style={{ marginLeft: 5, fontSize: 12 }}>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Comissão: </Text>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.vlcomissaoproj))}
                </Text>
                </View>

                <TextBaixar>
                <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Dt Ap/Comissão: </Text>{item.dtaprovcomissao}
                </TextBaixar>

                </ViewBaixarCentro>
                </ViewBaixarCondicaoColumn>
                <TouchableOpacity
                onPress={ ()=> {sendStatusToServer(item.numorca, 'criar');}
              }>
                <Text style={{marginLeft:7}}>
                <Icon color={theme.colors.neutraTheme.darkGray} name={'coin-dollar'} size={50}  />
                </Text>
              </TouchableOpacity>
            </ViewBaixarCondicao>
          ) : (
            <ViewBaixarLoading style={{ flex: 1,marginTop:'50%', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" animating={true} color={theme.colors.neutraTheme.black} hidesWhenStopped={true}/>
              </ViewBaixarLoading>
          )}
        </View>
      ))}
      </ViewBaixar>
      ) : (<ViewBaixarLoading style={{ flex: 1, marginTop: '50%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.neutraTheme.black} animating={true} hidesWhenStopped={true} />
      </ViewBaixarLoading>

      )}
    </ScrollView>
  );
};

export default Baixar;

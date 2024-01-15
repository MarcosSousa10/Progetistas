/* eslint-disable prettier/prettier */
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../../shared/themes/theme';
import { ListaType } from '../../../shared/types/ListaType';
import axios from 'axios';
import Text from '../../../shared/components/text/Text';
import { Icon } from '../../../shared/components/icon/Icon';
import { textTypes } from '../../../shared/components/text/textTypes';
import { useFocusEffect } from '@react-navigation/native';

const ProjetistasStatus = () => {
  const [data, setData] = useState<ListaType[]>([]);

  const [condicao, setCondicao] = useState<boolean>(false);
  useFocusEffect(
    React.useCallback(() => {
      setCondicao(false);
      Consultar();
    }, [])
  );

  const Consultar = async () => {
    try {
      const responses = await axios.get(
        'http://192.168.2.181:8080/StatusProjetistaEstorno',
      );
     
      setTimeout(() => {
        setCondicao(true);
     }, 1000);
           setData(responses.data);
    } catch (error) {
      console.log(error);
    }
  };


  const sendStatusToServer = async (numorca: string) => {
    try {
      await axios.get(`http://192.168.2.181:8080/UpdataStatus/0/${numorca}`);
      Consultar();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView >
      { data ? (
      <View style={{margin: 5,borderColor:'black' }}>
        {data.map((item, index) => (
        <View key={index}>
          {condicao ? (
            <View
              key={item.codprod}
              style={{
                flexDirection: 'row',
                padding: 1,
                alignItems: 'center',
                alignContent: 'center',
                borderWidth:3,
                borderRadius:10,
                marginBottom:10
              }}>
            
              <View
                style={{
                  flexDirection: 'column',
                  alignContent: 'center',
                  borderRightWidth:1,
                  padding:10,
                  minWidth:'80%',
                  maxWidth:'85%',
                                 }}>
                                  <View  style={{ alignItems: 'center' }}>
                <Text type={textTypes.TITLE_SEMI_BOLD} style={{fontSize: 40 }} color= {theme.colors.neutraTheme.darkBlack}>
                {item.projetista}
                </Text>
                </View>
                <View style={{alignItems: 'flex-start'}}>
                <Text style={{  fontSize: 12 }}>
                  <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Cliente: </Text>{item.cliente}
                </Text>
                <Text style={{  fontSize: 12 }}>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Orçamento: </Text>{item.numorca}
                </Text>
                <View style={{ flexDirection: 'row' }}>

                <Text style={{  fontSize: 12 }}>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Fisica ou Juridico: </Text>{item.tipocliente}
                </Text>               
                 <Text style={{marginLeft:5,  fontSize: 12 }}>
                <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Status: </Text>{item.statusprojetista}
                </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>

                <Text style={{  fontSize: 12 }}>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Valor: </Text>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor))}
                </Text>
                <Text  style={{marginLeft:5,  fontSize: 12 }}>
                <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Comissão: </Text>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.vlcomissaoproj))}
                </Text>
                </View>

                <Text style={{  fontSize: 12 }}>
                <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Dt  Ap/Comissão: </Text>{item.dtaprovcomissao}
                </Text>

                </View>
                </View>
                <TouchableOpacity
                onPress={() => sendStatusToServer(item.numorca)}>
                {/* Utilize um ícone de checkbox aqui, ou crie o seu próprio componente de checkbox */}
                <Text style={{marginLeft:5}}>
                <Icon name={'cancel-circle'} size={50} color={theme.colors.grayTheme.gray100} />
                </Text>
              </TouchableOpacity>
            </View>
          )  : (
            <View style={{ flex: 1,marginTop:'50%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" animating={true} color={theme.colors.neutraTheme.black} hidesWhenStopped={true}/>
            </View>)}
        </View>
      ))}
      </View>
     
     ) :( <View style={{ flex: 1,marginTop:'50%', justifyContent: 'center', alignItems: 'center' }}>
     <ActivityIndicator size="large" color={theme.colors.neutraTheme.black} animating={true} hidesWhenStopped={true} />
     <Text type={textTypes.TITLE_BOLD} color={theme.colors.neutraTheme.darkBlack}>Ops Algo Deu Errado. Você está Sem Conexão</Text>
   </View>
   
     )}
      </ScrollView>
  );
};

export default ProjetistasStatus;

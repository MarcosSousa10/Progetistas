/* eslint-disable prettier/prettier */
import React, {  useState } from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { theme } from '../../../shared/themes/theme';
import { ListaType } from '../../../shared/types/ListaType';
import axios from 'axios';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';
import { Icon } from '../../../shared/components/icon/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { useProduct } from '../hooks/setProduct';
import { Image } from 'react-native-elements';
import { ImagelogPrincipal } from '../styles/login.styles';


const Product = () => {
  const [data, setData] = useState<ListaType[]>([]);
  const { datas,handleOnPress } = useProduct();
console.log(datas)
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
        'http://192.168.2.181:8080/TitulosEmAbertosSemAprovacao',
      );
setTimeout(() => {
           setCondicao(true);
        }, 1000);
      setData(responses.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendStatusToServer = async (numorca: string, status: string) => {
    try {
      await axios.get(`http://192.168.2.181:8080/UpdataStatus/${status}/${numorca}`);
      Consultar();
      console.log(`Status para ${numorca} enviado com sucesso!`);
    } catch (error) {
      console.error('Erro ao enviar o status:', error);
    }
  };
 
  return (
    <ScrollView>
<Image source={require('../../../assets/images/2021_logo-luminato_othon-de-carvalho_page-0002-removebg-preview.png')} />
<ImagelogPrincipal
          resizeMode="contain"
          source={require('../../../assets/images/2021_logo-luminato_othon-de-carvalho_page-0002-removebg-preview.png')}
        />
 { data ? (
      <View style={{ margin: 5, borderColor: 'black'   }}>

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
                  borderWidth: 3,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignContent: 'center',
                    borderRightWidth: 1,
                    padding: 10,
                    minWidth:'75%',
                    maxWidth:'85%',
                  }}>

                    <View style={{ alignItems: 'center' }}>
                  <Text type={textTypes.TITLE_SEMI_BOLD} style={{ fontSize: 30 }} color={theme.colors.neutraTheme.darkBlack}>
                    {item.projetista}
                  </Text>
                  </View>
                  <View style={{alignItems: 'flex-start'}}>                 
             <Text style={{ fontSize: 12 }}>
               <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Cliente: </Text>{item.cliente}
             </Text>
             <Text style={{  fontSize: 12 }}>
             <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Orçamento: </Text>{item.numorca}
             </Text>
             <Text style={{  fontSize: 12 }}>
             <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Fisica/Juridico: </Text>{item.tipocliente}
             </Text>
             <View style={{ flexDirection: 'row' }}>
             <Text style={{  fontSize: 12 }}>
             <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Valor:</Text>
             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor))}
             </Text>
             <Text  style={{ marginLeft: 5, fontSize: 12 }}>
             <Text  type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Comissão:</Text>
             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.vlcomissaoproj))}
             </Text>
             
             </View>

             </View>
                         </View>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    onPress={() => {
                      // Envie o item.numorca e 'Aprovado' para o servidor
                      sendStatusToServer(item.numorca, 'AP');
                    }}>
                    <Text style={{ fontSize: 50 , marginLeft:7,marginBottom:'50%'}}><Icon color={theme.colors.neutraTheme.darkBlack} name={'checkmark2'} size={40}  /></Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {

                      // Envie o item.numorca e 'Reprovado' para o servidor
                      sendStatusToServer(item.numorca, 'RP');
                    }}>
                    <Text style={{ fontSize: 50 }} color={theme.colors.neutraTheme.darkBlack}> <Icon color={theme.colors.neutraTheme.darkGray} name={'cross'} size={40}  /></Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1,marginTop:'50%', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" animating={true} color={theme.colors.neutraTheme.black} hidesWhenStopped={true}/>
              </View>
            )}
          </View>
        ))}
      </View>
      ):( <View style={{ flex: 1,marginTop:'50%', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.neutraTheme.black} animating={true} hidesWhenStopped={true} />
      <Text type={textTypes.TITLE_BOLD} color={theme.colors.neutraTheme.darkBlack}>Ops Algo Deu Errado. Você está Sem Conexão</Text>
    </View>
    
      )}
    </ScrollView>
  );
};

export default Product;

/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable prettier/prettier */
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { Icon } from '../../../shared/components/icon/Icon';
import { textTypes } from '../../../shared/components/text/textTypes';
import { useFocusEffect } from '@react-navigation/native';
import { useStatus } from '../hooks/useStatus';
import { TextStatus, TextStatusF, ViewStatus, ViewStatusCenter, ViewStatusCondicao, ViewStatusCondicaoColumn, ViewStatusLoading, ViewStatusrCentro } from '../styles/status.style';

const ProjetistasStatus = () => {

  const { Consultar, condicao, data, sendStatusToServer } = useStatus();
  useFocusEffect(
    React.useCallback(() => {
      // setCondicao(false);
      Consultar();
    }, [])
  );
  return (
    <ScrollView >
      {data ? (
        <ViewStatus>
          {data.map((item, index) => (
            <View key={index}>
              {condicao ? (
                <ViewStatusCondicao key={item.codprod}>

                  <ViewStatusCondicaoColumn>
                    <ViewStatusCenter>
                      <Text type={textTypes.TITLE_SEMI_BOLD} style={{ fontSize: 40 }} color={theme.colors.neutraTheme.darkBlack}>
                        {item.projetista}
                      </Text>
                    </ViewStatusCenter>
                    <ViewStatusrCentro>
                      <TextStatusF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Cliente: </Text>{item.cliente}
                      </TextStatusF>
                      <TextStatusF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Orçamento: </Text>{item.numorca}
                      </TextStatusF>
                      <View style={{ flexDirection: 'row' }}>

                        <TextStatusF>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Fisica ou Juridico: </Text>{item.tipocliente}
                        </TextStatusF>
                        <TextStatus>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Status: </Text>{item.statusprojetista}
                        </TextStatus>
                      </View>
                      <View style={{ flexDirection: 'row' }}>

                        <TextStatusF>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Valor: </Text>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor))}
                        </TextStatusF>
                        <TextStatus>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Comissão: </Text>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.vlcomissaoproj))}
                        </TextStatus>
                      </View>

                      <TextStatusF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Dt  Ap/Comissão: </Text>{item.dtaprovcomissao}
                      </TextStatusF>

                    </ViewStatusrCentro>
                  </ViewStatusCondicaoColumn>
                  <TouchableOpacity
                    onPress={() => sendStatusToServer(item.numorca)}>
                    {/* Utilize um ícone de checkbox aqui, ou crie o seu próprio componente de checkbox */}
                    <Text style={{ marginLeft: 5 }}>
                      <Icon name={'cancel-circle'} size={50} color={theme.colors.grayTheme.gray100} />
                    </Text>
                  </TouchableOpacity>
                </ViewStatusCondicao>
              ) : (
                <ViewStatusLoading>
                  <ActivityIndicator size="large" animating={true} color={theme.colors.neutraTheme.black} hidesWhenStopped={true} />
                </ViewStatusLoading>)}
            </View>
          ))}
        </ViewStatus>

      ) : (<ViewStatusLoading>
        <ActivityIndicator size="large" color={theme.colors.neutraTheme.black} animating={true} hidesWhenStopped={true} />
      </ViewStatusLoading>

      )}
    </ScrollView>
  );
};

export default ProjetistasStatus;

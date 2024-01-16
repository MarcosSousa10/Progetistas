/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable prettier/prettier */
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { Icon } from '../../../shared/components/icon/Icon';
import { textTypes } from '../../../shared/components/text/textTypes';
import { useFocusEffect } from '@react-navigation/native';
import { useEstornar } from '../hooks/useEstronar';
import { TextEstornar, TextEstornarF, ViewEstornar, ViewEstornarCenter, ViewEstornarCondicao, ViewEstornarCondicaoColumn, ViewEstornarLoading, ViewEstornarrCentro } from '../styles/estornar.style';

const Estornar = () => {
  const { condicao, data, Consultar, sendStatusToServer } = useEstornar();
  useFocusEffect(
    React.useCallback(() => {
      Consultar();
    }, [])
  );

  return (
    <ScrollView>
      {data ? (
        <ViewEstornar>
          {data.map((item, index) => (
            <View key={index}>
              {condicao ? (
                <ViewEstornarCondicao
                  key={item.codprod}
                >
                  <ViewEstornarCondicaoColumn>
                    <ViewEstornarCenter>
                      <Text type={textTypes.TITLE_SEMI_BOLD} style={{ fontSize: 40 }} color={theme.colors.neutraTheme.darkBlack}>
                        {item.projetista}
                      </Text>
                    </ViewEstornarCenter>
                    <ViewEstornarrCentro>
                      <TextEstornarF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Cliente: </Text>{item.cliente}
                      </TextEstornarF>
                      <TextEstornarF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Orçamento: </Text>{item.numorca}
                      </TextEstornarF>
                      <View style={{ flexDirection: 'row' }}>
                        <TextEstornarF>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Fisica/Juridico: </Text>{item.tipocliente}
                        </TextEstornarF>
                        <TextEstornar>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Status: </Text>{item.statusprojetista}
                        </TextEstornar>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <TextEstornarF>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Valor: </Text>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor))}

                        </TextEstornarF>
                        <TextEstornar>
                          <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Comissão: </Text>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.vlcomissaoproj))}

                        </TextEstornar>

                      </View>
                      <TextEstornarF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Pg/Comição: </Text>{item.dtpagcomissaoproj}
                      </TextEstornarF>

                      <TextEstornarF>
                        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.neutraTheme.black}>Ap/Comissão: </Text>{item.dtaprovcomissao}
                      </TextEstornarF>

                    </ViewEstornarrCentro>

                  </ViewEstornarCondicaoColumn>
                  <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                      onPress={() => {
                        // Envie o item.numorca e 'Reprovado' para o servidor
                        sendStatusToServer(item.numorca, 'estornar');
                      }}>
                      <Icon name={'coin-dollar'} size={50} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                  </View>
                </ViewEstornarCondicao>
              ) : (
                <ViewEstornarLoading>
                  <ActivityIndicator size="large" animating={true} color={theme.colors.neutraTheme.black} hidesWhenStopped={true} />
                </ViewEstornarLoading>
              )}
            </View>
          ))}
        </ViewEstornar>
      ) : (<ViewEstornarLoading>
        <ActivityIndicator size="large" color={theme.colors.neutraTheme.black} animating={true} hidesWhenStopped={true} />
      </ViewEstornarLoading>

      )}
    </ScrollView>
  );
};

export default Estornar;

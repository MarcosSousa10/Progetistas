/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { MethodEnum } from '../../../enums/methods.enum';
import { useRequest } from '../../../shared/hooks/useRequest';
import { ListaType } from '../../../shared/types/ListaType';
import { StatusProjetista } from '../../../shared/constants/urls';

export const useBaixar = () => {
    const {request} = useRequest();
    const [data, setData] = useState< ListaType[] >();
    const [condicao, setCondicao] = useState<boolean>(false);
  const handleOnPress = async () => {
    const responses: ListaType[] |undefined  = await request<ListaType[]>({
      url: StatusProjetista,
      method: MethodEnum.GET,
    });
    setTimeout(() => {
        setCondicao(true);
     }, 1000);
      setData(responses);
  };
  const sendStatusToServer = async (numorca: string, funcao: string) => {
    try {
      await request<ListaType[]>({
      url: `http://192.168.2.181:8080/updateDataPagamento/${funcao}/${numorca}`,
      method: MethodEnum.GET,
    });
    handleOnPress();
    console.log(`Status para ${numorca} enviado com sucesso!`);
  } catch (error) {
    console.error('Erro ao enviar o status:', error);
  }

  };
 
return {
    data,
    condicao,
    handleOnPress,
    sendStatusToServer,
  };
};

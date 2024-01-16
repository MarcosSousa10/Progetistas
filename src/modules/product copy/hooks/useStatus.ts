/* eslint-disable prettier/prettier */
import { useState} from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { ListaType } from '../../../shared/types/ListaType';
import { MethodEnum } from '../../../enums/methods.enum';
import { StatusProjetistaEstorno } from '../../../shared/constants/urls';
export const useStatus = () => {
    const [data, setData] = useState<ListaType[]>();
    const [condicao, setCondicao] = useState<boolean>(false);
    const {request} = useRequest();
  const Consultar = async () => {
    const result:ListaType[] |undefined =  await request<ListaType[]>({
      url: StatusProjetistaEstorno,
      method: MethodEnum.GET,
    });
    setTimeout(() => {
        setCondicao(true);
     }, 1000);
           setData(result);

  };
  const sendStatusToServer = async (numorca: string) => {
     await request({
      url: `http://192.168.2.181:8080/UpdataStatus/0/${numorca}`,
      method: MethodEnum.GET,
    });
    Consultar();

  };


  return {
    sendStatusToServer,
    data,
    condicao,
    Consultar,
  };
};

/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { MethodEnum } from '../../../enums/methods.enum';
import { StatusStorno } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import { ListaType } from '../../../shared/types/ListaType';

export const useEstornar = () => {
    const { request } = useRequest();
    const [data, setData] = useState<ListaType[]>();
    const [condicao, setCondicao] = useState<boolean>(false);
    const Consultar = async () => {
        try {
            const responses: ListaType[] | undefined = await request<ListaType[]>({
                url: StatusStorno,
                method: MethodEnum.GET,
            });
            setTimeout(() => {
                setCondicao(true);
            }, 1000);
            setData(responses);
        } catch (error) {
            console.error('Erro ao enviar o status:', error);
        }
    };
    const sendStatusToServer = async (numorcamento: string, funcao: string) => {
        try {
             await request<ListaType[]>({
                url: `http://192.168.2.181:8080/updateDataPagamento/${funcao}/${numorcamento}`,
                method: MethodEnum.GET,
            });
            Consultar();
        } catch (error) {
            console.error('Erro ao enviar o status:', error);
        }
      };
    return {
        sendStatusToServer,
        Consultar,
        data,
        condicao,
    };
};

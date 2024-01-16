/* eslint-disable prettier/prettier */
import { useState} from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { ListaType } from '../../../shared/types/ListaType';
import { MethodEnum } from '../../../enums/methods.enum';
export const useProduct = () => {
    const [datas, setData] = useState<ListaType[]>();
    const [refreshing1, setRefreshing1] = useState(false);

    const {request} = useRequest();
  const handleOnPress = async () => {
    setRefreshing1(true);
    const result:ListaType[] |undefined =  await request<ListaType[]>({
      url: 'http://192.168.2.181:8080/TitulosEmAbertosSemAprovacao',
      method: MethodEnum.GET,
    });
    setData(result);
    setRefreshing1(false);

  };
  const update = async (numorca: string, status: string) => {
    setRefreshing1(true);
     await request({
      url: `http://192.168.2.181:8080/UpdataStatus/${status}/${numorca}`,
      method: MethodEnum.GET,
    });
    handleOnPress();
    setRefreshing1(false);

  };
  const onRefresh = () => {
    handleOnPress();
  };

  return {
    onRefresh,
    update,
    datas,
    refreshing1,
    handleOnPress,
  };
};

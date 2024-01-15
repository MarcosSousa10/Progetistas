/* eslint-disable prettier/prettier */
import { useState} from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../story';
import { ListaType } from '../../../shared/types/ListaType';
import { TitulosEmAbertosSemAprovacao } from '../../../shared/constants/urls';
import { MethodEnum } from '../../../enums/methods.enum';
export const useProduct = () => {
    const {user} = useSelector((state: RootState)=> state.userReducer);
    const [datas, setData] = useState<ListaType>();
    const [condicao, setCondicao] = useState<boolean>(false);
    const {request} = useRequest();
console.log('user: ', user);
  const handleOnPress = async () => {
    await request<ListaType>({
      url: TitulosEmAbertosSemAprovacao,
      method: MethodEnum.GET,
    }).then((Response)=>{setData(Response);}).catch(Response=>{console.log(Response+"http://192.168.2.181:8080/TitulosEmAbertosSemAprovacao")});
  };

  return {
    datas,
    handleOnPress,
  };
};

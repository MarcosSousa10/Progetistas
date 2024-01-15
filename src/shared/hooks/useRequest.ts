/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {RequestLogin} from '../types/requestLogin';
import ConnectionAPI, { connectionAPIPost,MetgoType } from '../functions/connection/connectionAPI';
import { ReturnLogin } from '../types/returnLogin';
import { useGlobalRducer } from '../../story/reducers/globalReducer/useGlobalReducer';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuUrl } from '../enums/MenuUrl.wnum';
import { setAuthorizationToken } from '../functions/connection/auth';
interface requestProps<T, B = unknown> {
  url: string;
  method: MetgoType;
  saveGlobal?: (object: T ) => void;
  body?: B;
  message?: string;
}

export const useRequest = () => {
  const {reset} = useNavigation<NavigationProp<ParamListBase>>();
  // const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {setModal} = useGlobalRducer();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
const request = async <T, B = unknown>({ url, method, saveGlobal, body, message }: requestProps<T, B>): Promise<T | undefined> =>{
  setLoading(true);
  const returnObject: T| undefined = await ConnectionAPI.connect<T, B>(url, method, body).then(
    (result)=>{
      console.log(result+"dasdsasdsad")
      if (saveGlobal){
        saveGlobal(result);
      }
      if (message){
        setModal({
          visible:true,
          title:'Sucesso',
          text: message,
        });
      }
      return result;
    }
  ).catch((error: Error)=>{
    setModal({
      visible:true,
      title:'Error',
      text: error.message,
    });
    return undefined;
  });
  setLoading(false);
return returnObject;
};
  const authRequest = async (body: RequestLogin) => {
    setLoading(true);
    await connectionAPIPost<ReturnLogin>('http://192.168.2.181:8080/login', body).then((result)=>{
        setAuthorizationToken(result.token);
        reset({
          index: 0,
          routes: [{name: MenuUrl.HOME}],
        });
      //  navigation.navigate('Home');
    }).catch(() => {
        setModal({visible:true,title:'Erro',text:'Usuario ou senha invalidos'});
    });
    setLoading(false);
  };
  return {
    loading,
    errorMessage,
    authRequest,
    setErrorMessage,
    request,
  };
};

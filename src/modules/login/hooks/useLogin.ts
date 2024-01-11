/* eslint-disable prettier/prettier */
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useState} from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../story';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../../../shared/enums/MenuUrl.wnum';
export const useLogin = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const {user} = useSelector((state: RootState)=> state.userReducer);
  const [login, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
const {authRequest,errorMessage, loading,  setErrorMessage } = useRequest();
console.log('user: ', user);
  const handleOnPress = async () => {

 authRequest({
    login,
    password,
 });
  };
  const handleGoToCreateUser = ()=>{
    navigation.navigate(MenuUrl.CREATE_USER);
  };
  const handleOnChangeEmail = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setErrorMessage('');
    setEmail(event.nativeEvent.text);
  };
  const handleOnChangePassword = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(event.nativeEvent.text);
  };
  return {
    login,
    password,
    loading,
    errorMessage,
    handleOnPress,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleGoToCreateUser,
  };
};

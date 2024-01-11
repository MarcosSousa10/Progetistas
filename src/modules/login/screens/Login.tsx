/* eslint-disable react-hooks/exhaustive-deps *//* eslint-disable prettier/prettier *//* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, View} from 'react-native';
import {ContainerLogin, Imagelog} from '../styles/login.styles';
import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/input';
import {theme} from '../../../shared/themes/theme';
import {useLogin} from '../hooks/useLogin';
import { useEffect } from 'react';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { URL_USER } from '../../../shared/constants/urls';
import { UserType } from '../../../shared/types/userType';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuUrl } from '../../../shared/enums/MenuUrl.wnum';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';
import React from 'react';

const Login = () => {
   const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {
    login,
    password,
    loading,
    errorMessage,
    handleOnPress,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleGoToCreateUser,
  } = useLogin();
 useEffect(() => {
  const text = async () =>{
    const result = await connectionAPIGet<UserType>(URL_USER).catch(()=> undefined);
    console.log(result);
    if (result){
      navigation.navigate(MenuUrl.HOME);
    }
  };
  text();
 }, []);

  return (
    <View>
      <ContainerLogin>
        <Imagelog
          resizeMode="contain"
          source={require('../../../assets/images/download.png')}
        />
        <Input
          value={login}
          errorMessage={errorMessage}
          margin="0px 0px 8px 0px"
          title="Email:"
          placeholder="Digite seu email"
          onChange={handleOnChangeEmail}
        />
        <Input
          errorMessage={errorMessage}
          value={password}
          secureTextEntry
          title="Senha:"
          onChange={handleOnChangePassword}
          placeholder="Digite sua senha"

        />
        <TouchableOpacity onPress={handleGoToCreateUser}>
            <Text
            customMargin="16px"
            type={textTypes.PARAGRAPH_SEMI_BOLD}
            color={theme.colors.mainTheme.primary}
            >
              Cadastrar
            </Text>
        </TouchableOpacity>
        <Button
          loading={loading}
          type={theme.buttons.buttonsTheme.primary}
          title="ENTRAR"
          onPress={handleOnPress}
        />
      </ContainerLogin>
    </View>
  );
};
export default Login;

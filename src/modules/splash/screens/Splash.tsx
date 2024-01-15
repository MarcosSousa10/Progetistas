/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { ContainerSplash, ImagelogSplash } from '../styles/splash.style';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../../../shared/enums/MenuUrl.wnum';
import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import React from 'react';
import axios from 'axios';
const Splash = () => {
    const {reset} = useNavigation<NavigationProp<ParamListBase>>();
    useEffect(() => {

      const verifyLogin = async () =>{
        var validacao = false;
        const token = await getAuthorizationToken();
            try {
             await axios.get(
                'http://192.168.2.181:8080/TitulosEmAbertosSemAprovacao', {
                    headers: { 'Authorization': `Bearer ${token}` },
                }
              ).then(()=>{ validacao = true}).catch(()=>validacao = false);
            } catch (error) {
              console.log(error);
            }
        if (token && validacao){
            reset({
                index:0,
                routes:[{ name: MenuUrl.HOME}],
            });
        } else {
            reset({
                index:0,
                routes:[{ name: MenuUrl.LOGIN}],
            });
        }
      };
      verifyLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ContainerSplash >
            <ImagelogSplash
                resizeMode="contain"
                source={require('../../../assets/images/download.png')}
            />
        </ContainerSplash>);
};
export default Splash;

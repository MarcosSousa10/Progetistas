/* eslint-disable prettier/prettier */
import { ScrollView } from 'react-native';
import React from 'react';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { MenuUrl } from '../../../shared/enums/MenuUrl.wnum';
import { logout } from '../../../shared/functions/connection/auth';


const Menu = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <ScrollView >

          <Button
        loading={false}
        onPress={()=> navigation.navigate(MenuUrl.ESTORNAR)}
        type={theme.buttons.buttonsTheme.secondary}
        title="Estornar Baixa"
        style={{marginTop:10 }}
     
      />
        <Button
        loading={false}
        onPress={()=> navigation.navigate(MenuUrl.PROJETISTASSTATUS)}
        type={theme.buttons.buttonsTheme.secondary}
        title="Validar Status"
        style={{marginTop:10 }}
      />
      <Button title="SAIR" style={{marginTop:'100%' }} onPress={()=>{logout(navigation);}}/>
      </ScrollView>
  );
};

export default Menu;

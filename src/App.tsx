import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import Login from './modules/login';
import {MenuUrl} from './shared/enums/MenuUrl.wnum';
import story from './story';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from './shared/components/icon/Icon';
import {theme} from './shared/themes/theme';
import Product from './modules/product';
import Splash from './modules/splash';
import Estornar from './modules/estornar/screens/Estornar';
import Baixar from './modules/baixar';
import Menu from './modules/menu';
import ProjetistasStatus from './modules/product copy';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const renderTabBarIcon = (
    color: string,
    route: RouteProp<ParamListBase, string>,
  ) => {
    let iconName: string;
    switch (route.name) {
      case MenuUrl.HOME:
        iconName = 'home';
        break;
      case MenuUrl.BAIXAR:
        iconName = 'credit-card';
        break;
      case MenuUrl.MENU:
        iconName = 'menu';
        break;
      case MenuUrl.PROJETISTASSTATUS:
        iconName = 'clipboard';
        break;
      case MenuUrl.PROFILE:
      default:
        iconName = 'list';
        break;
    }
    return <Icon name={iconName} size={16} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.neutraTheme.darkBlack,
        tabBarInactiveTintColor: theme.colors.neutraTheme.gray,
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 52,
          padding: 8,
        },
      })}>
      <Tab.Screen
        name={MenuUrl.PRODUCT}
        component={Product}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name={MenuUrl.PROJETISTASSTATUS}
        component={ProjetistasStatus}
        options={{title: 'Validar Status', headerShown: false}}
      /> */}
      <Tab.Screen
        name={MenuUrl.BAIXAR}
        component={Baixar}
        options={{title: 'Baixar', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.MENU}
        component={Menu}
        options={{title: 'Menu ', headerShown: false}}
      />
      {/* <Tab.Screen
        name={MenuUrl.PROFILE}
        component={Profile}
        options={{title: 'Perfil', headerShown: false}}
      /> */}
    </Tab.Navigator>
  );
};
function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={story}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={MenuUrl.SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={MenuUrl.LOGIN}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={MenuUrl.HOME}
            component={TabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={MenuUrl.ESTORNAR}
            component={Estornar}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name={MenuUrl.PROJETISTASSTATUS}
            component={ProjetistasStatus}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

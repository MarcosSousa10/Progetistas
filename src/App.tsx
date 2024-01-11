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
import Home from './modules/home';
import {theme} from './shared/themes/theme';
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
      case MenuUrl.ORDER:
        iconName = 'books';
        break;
      case MenuUrl.CART:
        iconName = 'cart';
        break;
      case MenuUrl.SEARCH_PRODUCT:
        iconName = 'search';
        break;
      case MenuUrl.PROFILE:
      default:
        iconName = 'profile';
        break;
    }
    return <Icon name={iconName} size={16} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.mainTheme.primary,
        tabBarInactiveTintColor: theme.colors.grayTheme.gray80,
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 52,
          padding: 8,
        },
      })}>
      <Tab.Screen
        name={MenuUrl.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name={MenuUrl.SEARCH_PRODUCT}
        component={SearchProduct}
        options={{title: 'Buscar', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.CART}
        component={Cart}
        options={{title: 'Carrinho ', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.ORDER}
        component={Orders}
        options={{title: 'Pedidos', headerShown: false}}
      />
      <Tab.Screen
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
            name={MenuUrl.LOGIN}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={MenuUrl.HOME}
            component={TabNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

import React, { View } from 'react';
import _ from 'lodash';
import { createStackNavigator } from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { NavBar } from '../../components/index';
import transition from './transitions';
import {
  MainRoutes,
  MenuRoutes,
} from './routes';

const main = {};
const flatRoutes = {};

const routeMapping = (route) => ({
  screen: withRkTheme(route.screen),
  title: route.title,
});

(MenuRoutes).forEach(route => {
  flatRoutes[route.id] = routeMapping(route);
  main[route.id] = routeMapping(route);
  route.children.forEach(nestedRoute => {
    flatRoutes[nestedRoute.id] = routeMapping(nestedRoute);
  });
});

const renderHeader = (navigation, props) => {
  const ThemedNavigationBar = withRkTheme(NavBar);
  return (
    <ThemedNavigationBar navigation={navigation} headerProps={props} />
  );
};

const DrawerRoutes = Object.keys(main).reduce((routes, name) => {
  const rawRoutes = routes;
  rawRoutes[name] = {
    name,
    screen: createStackNavigator(flatRoutes, {
      mode: 'modal',
      initialRouteName: name,
      headerMode: 'screen',
      cardStyle: { backgroundColor: 'transparent' },
      transitionConfig: transition,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: true,
        header: (props) => renderHeader(navigation, props),
      }),
    }),
  };
  return (rawRoutes);
}, {});

export const AppRoutes = DrawerRoutes;
// export const LoginRoutes = _.find(MainRoutes, { id: 'LoginMenu' }).children;
// export const NavigationRoutes = _.find(MainRoutes, { id: 'NavigationMenu' }).children;
// export const SocialRoutes = _.find(MainRoutes, { id: 'SocialMenu' }).children;
export const Articles4 = _.find(MainRoutes, { id: 'Articles4' });
export const Blogposts = _.find(MainRoutes, { id: 'Blogposts' });
export const ChatList = _.find(MainRoutes, { id: 'ChatList' });
export const ProfileSettings = _.find(MainRoutes, { id: 'ProfileSettings' });
// export const MessagingRoutes = _.find(MainRoutes, { id: 'MessagingMenu' }).children;
// export const DashboardRoutes = _.find(MainRoutes, { id: 'DashboardsMenu' }).children;
// export const WalkthroughRoutes = _.find(MainRoutes, { id: 'WalkthroughMenu' });
// export const EcommerceRoutes = _.find(MainRoutes, { id: 'EcommerceMenu' }).children;
// export const OtherRoutes = _.find(MainRoutes, { id: 'OtherMenu' }).children;

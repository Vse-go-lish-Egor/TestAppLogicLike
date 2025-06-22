import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CourseListScreen from '../screens/CourseListScreen';
import TopicsListScreen from '../screens/TopicsListScreen';

export type RootStackParamList = {
  CourseListScreen: undefined;
  TopicsListScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CourseListScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
        <Stack.Screen name="TopicsListScreen" component={TopicsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

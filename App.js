import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import Search from './Components/Search';
import FilmDetail from './Components/FilmDetail';

const Stack = createNativeStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="FilmDetail" component={FilmDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
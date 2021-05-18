import React from 'react';
import RedirectScreen from './screens/RedirectScreen'
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen'
import ViewingScreen from './screens/ViewingScreen';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

export default function App (){
  return (
    <AppContainer/>
  );
}

const SwitchNavigator = createSwitchNavigator({
  HomeScreen:{screen: HomeScreen},
  ViewingScreen:{screen: ViewingScreen},
  ScheduleScreen:{screen:ScheduleScreen},
  RedirectScreen:{screen:RedirectScreen}
});



const AppContainer =  createAppContainer(SwitchNavigator);
import * as React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Asociaciones from "./Asociaciones";
import Asociacion from "./Asociacion";


const Tab3 = createMaterialTopTabNavigator ();

export default function AppNavigatorAsociacion() {
  return (
    <Tab3.Navigator
    screenOptions={{       
      
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#ccd4e3",
      tabBarIndicatorStyle: {
        backgroundColor: "#ffffff"
      },
      tabBarLabelStyle: {
        fontSize: 10, 
      },
      tabBarStyle: { 
        backgroundColor: "#293A59"
      },
      
    }}
    
    >
      <Tab3.Screen name="Asociación" component={Asociacion} />      
      <Tab3.Screen name="Asociaciones" component={Asociaciones} />
    </Tab3.Navigator>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native";

import HomeStack from './stacks/HomeStack'

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Menu" component={HomeStack} options={{ headerShown: false, tabBarStyle:{display:'none'} }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Tabs
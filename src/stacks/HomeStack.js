import Home1 from '../screens/Home1'
import Home2 from '../screens/Home2'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

const HomeStack = () => {
  const HomeStacks = createNativeStackNavigator();
  return (
    <HomeStacks.Navigator>
      <HomeStacks.Screen name="Home1" component={Home1} options={{ headerShown: false }} />
      <HomeStacks.Screen name="Home2" component={Home2} options={{ headerShown: false }} />
    </ HomeStacks.Navigator>
  )
}

export default HomeStack
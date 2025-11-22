import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './modules/home/HomeScreen';
import HowToStartScreen from './modules/how-to-start/HowToStartScreen';
import CustomerTypeScreen from './modules/customer-type/CustomerTypeScreen';
import CartScreen from './modules/cart/CartScreen';
import TapCardScreen from './modules/tap-card/TapCardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HowToStart" component={HowToStartScreen} />
        <Stack.Screen name="CustomerType" component={CustomerTypeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="TapCard" component={TapCardScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './modules/home/HomeScreen';
import HowToStartScreen from './modules/how-to-start/HowToStartScreen';
import CustomerTypeScreen from './modules/customer-type/CustomerTypeScreen';
import CartScreen from './modules/cart/CartScreen';
import TapCardScreen from './modules/tap-card/TapCardScreen';
import CheckoutScreen from './modules/checkout/CheckoutScreen';
import ProgressScreen from './modules/progress/ProgressScreen';
import SelectVehicleScreen from './modules/select-vehicle/SelectVehicleScreen';
import SelectSoapScreen from './modules/select-soap/SelectSoapScreen';
import CongratsScreen from './modules/congrats/CongratsScreen';
import BalanceScreen from './modules/balance/BalanceScreen';
import ThankYouScreen from './modules/thank_you/ThankYouScreen';
import { SelectionProvider } from './modules/select-base/SelectionContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SelectionProvider>
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
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="Congrats" component={CongratsScreen} />
          <Stack.Screen name="Balance" component={BalanceScreen} />
          <Stack.Screen name="SelectVehicle" component={SelectVehicleScreen} />
          <Stack.Screen name="SelectSoap" component={SelectSoapScreen} />
          <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SelectionProvider>
  );
}

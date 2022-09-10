import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Mypage from "../screens/Mypage";

const Stack = createNativeStackNavigator();

export default function Navigation({ isLogin }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Mypage" component={Mypage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

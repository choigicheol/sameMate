import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Mypage from "../screens/Mypage";
import { useSelector } from "react-redux";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isLogin = useSelector((state) => state.user.isLogin);

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
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

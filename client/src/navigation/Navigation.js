import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Mypage from "../screens/Mypage";
import Signup from "../screens/Signup";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: "black",
          height: 50,
          paddingTop: 5,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="home" size={24} color="white" />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="md-search" size={24} color="white" />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="white" />,
        }}
        name="Mypage"
        component={Mypage}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Root"
          component={MyTabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Signup"
          component={Signup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

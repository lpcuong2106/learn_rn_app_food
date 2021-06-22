import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Platform } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator, {
  FavoriteNavigator,
  FilterNav,
} from "./src/navigation/MealsNavigator";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CategoriesMealsScreen from "./src/screens/CategorMealsSCreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Colors from "./src/constants/Colors";
import { enableScreens } from "react-native-screens";
import TabNavigator from "./src/navigation/TabNavigation";
import FavoriesScreen from "./src/screens/FavoriesScreen";
import { Ionicons } from "@expo/vector-icons";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import FilterScreen from "./src/screens/FilterScreen";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Home = () => {
  return (
    <MealsNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
        },
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerTintColor:
          Platform.OS === "android" ? "white" : Colors.primaryColor,
        headerTitle: "A screen",
      }}
    >
      <MealsNavigator.Screen
        name="Category"
        component={CategoriesScreen}
        options={CategoriesScreen.navigationOption}
      />
      <MealsNavigator.Screen
        name="CategoryMeals"
        component={CategoriesMealsScreen}
        options={CategoriesMealsScreen.navigationOptions}
      />
      <MealsNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={MealDetailScreen.navigationOptions}
      />
    </MealsNavigator.Navigator>
  );
};

const Favorite = () => {
  return (
    <FavoriteNavigator.Navigator>
      <FavoriteNavigator.Screen name="FavoriteScreen" component={FavoriesScreen} options={FavoriesScreen.navigationOptions}/>
    </FavoriteNavigator.Navigator>
  );
};

const FilterNavMenu = () => {
  return (
    <FilterNav.Navigator>
      <FilterNav.Screen
        name="FilterMenu"
        component={FilterScreen}
        options={FilterScreen.navigationOptions}
      />
    </FilterNav.Navigator>
  );
};

const Main = () => {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
      }}
    >
      <TabNavigator.Screen
        name="Category"
        component={Home}
        options={{
          tabBarLabel: "Category Tab",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-restaurant" size={size} color={color} />;
          },
        }}
      />
      <TabNavigator.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: "Favorite Tab",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-star" size={size} color={color} />;
          },
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState();
  useEffect(() => {
    (async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        let tokenG = (await Notifications.getExpoPushTokenAsync()).data;

        setToken(tokenG);
        console.log(tokenG);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    })();
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((res) => {
        console.log(res);
      });
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    return () => {
      backgroundSubscription.remove();
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(false)}
        onError={(e) => console.log(e)}
      />
    );
  }
  // if (!permission || permission.status !== 'granted') {
  //   return (
  //     <View>
  //       <Text>Permission is not granted</Text>
  //       <Button title="Grant permission" onPress={askForPermission} />
  //     </View>
  //   );
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator.Navigator
          drawerContentOptions={{
            activeTintColor: Colors.accentColor,
          }}
        >
          <DrawerNavigator.Screen name="Meals" component={Main} />
          <DrawerNavigator.Screen
            name="Filters"
            component={FilterNavMenu}
            options={{
              drawerLabel: "Filter !!!",
              activeTintColor: Colors.accentColor,
            }}
          />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

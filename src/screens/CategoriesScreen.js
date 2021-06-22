import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { FlatList } from "react-native-gesture-handler";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import IoniconsHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export default function CategoriesScreen({ navigation }) {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id,
          });
        }}
      />
    );
  };
  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "My first local notifications",
    //     body: "This is the first sending",
    //     color: 'red',
    //     sound: true,
    //     data: {
    //       mySpecial: 'haha special data'
    //     }
    //   },
    //   trigger: {
    //     seconds: 10
    //   }
    // })
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[2TzHhZNvhy-KnNHncwMlO7]",
        title: "send via app",
        body: "this is push notification was sent by app",
        data: { hi: "hihihihi123" },
      }),
    });
  };
  return (
    <>
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
      style={{margin: 5}}
      columnWrapperStyle={{justifyContent: 'space-between'}}
    />
     <View style={styles.screen}>
         <Text>The category screen</Text>

         <View style={styles.container}>
              <Button title="trigger notify" onPress={triggerNotificationHandler}/>

              <StatusBar style="auto" />
          </View>
     </View>
     </>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
CategoriesScreen.navigationOption = ({navigation, route}) => {
  return {
      headerLeft: ({tintColor}) => {
        return(
      
          <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
              <Item title="menu" iconName="ios-menu" color={tintColor} onPress={() => {
                  navigation.openDrawer();
              }}/>
          </HeaderButtons>
      )}
  }
}
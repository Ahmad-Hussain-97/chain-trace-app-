import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Details Screens</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />

      <Button title="Home" onPress={() => navigation.navigate("Home")} />

      <Button title="Back" onPress={() => navigation.goBack()} />

      <Button title="Home Screen" onPress={() => navigation.popToTop()} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

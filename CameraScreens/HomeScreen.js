import React from "react";
// import react from react
import { StyleSheet, Text, View, Button, Image } from "react-native";
// importing styling and operational components such as buttons, text, view
// from react-native framework

export default class Home extends React.Component {
  static navigate = {
    title: "PhotoClicker"
  };

  render() {
    let picture = this.props.navigation.getParam("picture", "empty");

    return (
      // styling of picture
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.imageHolder}
          source={picture === "empty" ? require("../assets/email.png") : picture}
        />
        <Button
          title="Click Picture"
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Camera");
          }}
        />
      </View>
    );
  }
}

// styling the camera screen front
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  imageHolder: {
    alignSelf: "center",
    height: 500,
    margin: 20
  },
  button: {
    margin: 20
  }
});

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button_Menu = (props) => {
  return (
    <TouchableOpacity style = { styles.button } onPress = { props.customClick }>
        <Text style = { styles.text }>MENU</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CBC55",
    width: 70,
    height: 70,
    borderRadius: 100,
    position: "absolute",
    right: 85,
    top: 5
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  }
})

export default Button_Menu;

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button_Backward = (props) => {
  return (
    <TouchableOpacity style = { styles.button } onPress = { props.customClick }>
      <Text style = { styles.text }>BACKWARD</Text>
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
    right: 5,
    top: 5
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  }
})

export default Button_Backward;

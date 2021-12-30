import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button_Cycle = (props) => {
  return(
    <TouchableOpacity style = { styles.button } onPress = { props.customClick }>
        <Text style = { styles.text }>{ props.title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEDE00",
    width: 70,
    height: 70,
    borderRadius: 100,
    marginTop: 10
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  }
})

export default Button_Cycle;

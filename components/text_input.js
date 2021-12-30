import React from "react";
import { View, TextInput } from "react-native";

const Text_Input = (props) => {
  return(
    <View style = {{ backgroundColor: "#FFFFFF", borderRadius: 8, width: 300 }}>
      <TextInput
        underlineColorAndroid = "transparent"
        placeholder = { props.placeholder }
        fontSize = { 12 }
        placeholderTextColor = "#000000"
        onChangeText = { props.onChangeText }
        value = { props.value }
        secureTextEntry = { props.secureTextEntry } 
      />
    </View>
  )
}

export default Text_Input;

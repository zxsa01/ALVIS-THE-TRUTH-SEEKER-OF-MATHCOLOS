import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props) => {
    return (
        <TouchableOpacity style = { styles.button } onPress = { props.customClick }>
            <Text style = { styles.text }>{ props.title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    button: {
        alignItems: "center",
        backgroundColor: "#FEDE00",
        padding: 5,
        marginTop: 15,
        width: 300,
        borderRadius: 8
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    }
})

export default Button;
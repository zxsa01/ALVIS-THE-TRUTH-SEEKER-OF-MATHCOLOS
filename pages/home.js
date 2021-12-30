import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, BackHandler, Alert } from "react-native";

import Button from "../components/button";

export default class Home extends Component {

    Alert_New_Game = () => {
        Alert.alert("New Game", "Are you sure to the new game.", [
            { text: "CANCEL" },
            { text: "OK", onPress: () => this.props.navigation.navigate("Create_Player") }
        ])
    }

    render () {
        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <View style = { styles.container }>
                    <Text style = { styles.text }>ALVIS, THE TRUTH SEEKER OF MATHCOLOS</Text>
                    <Button
                        title = "NEW GAME"
                        customClick = { this.Alert_New_Game }
                    />
                    <Button
                        title = "CONTINUE"
                        customClick = { () => this.props.navigation.navigate("Login") }
                    />
                    <Button
                        title = "DELETE"
                        customClick = { () => this.props.navigation.navigate("Delete_Player") }
                    />
                    <Button
                        title = "EXIT"
                        customClick = { () => BackHandler.exitApp() }
                    />
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create ({
    imagebackground: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        alignItems: "center"
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
})
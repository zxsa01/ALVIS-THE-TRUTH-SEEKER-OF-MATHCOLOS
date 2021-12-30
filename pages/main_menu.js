import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";

import Button from "../components/button";

export default class Main_Menu extends Component {

    render () {

        const { id_player } = this.props.route.params;
    
        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <View style = { styles.container }>
                    <Text style = { styles.text }>MENU</Text>
                    <Button
                        title = "PLAY GAME"
                        customClick = { () => this.props.navigation.navigate("Education_Level", { id_player: id_player }) }
                    />
                    <Button
                        title = "DETAIL"
                        customClick = { () => this.props.navigation.navigate("Detail", { id_player: id_player }) }
                    />
                    <Button
                        title = "SETTING"
                        customClick = { () => this.props.navigation.navigate("Setting", { id_player: id_player }) }
                    />
                    <Button
                        title = "LOGOUT"
                        customClick = { () => this.props.navigation.navigate("Home") }
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
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
})
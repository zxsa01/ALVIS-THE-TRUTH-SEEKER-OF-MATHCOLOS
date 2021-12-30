import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";

import Button_Backward from "../components/button_backward";
import Button_Menu from "../components/button_menu";

export default class Information_Detail extends Component {

    render () {

        const { name_detail, information_detail, id_player } = this.props.route.params;

        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <Button_Backward
                    customClick = { () => this.props.navigation.goBack({ id_player: id_player }) }
                />
                <Button_Menu
                    customClick = { () => this.props.navigation.navigate("Main_Menu", { id_player: id_player }) }
                />
                <View style = { styles.container }>
                    <Text style = { styles.text }>{ name_detail }</Text>
                    <Text style = { styles.textdetail }>{ information_detail }</Text>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    textdetail: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        flex: 0.4,
        backgroundColor: "#FEDE00",
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: "#FF8300",
        padding: 20,
        margin: 10
    }
})
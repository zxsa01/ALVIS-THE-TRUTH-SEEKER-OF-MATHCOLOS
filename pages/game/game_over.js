import React, {Component} from "react";
import {View, ImageBackground, StyleSheet, Text} from "react-native";
import Button_Cycle from "../../components/button_cycle";

export default class Game_Over extends Component {
    render () {

        const { id_subject, name_subject, id_player, id_education_level } = this.props.route.params;

        return(
            <ImageBackground source = { require("../../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <View style = { styles.container }>
                    <Text style = { styles.text }>GAME OVER</Text>
                    <Button_Cycle
                        title = "MAIN MENU"
                        customClick = { () => this.props.navigation.navigate("Main_Menu", { id_player: id_player }) }
                    />
                    <Button_Cycle
                        title = "LEVEL"
                        customClick = { () => this.props.navigation.navigate("Level", { id_player: id_player, id_subject: id_subject, id_education_level: id_education_level, name_subject: name_subject }) }
                    />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imagebackground: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
})
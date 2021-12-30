import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, Alert, Switch } from "react-native";

import Button from "../components/button";
import Button_Backward from "../components/button_backward";
import Text_Input from "../components/text_input";

export default class Delete_Player extends Component {

    constructor (props) {
        super(props);
        this.state = { username_input: "", password_input: "", id_player: 0, show_password: true };
    }

    Search_Record_Player = () => {

        var search_username = this.state.username_input;
        var search_password = this.state.password_input;

        if (search_username.length == 0 || search_password.length == 0) {
            Alert.alert("Delete Player Account Unsuccessfully", "Required field is missing.");
        } else {
            var SearchAPIURL = "http://10.0.2.2:80/api_game/player/search_username_password.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data = {
                search_username: search_username,
                search_password: search_password
            };

            fetch(
                SearchAPIURL,{
                  method: 'POST',
                  headers: header,
                  body: JSON.stringify(Data)
                }
            )
            .then((reponse) => reponse.json())
            .then((reponse) => {
                this.setState({ id_player: reponse[0].id_player });
                if ( this.state.id_player != 0) {
                    Alert.alert("Delete Player Account", "Are you sure to delete player account.", [
                        { text: "CANCEL" },
                        { text: "OK", onPress: () => this.Delete_Record_Score() }
                    ])
                } else {
                    Alert.alert("Delete Player Account Unsuccessfully", "Invalid username or password.");
                }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Delete_Record_Score = () => {

        var delete_id_player = this.state.id_player;

        var DeleteAPIURL = "http://10.0.2.2:80/api_game/score/delete_id_player.php";
  
        var header = {
            'Accept':'application/json',
            'Content-Type':'application/json'
        };

        var Data = {
            delete_id_player: delete_id_player
        };
  
        fetch(
            DeleteAPIURL, {
              method: 'POST',
              headers: header,
              body: JSON.stringify(Data)
            }
        )
        .then((reponse) => reponse.json())
        .then((reponse) => {
            if (reponse[0].Message == "Delete score of player account successfully.") {
                this.Delete_Record_Setting();
            } else {
                Alert.alert("Delete Player Account Unsuccessfully", reponse[0].Message);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }

    Delete_Record_Setting = () => {

        var delete_id_player = this.state.id_player;

        var DeleteAPIURL = "http://10.0.2.2:80/api_game/setting/delete_id_player.php";
  
        var header = {
            'Accept':'application/json',
            'Content-Type':'application/json'
        };

        var Data = {
            delete_id_player: delete_id_player
        };
  
        fetch(
            DeleteAPIURL, {
              method: 'POST',
              headers: header,
              body: JSON.stringify(Data)
            }
        )
        .then((reponse) => reponse.json())
        .then((reponse) => {
            if (reponse[0].Message == "Delete setting of player account successfully.") {
                this.Delete_Record_Player();
            } else {
                Alert.alert("Delete Player Account Unsuccessfully", reponse[0].Message);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }

    Delete_Record_Player = () => {

        var delete_id_player = this.state.id_player;

        var DeleteAPIURL = "http://10.0.2.2:80/api_game/player/delete_id_player.php";
  
        var header = {
            'Accept':'application/json',
            'Content-Type':'application/json'
        };

        var Data = {
            delete_id_player: delete_id_player
        };
  
        fetch(
            DeleteAPIURL, {
              method: 'POST',
              headers: header,
              body: JSON.stringify(Data)
            }
        )
        .then((reponse) => reponse.json())
        .then((reponse) => {
            if (reponse[0].Message == "Delete player account successfully.") {
                Alert.alert("Delete Player Account", reponse[0].Message, [
                    { text: "OK", onPress: () => this.props.navigation.navigate("Home") }
                ]);
            } else {
                Alert.alert("Delete Player Account Unsuccessfully", reponse[0].Message);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }

    render () {
        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <Button_Backward
                    customClick = { () => this.props.navigation.goBack() }
                />
                <View style = { styles.container }>
                    <Text style = { styles.text }>DELETE PLAYER ACCOUNT</Text>
                    <Text style = { styles.textshow }>USERNAME</Text>
                    <Text_Input
                        placeholder = " Enter Username"
                        onChangeText = { username_input => this.setState({ username_input }) }
                    />
                    <Text style = { styles.textshow }>PASSWORD</Text>
                    <Text_Input
                        placeholder = " Enter Password"
                        secureTextEntry = { this.state.show_password }
                        onChangeText = { password_input => this.setState({ password_input }) }
                    />
                    <View style = {{ flexDirection: 'row' }}>
                        <Text style = { styles.textshow }>SHOW PASSWORD</Text>
                        <Switch
                            onValueChange = { () => this.setState({ show_password: !this.state.show_password }) }
                            value = { !this.state.show_password }
                        />
                    </View>
                    <Button
                        title = "DELETE"
                        customClick = { this.Search_Record_Player }
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
    },
    textshow: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        padding: 14
    }
})
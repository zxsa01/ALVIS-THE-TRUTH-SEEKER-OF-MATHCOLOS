import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, Alert, ScrollView, Switch } from "react-native";

import Button from "../components/button";
import Text_Input from "../components/text_input";

export default class Create_Player extends Component {

    constructor (props) {
        super(props);
        this.state = { username_input: "", password_input: "", confirm_password_input: "", name_player_input: "", id_player: 0, show_password: true, show_confirm_password: true };
    }

    Insert_Record_Player = () => {
        
        var username = this.state.username_input;
        var password = this.state.password_input;
        var name_player = this.state.name_player_input;

        if (this.state.password_input == this.state.confirm_password_input) {
            if (username.length == 0 || password.length == 0 || name_player.length == 0) {
                Alert.alert("Create Player Account Unsuccessfully", "Required field is missing.");
            } else {
                var InsertAPIURL = "http://10.0.2.2:80/api_game/player/insert.php";
    
                var headers = {
                  'Accept':'application/json',
                  'Content-Type':'application.json'
                };
    
                var Data = {
                    username: username,
                    password: password,
                    name_player: name_player
                };
    
                fetch(InsertAPIURL, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(Data)
                })
                .then((reponse) => reponse.json())
                .then((reponse) => {
    
                    if (reponse[0].Message == "Create player account successfully.") {
                        Alert.alert("Create Player Account", reponse[0].Message, [
                            { text: "OK", onPress: () => this.Search_Record_Player() }
                        ]);
                    } else {
                        Alert.alert("Create Player Account Unsuccessfully", reponse[0].Message);
                    }
    
                })
                .catch((error) => {
                    alert(error);
                })
            }
        } else {
            Alert.alert("Create Player Account Unsuccessfully", "Passwords and confirm passwords do not match.");
        }
    }

    Search_Record_Player = () => {

        var search_username = this.state.username_input;
        var search_password = this.state.password_input;

        if (search_username.length == 0 || search_password.length == 0) {
            Alert.alert("Search Player Account Unsuccessfully", "Required field is missing.");
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
                if (this.state.id_player != 0) { 
                    this.props.navigation.navigate("Main_Menu", { id_player: this.state.id_player });
                } else {
                    Alert.alert("Search Player Account Unsuccessfully");
                }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    render () {
        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <ScrollView>
                    <View style = { styles.container }>
                        <Text style = { styles.text }>CREATE YOUR PLAYER ACCOUNT</Text>
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
                        <Text style = { styles.textshow }>CONFIRM PASSWORD</Text>
                        <Text_Input
                            placeholder = " Enter Confirm Password"
                            secureTextEntry = { this.state.show_confirm_password }
                            onChangeText = { confirm_password_input => this.setState({ confirm_password_input }) }
                        />
                        <View style = {{ flexDirection: "row" }}>
                            <Text style = { styles.textshow }>SHOW CONFIRM PASSWORD</Text>
                            <Switch
                                onValueChange = { () => this.setState({ show_confirm_password: !this.state.show_confirm_password }) }
                                value = { !this.state.show_confirm_password }
                            />
                        </View>
                        <Text style = { styles.textshow }>NAME PLAYER</Text>
                        <Text_Input
                            placeholder = " Enter Name Player"
                            onChangeText = { name_player_input => this.setState({ name_player_input }) }
                        />
                        <Button
                            title = "CREATE"
                            customClick = { this.Insert_Record_Player }
                        />
                    </View>
                </ScrollView>
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
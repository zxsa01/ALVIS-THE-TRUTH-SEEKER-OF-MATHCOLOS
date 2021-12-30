import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, Switch, Alert } from "react-native";

import Button from "../components/button";
import Button_Backward from "../components/button_backward";
import Text_Input from "../components/text_input";

import Slider from "@react-native-community/slider";

export default class Setting extends Component {

    constructor (props) {
        super(props);
        this.state = { name_player: "", update_name_player: "", sound: true, music: true, loudness_of_music: 10, isLoggedInSearchPlayer: true, isLoggedInSearchSetting: true, isLoggedInInsertSetting: true };
    }

    Search_Record_Player = () => {

        const { id_player } = this.props.route.params;
        var search_id_player = id_player;

        if ( this.state.isLoggedInSearchPlayer == true ) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/player/search_id_player.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data = {
                search_id_player: search_id_player
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
                this.setState({ name_player: reponse[0].name_player });
                this.setState({ isLoggedInSearchPlayer: false });
                this.Search_Record_Setting();
            })
            .catch((error) => {
                alert(error);
            })
        }   
    }
    
    Search_Record_Setting = () => {

        const { id_player } = this.props.route.params;
        var search_id_player = id_player;

        if ( this.state.isLoggedInSearchSetting == true ) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/setting/search_id_player.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data = {
                search_id_player: search_id_player
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

                if (reponse[0].sound == 0) {
                    this.setState({ sound: false });
                } else if (reponse[0].sound == 1) {
                    this.setState({ sound: true });
                } else {
                    this.setState({ sound: reponse[0].sound });
                }

                if (reponse[0].music == 0) {
                    this.setState({ music: false });
                } else if (reponse[0].music == 1) {
                    this.setState({ music: true });
                } else {
                    this.setState({ music: reponse[0].music });
                }

                this.setState({ loudness_of_music: reponse[0].loudness_of_music });
                this.setState({ isLoggedInSearchSetting: false });
                this.Insert_Record_Setting();
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Insert_Record_Setting = () => {

        var id_player = this.props.route.params.id_player;

        if ( this.state.isLoggedInInsertSetting == true && (this.state.sound == -1 &&  this.state.music == -1 && this.state.loudness_of_music == -1) ) {

            var InsertAPIURL = "http://10.0.2.2:80/api_game/setting/insert.php";

            var headers = {
              'Accept':'application/json',
              'Content-Type':'application.json'
            };

            var Data = {
                id_player: id_player
            };

            fetch(InsertAPIURL, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(Data)
            })
            .then((reponse) => reponse.json())
            .then((reponse) => {
                this.setState({ sound: true });
                this.setState({ music: true });
                this.setState({ loudness_of_music: 10 });
                this.setState({ isLoggedInInsertSetting: false });
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Update_Record_Player = () => {

        const { id_player } = this.props.route.params;
        var update_id_player = id_player;
        var update_name_player = this.state.update_name_player;

        if (update_name_player != this.state.name_player) {

            if (update_name_player.length == 0) {
                this.Update_Record_Setting();
            } else {
                
                var UpdateAPIURL = "http://10.0.2.2:80/api_game/player/update.php";
      
                var headers = {
                    'Accept':'application/json',
                    'Content-Type':'application.json'
                };
      
                var Data = {
                    update_id_player: update_id_player,
                    update_name_player: update_name_player
                };
      
                fetch(
                    UpdateAPIURL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data)
                })
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    if (reponse[0].Message == "Update name player successfully.") {
                        this.Update_Record_Setting();
                    } else {
                        Alert.alert("Setting Unsuccessfully", reponse[0].Message);
                    }
                })
                .catch((error) => {
                    alert(error);
                })
            }

        } else {
            this.Update_Record_Setting();
        }
    }

    Update_Record_Setting = () => {

        const { id_player } = this.props.route.params;

        if (this.state.sound == false) {
            var sound = 0;
        } else {
            var sound = 1;
        }

        if (this.state.music == false) {
            var music = 0;
            var loudness_of_music = 0;
        } else {
            var music = 1;
            var loudness_of_music = this.state.loudness_of_music;
        }

        var update_id_player = id_player;
  
        var UpdateAPIURL = "http://10.0.2.2:80/api_game/setting/update.php";
  
        var headers = {
            'Accept':'application/json',
            'Content-Type':'application.json'
        };
  
        var Data = {
            sound: sound,
            music: music,
            loudness_of_music: loudness_of_music,
            update_id_player: update_id_player
        };
  
        fetch(
            UpdateAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
        .then((reponse) => reponse.json())
        .then((reponse) => {
            if (reponse[0].Message == "Setting successfully.") {
                Alert.alert("Setting", reponse[0].Message, [
                    { text: "OK", onPress: () => this.props.navigation.goBack({ id_player: id_player }) }
                ]);
            } else {
                Alert.alert("Setting Unsuccessfully", reponse[0].Message);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }

    render () {

        const { id_player } = this.props.route.params;

        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <Button_Backward
                    customClick = { () => this.props.navigation.goBack({ id_player: id_player }) }
                />
                <View style = { styles.container } onPress = { this.Search_Record_Player() }>
                    <Text style = { styles.text }>SETTING</Text>
                    <Text_Input
                        placeholder = { this.state.name_player }
                        onChangeText = { update_name_player => this.setState({ update_name_player }) }
                    />
                    <Text style = { styles.textswitch }>SOUND</Text>
                    <Switch
                        /*trackColor = {{ false: "#767577", true: "#81b0ff" }}
                        thumbColor = { this.state.sound ? "#f5dd4b" : "#f4f3f4" }*/
                        value = { this.state.sound }
                        onValueChange = { sound => this.setState({ sound }) }
                    />
                    <Text style = { styles.textswitch }>MUSIC</Text>
                    <Switch
                        /*trackColor = {{ false: "#767577", true: "#81b0ff" }}
                        thumbColor = { this.state.music ? "#f5dd4b" : "#f4f3f4" }*/
                        value = { this.state.music }
                        onValueChange = { music => this.setState({ music }) }
                    />
                    <Text style = { styles.textslider }>LOUDNESS OF MUSIC</Text>
                    <Slider
                        style = {{ width: 200, height: 40 }}
                        minimumValue = { 0 }
                        maximumValue = { 1 }
                        minimumTrackTintColor = "#FFFFFF"
                        maximumTrackTintColor = "#000000"
                        value = { this.state.loudness_of_music / 10 }
                        onValueChange = { loudness_of_music => this.setState({ loudness_of_music: loudness_of_music*10 }) }
                    />
                    <Button
                        title = "SAVE"
                        customClick = { this.Update_Record_Player }
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
        color: "#FFFFFF",
        padding: 10
    },
    textswitch: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff", 
    },
    textslider: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff"
    }
})
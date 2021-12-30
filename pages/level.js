import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, FlatList } from "react-native";

import Button_Backward from "../components/button_backward";
import Button_Menu from "../components/button_menu";
import Button_Cycle from "../components/button_cycle";

export default class Level extends Component {

    constructor (props) {
        super(props);
        this.state = { id_level: [], level_number: [], minute: [], second: [], search_id_subject: 0,  isLoggedInSearchLevel: true, isLoggedInSearchScore: true, score: [], data: [] };
    }

    Search_Record_Level = () => {
        
        const { id_subject } = this.props.route.params;
        var search_id_subject = id_subject;

        if (this.state.isLoggedInSearchLevel == true) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/level/search_id_subject.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data = {
                search_id_subject: search_id_subject
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
                this.setState({ id_level: reponse[0].id_level });
                this.setState({ level_number: reponse[0].level_number });
                this.setState({ minute: reponse[0].minute });
                this.setState({ second: reponse[0].second });
                this.setState({ isLoggedInSearchLevel: false });
                this.Search_Record_Score();
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Search_Record_Score = () => {

        if (this.state.isLoggedInSearchScore == true) {

            for (let i = 0; i < this.state.id_level.length; i++) {

                const { id_player } = this.props.route.params;
                var search_id_player = id_player;
                var search_id_level = this.state.id_level[i];

                var SearchAPIURL = "http://10.0.2.2:80/api_game/score/search_id_player_id_level.php";

                var header = {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                };

                var Data = {
                    search_id_player: search_id_player,
                    search_id_level: search_id_level
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
                    
                    if (reponse[0].score == -1) {
                        this.state.score[i] = 0;
                    } else {
                        this.state.score[i] = reponse[0].score;
                    }

                    if (i == (this.state.id_level.length - 1)){

                        this.setState({ data: [] });

                        for (let i = 0; i < this.state.id_level.length; i++) {
                            this.state.data.push({ level_number: this.state.level_number[i], id_level: this.state.id_level[i], score: this.state.score[i], minute: this.state.minute[i], second: this.state.second[i] });
                        }

                        this.setState({ isLoggedInSearchScore: false });
                    }
                })
                .catch((error) => {
                    alert(error);
                })
            }
        }
    }

    render () {

        const { id_subject, name_subject, id_player, id_education_level } = this.props.route.params;

        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <Button_Backward
                    customClick = { () => this.props.navigation.goBack({ id_player: id_player, id_education_level: id_education_level }) }
                />
                <Button_Menu
                    customClick = { () => this.props.navigation.navigate("Main_Menu", { id_player: id_player }) }
                />
                <View style = { styles.container } onPress = { this.Search_Record_Level() }>
                    <Text style = { styles.text }>LEVEL { name_subject }</Text>
                    <FlatList
                        data = { this.state.data }
                        renderItem ={ ({ item }) => 
                            <View style = { styles.container }>
                                <Button_Cycle
                                    title = { item.level_number }
                                    customClick = { () => this.props.navigation.navigate("Game_Play", { level_number: item.level_number, id_level: item.id_level, score: item.score, minute: item.minute, second: item.second , id_player: id_player, id_subject: id_subject, name_subject: name_subject, id_education_level: id_education_level }) }
                                />
                                <Text style = { styles.textscore }>SCORE: { item.score }</Text>
                            </View>
                        }
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
        fontSize: 25,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    textscore: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#000000",
        padding: 5,
        marginTop: 5,
        backgroundColor: "#FF8300",
        borderRadius: 8
    }
})
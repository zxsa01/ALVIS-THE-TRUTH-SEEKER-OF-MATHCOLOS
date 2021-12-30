import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, FlatList } from "react-native";

import Button from "../components/button";
import Button_Backward from "../components/button_backward";
import Button_Menu from "../components/button_menu";

export default class Subject extends Component {

    constructor (props) {
        super(props);
        this.state = { name_subject: [], id_subject: [], search_id_education_level: 0, isLoggedInSearchSubject: true };
    }

    Search_Record_Subject = () => {

        const { id_education_level } = this.props.route.params;
        var search_id_education_level = id_education_level;

        if (this.state.isLoggedInSearchSubject == true) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/subject/search_id_education_level.php";

            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };

            var Data = {
                search_id_education_level: search_id_education_level
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
                this.setState({ name_subject: reponse[0].name_subject });
                this.setState({ id_subject: reponse[0].id_subject });
                this.setState({ isLoggedInSearchSubject: false });
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Check_Name_Subject = (item) => {

        const { id_player, id_education_level } = this.props.route.params;

        for(let i = 0; i < this.state.name_subject.length; i++){
            if(item == this.state.name_subject[i]){
                this.props.navigation.navigate("Level", { id_subject: this.state.id_subject[i], name_subject: this.state.name_subject[i], id_player: id_player, id_education_level: id_education_level });
            }
        }
    }

    render () {

        const { id_player } = this.props.route.params;

        return (
            <ImageBackground source = { require("../images/background_game.jpg") } resizeMode = "cover" style = { styles.imagebackground }>
                <Button_Backward
                    customClick = { () => this.props.navigation.goBack({ id_player: id_player }) }
                />
                <Button_Menu
                    customClick = { () => this.props.navigation.navigate("Main_Menu", { id_player: id_player }) }
                />
                <View style = { styles.container } onPress = { this.Search_Record_Subject() }>
                    <Text style = { styles.text }>SUBJECT</Text>
                    <FlatList
                        data = { this.state.name_subject }
                        renderItem = { ({ item }) => 
                            <Button 
                                title = { item } 
                                customClick = { () => this.Check_Name_Subject(item) }
                            /> 
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
        fontSize: 30,
        fontWeight: "bold",
        color: '#FFFFFF'
    }
})
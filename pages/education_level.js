import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, FlatList } from "react-native";

import Button from "../components/button";
import Button_Backward from "../components/button_backward";

export default class Education_Level extends Component {

    constructor (props) {
        super(props);
        this.state = { name_education_level: [], id_education_level: [], isLoggedInSearchEducationlevel: true };
    }

    Search_Record_Education_level = () => {

        if (this.state.isLoggedInSearchEducationlevel == true) {

          var SearchAPIURL = "http://10.0.2.2:80/api_game/education_level/search.php";
  
          var header = {
            'Accept':'application/json',
            'Content-Type':'application/json'
          };
  
          fetch(
            SearchAPIURL,{
                method: 'POST',
                headers: header
            }
          )
          .then((reponse) => reponse.json())
          .then((reponse) => {
            this.setState({ name_education_level: reponse[0].name_education_level });
            this.setState({ id_education_level: reponse[0].id_education_level });
            this.setState({ isLoggedInSearchEducationlevel: false });
          })
          .catch((error) => {
            alert(error);
          })
        }
    }

    Check_Name_Education_Level = (item) => {

        const { id_player } = this.props.route.params;

        for (let i = 0; i < this.state.name_education_level.length; i++) {
            if (item == this.state.name_education_level[i]) {
                this.props.navigation.navigate("Subject", { id_education_level: this.state.id_education_level[i], id_player: id_player });
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
                <View style = { styles.container } onPress = { this.Search_Record_Education_level() }>
                    <Text style = { styles.text }>EDUCATION LEVEL</Text>
                    <FlatList
                        data = { this.state.name_education_level }
                        renderItem ={ ({ item }) => 
                            <Button 
                                title = { item } 
                                customClick = { () => this.Check_Name_Education_Level(item) }
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
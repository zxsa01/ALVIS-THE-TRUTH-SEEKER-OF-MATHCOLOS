import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text, FlatList } from 'react-native';

import Button from "../components/button";
import Button_Backward from "../components/button_backward";

export default class Detail extends Component {

    constructor (props) {
        super(props);
        this.state = { name_detail: [], information_detail: [], isLoggedInSearchDetail: true };
    }

    Search_Record_Detail = () => {

        if (this.state.isLoggedInSearchDetail == true) {
  
            var SearchAPIURL = "http://10.0.2.2:80/api_game/detail/search.php";
  
            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };
  
            fetch(
                SearchAPIURL, {
                    method: 'POST',
                    headers: header
                }
            )
            .then((reponse) => reponse.json())
            .then((reponse) => {
                this.setState({ name_detail: reponse[0].name_detail });
                this.setState({ information_detail: reponse[0].information_detail });
                this.setState({ isLoggedInSearchDetail: false });
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Check_Name_Detail = (item) => {

        const { id_player } = this.props.route.params;

        for (let i = 0; i < this.state.name_detail.length; i++) {
            if (item == this.state.name_detail[i]) {
                this.props.navigation.navigate("Information_Detail", { name_detail: this.state.name_detail[i], information_detail: this.state.information_detail[i], id_player: id_player });
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
                <View style = { styles.container } onPress = { this.Search_Record_Detail() }>
                    <Text style = { styles.text }>DETAIL</Text>
                    <FlatList
                        data = { this.state.name_detail }
                        renderItem ={ ({ item }) => 
                            <Button 
                                title = { item } 
                                customClick = { () => this.Check_Name_Detail(item) }
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
        color: "#FFFFFF"
    }
})
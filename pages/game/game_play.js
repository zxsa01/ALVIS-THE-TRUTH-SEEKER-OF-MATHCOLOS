import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, Dimensions, Modal, FlatList, ImageBackground } from "react-native";

import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

import Player from "./player";
import Enemy from "./enemy";
import Floor from "./floor";

import Physics from "./physics";

import Button from "../../components/button";

export default class Game_Play extends Component {

    constructor (props) {
        super(props);
        this.gameEngine = null;
        this.entities = this.setupWorld();
        this.state = {
            running: true,

            second: this.props.route.params.second,
            minute: this.props.route.params.minute,

            gameover: false,
            gamewin: false,

            isLoggedInSearchQuestionAnswer: true,
            id_question_answer: 0,
            question: null,
            answer: 0,

            isLoggedInSearchChoice: true,
            choice_number: [],
            choice_question_answer: [],

            isLoggedInSearchScore: true,
            isLoggedInInsertScore: true,
            isLoggedInUpdateScore: true,
            score: 0,
            score_input: 0,

            data: [],
            show: false
        }
    }

    componentDidMount () {
        if (this.state.second == 0) {
            this.componentDidUpdate();
        }

        this.interval = setInterval (
            () => this.setState((prevState) => ({ second: prevState.second - 1})), 1000
        )
    }

    componentDidUpdate () {

        const { id_subject, name_subject, id_player, id_education_level } = this.props.route.params;

        if (this.state.second == 0) { 
            if ( this.state.minute != 0) {
                this.setState({ minute: this.state.minute - 1 });
                this.setState({ second: 59 });
            } else {
                clearInterval(this.interval);
                if ( this.state.second == 0 && this.state.minute == 0 && this.state.gameover == false ) {
                    this.setState({ gameover: true });
                    this.setState({ running: false });
                    Alert.alert("Game Over", "Out of time.", [
                        { text: "OK", onPress: () => this.props.navigation.navigate("Game_Over", { id_subject: id_subject, name_subject: name_subject, id_player: id_player, id_education_level: id_education_level }) }
                    ]);
                }
            }
        }
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    onEvent = (events) => {
        if (events.type == "Question") {
            this.setState({ running: false })
            this.setState({ show: true });
            this.Search_Record_Question_Answer();
        }
    }

    Search_Record_Question_Answer = () => {

        const { level_number, id_subject } = this.props.route.params;
        var search_level_number = level_number;
        var search_id_subject = id_subject;

        if (this.state.isLoggedInSearchQuestionAnswer == true) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/question_answer/search_id_level.php";
  
            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };
  
            var Data = {
                search_level_number: search_level_number,
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
                this.setState({ id_question_answer: reponse[0].id_question_answer });
                this.setState({ question: reponse[0].question });
                this.setState({ answer: reponse[0].answer });
                this.setState({ isLoggedInSearchQuestionAnswer: false });
                this.Search_Record_Choice();
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Search_Record_Choice = () => {

        var search_id_question_answer = this.state.id_question_answer;

        if (this.state.isLoggedInSearchChoice == true) {

            var SearchAPIURL = "http://10.0.2.2:80/api_game/choice/search_id_question_answer.php";
  
            var header = {
                'Accept':'application/json',
                'Content-Type':'application/json'
            };
  
            var Data = {
                search_id_question_answer: search_id_question_answer
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
                this.setState({ choice_number: reponse[0].choice_number });
                this.setState({ choice_question_answer: reponse[0].choice_question_answer });
                this.setState({ isLoggedInSearchChoice: false });

                this.setState({ data: [] });

                for (let i = 0; i < this.state.choice_number.length; i++) {
                    this.state.data.push({ choice_number: this.state.choice_number[i], choice_question_answer: this.state.choice_question_answer[i] });
                }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Search_Record_Score = () => {

        const { id_player, id_level } = this.props.route.params;
        var search_id_level = id_level;
        var search_id_player = id_player;

        if (this.state.isLoggedInSearchScore == true) {

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

                this.setState({ isLoggedInSearchScore: false });
                if (reponse[0].score == -1) {
                    this.state.score = 0;
                    this.Insert_Record_Score();
                } else {
                    this.state.score = reponse[0].score;
                    if (this.state.score_input > this.state.score) {
                        this.Update_Record_Score();
                    }
                }

            })
            .catch((error) => {
                alert(error);
            })

        }
    }

    Insert_Record_Score = () => {

        var id_player = this.props.route.params.id_player;
        var id_level = this.props.route.params.id_level;
        var score = this.state.score_input;

        if (this.state.isLoggedInInsertScore == true) {

            var InsertAPIURL = "http://10.0.2.2:80/api_game/score/insert.php";

            var headers = {
              'Accept':'application/json',
              'Content-Type':'application.json'
            };

            var Data = {
                id_player: id_player,
                id_level: id_level,
                score: score
            };

            fetch(InsertAPIURL, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(Data)
            })
            .then((reponse) => reponse.json())
            .then((reponse) => {
                this.setState({ isLoggedInInsertScore: false });
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Update_Record_Score = () => {

        const { id_player, id_level } = this.props.route.params;
        var update_id_player = id_player;
        var update_id_level = id_level;
        var score = this.state.score_input;

        if (this.state.isLoggedInUpdateScore == true) {

            var InsertAPIURL = "http://10.0.2.2:80/api_game/score/update.php";

            var headers = {
              'Accept':'application/json',
              'Content-Type':'application.json'
            };

            var Data = {
                update_id_player: update_id_player,
                update_id_level: update_id_level,
                score: score
            };

            fetch(InsertAPIURL, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(Data)
            })
            .then((reponse) => reponse.json())
            .then((reponse) => {
                this.setState({ isLoggedInUpdateScore: false });
            })
            .catch((error) => {
                alert(error);
            })
        }
    }

    Check_Answer = (answer_input) => {

        const { level_number , id_subject, name_subject, id_player, id_education_level } = this.props.route.params;

        clearInterval(this.interval);
        this.setState({ show: false });

        if ( this.state.answer == answer_input ) {
            if ( this.state.gamewin == false ) {
                this.setState({ gamewin: true });
                this.setState({ score_input: (this.state.minute*100) + (this.state.second) + (level_number*10) });
                this.Search_Record_Score();
                Alert.alert("Game Win", "", [
                    { text: "OK", onPress: () => this.props.navigation.navigate("Game_Win", { id_subject: id_subject, name_subject: name_subject, id_player: id_player, id_education_level: id_education_level, score_input: this.state.score_input }) }
                ]);
            }
        } else {
            if ( this.state.gameover == false ) {
                this.setState({ gameover: true });
                Alert.alert("Game Over", "Wrong answer.", [
                    { text: "OK", onPress: () => this.props.navigation.navigate("Game_Over", { id_subject: id_subject, name_subject: name_subject, id_player: id_player, id_education_level: id_education_level }) }
                ]);
            }
        }
    }

    setupWorld = () => {

        let MAX_WIDTH = Dimensions.get("screen").width;
        let MAX_HEIGHT = Dimensions.get("screen").height;

        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;

        let player = Matter.Bodies.rectangle( MAX_WIDTH / 4, (MAX_HEIGHT / 2) + 100, 50, 50 );
        let enemy = Matter.Bodies.rectangle( (MAX_WIDTH / 2) + 200, (MAX_HEIGHT / 2) + 100, 50, 50 );
        let floor = Matter.Bodies.rectangle( MAX_WIDTH / 2, MAX_HEIGHT - 80, MAX_WIDTH, 50, { isStatic: true } );

        Matter.World.add(world, [player, enemy, floor]);

        return {
            physics: { engine: engine, world: world},
            player: { body: player, size: [50, 50], color: "#548CFF", renderer: Player },
            enemy: { body: enemy, size: [50, 50], color: "#F75D59", renderer: Enemy },
            floor: { body: floor, size: [MAX_WIDTH, 50], color: "#C19A6B", renderer: Floor }
        }

    }

    render () {
        return (
            <ImageBackground source = { require("../../images/background_gameplay.png") } resizeMode = "cover" style = { styles.imagebackground }>
                <Text style = { styles.textshow }>Time: { this.state.minute }:{ this.state.second }</Text>
                <Modal
                    transparent = { true }
                    visible = { this.state.show }
                >
                    <View style = {{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <View style = {{ backgroundColor: "#000000AA", padding: 10, width: Dimensions.get("screen").width - 200, height: 325,  justifyContent: "center", alignItems: "center", borderRadius: 50}}>
                            <Text style = {{ 
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                padding: 12 
                            }}>คำถาม: { this.state.question }</Text>
                            <FlatList
                                data = { this.state.data }
                                renderItem = { ({ item }) => 
                                    <Button 
                                        title = { item.choice_number + "." + item.choice_question_answer }
                                        customClick = { () => { this.Check_Answer(item.choice_number) } }
                                    /> 
                                }
                            />
                        </View>
                    </View>
                </Modal>
                <GameEngine
                    ref = { (ref) => { this.gameEngine = ref; }}
                    style = { styles.gameContainer }
                    systems = { [Physics] }
                    running = { this.state.running }
                    entities = { this.entities }
                    onEvent = { this.onEvent }
                >
                    <StatusBar hidden = { true }/>
                    <View style = { styles.container }>
                        <View style = { styles.controlRow }>
                            <TouchableOpacity style = { styles.button } onPress = { () => { this.gameEngine.dispatch({ control: "move-up" }) } }>
                                <Text style = { styles.text }>Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.controlRow }>
                            <TouchableOpacity style = { styles.button } onPress = { () => { this.gameEngine.dispatch({ control: "move-left" }) } }>
                                <Text style = { styles.text }>left</Text>
                            </TouchableOpacity>
                            <View style={[styles.button, { backgroundColor: null}]} />
                            <TouchableOpacity style = { styles.button } onPress = { () => { this.gameEngine.dispatch({ control: "move-right" }) } }>
                                <Text style = { styles.text }>Right</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.controlRow }>
                            <TouchableOpacity style = { styles.button } onPress = { () => { this.gameEngine.dispatch({ control: "move-down" }) } }>
                                <Text style = { styles.text }>Down</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </GameEngine>
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
        justifyContent: "flex-end",
        width: 170,
        padding: 5,
    },
    controlRow: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEDE00",
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 5
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000000',
    },
    textshow: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        padding: 14
    }
})
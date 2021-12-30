import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/home";
import Main_Menu from "./pages/main_menu";
import Create_Player from "./pages/create_player";
import Login from "./pages/login.js";
import Delete_Player from "./pages/delete_player";

import Detail from "./pages/detail";
import Information_Detail from "./pages/information_detail";

import Setting from "./pages/setting";

import Education_Level from "./pages/education_level";
import Subject from "./pages/subject";
import Level from "./pages/level";
import Game_Play from "./pages/game/game_play";
import Game_Over from "./pages/game/game_over";
import Game_Win from "./pages/game/game_win";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "App" screenOptions = {{ headerShown: false }}>
                <Stack.Screen name = "Home" component = { Home }/>
                <Stack.Screen name = "Main_Menu" component = { Main_Menu }/>
                <Stack.Screen name = "Create_Player" component = { Create_Player }/>
                <Stack.Screen name = "Login" component = { Login }/>
                <Stack.Screen name = "Delete_Player" component = { Delete_Player }/>

                <Stack.Screen name = "Detail" component = { Detail }/>
                <Stack.Screen name = "Information_Detail" component = { Information_Detail }/>

                <Stack.Screen name = "Setting" component = { Setting }/>

                <Stack.Screen name = "Education_Level" component = { Education_Level }/>
                <Stack.Screen name = "Subject" component = { Subject }/>
                <Stack.Screen name = "Level" component = { Level }/>

                <Stack.Screen name = "Game_Play" component = { Game_Play }/>
                <Stack.Screen name = "Game_Over" component = { Game_Over }/>
                <Stack.Screen name = "Game_Win" component = { Game_Win }/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
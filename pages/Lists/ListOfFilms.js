import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Button, FlatList,
    Image, ImageBackground,
    InteractionManager,
    SafeAreaView,
    ScrollView, StyleSheet,
    Text,
    TouchableHighlight, TouchableOpacity,
    View,
} from "react-native";
import {useNavigation, useScrollToTop} from "@react-navigation/native";
import FilmItem from "../../components/Films/FilmItem";

import {useTheme} from "../../providers/ThemeProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import {DARK_BACKGROUND_IMG, DEFAULT_BACKGROUND_IMG} from "../../Api/apiKey";
import {DefaultStyles} from "../../styles/defaultstyles";

const ListOfFilms = ({ route }) => {
    const { data, title } = route.params;
    const navigation=useNavigation()
    const [isScroll, setIsScroll] = useState(false);
    const {isDarkTheme}=useTheme()
    let listRef;
    const ref = useRef(null);
    const TopButtonHandler = () => {
        listRef.scrollToOffset({ offset: 0, animated: true });
    };

    return (

            <ImageBackground source={{ uri: !isDarkTheme ? DARK_BACKGROUND_IMG : DEFAULT_BACKGROUND_IMG,flex:1,padding:10  }}
                             style={DefaultStyles.ImageBg} blurRadius={10}>
            {isScroll && <TouchableOpacity   onPress={TopButtonHandler} style={{backgroundColor:isDarkTheme?"#DAA520":"#DC143C",position:'absolute',zIndex:3,right:15,borderRadius:50,display:'flex',alignItems:'center',padding:10}}><AntDesign name="arrowup" color="white" size={20}/></TouchableOpacity>}

            <FlatList data={data} renderItem={({ item, index }) => {
                return (<FilmItem item={item} navigation={navigation} />);
            }
            } ref={(ref) => {
                listRef = ref;
            }} onScroll={() =>   setIsScroll(true)} initialNumToRender={10}  />

            </ImageBackground>

    );
};

export default ListOfFilms;

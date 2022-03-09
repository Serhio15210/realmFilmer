import React, {useContext} from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {DefaultStyles} from "../styles/defaultstyles";
import {AuthContext} from "../App";
import {DarkThemeStyles} from "../styles/darkstyles";
import {IMG_URI, NONAME_IMG} from "../Api/apiKey";

const ActorItem = ({item,navigation,actorFilms}) => {
    const {isDarkTheme}=useContext(AuthContext)
    const theme=isDarkTheme?DarkThemeStyles:DefaultStyles
    return (
        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ActorsInfo",{id:item.id,navigation:navigation,data:actorFilms})}>
            <View key={item.imdbID} style={theme.filmItemView}>

                <Image source={item.profile_path?{uri: IMG_URI + item.profile_path}:NONAME_IMG}
                       style={{
                           width: 80,
                           height: 100,
                           alignSelf:"flex-start",borderRadius:8,borderBottomRightRadius:0,borderTopRightRadius:0
                       }} resizeMode="cover"/>

                <View style={{width:220}}>
                    <Text style={theme.filmItemText}>{item.name}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default ActorItem;

import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../App";

import GetActorsInfo from "../Api/GetActorsInfo";
import { IMG_URI } from "../Api/apiKey";


const ActorsInfo = ({ route }) => {
  const { id, data, navigation } = route.params;
  const [actorInfo, setActorInfo] = useState({});
  const [actorFilms, setActorFilms] = useState([]);
  const [directorFilms, setDirectorFilms] = useState([]);
  const { isDarkTheme, screenTheme } = useContext(AuthContext);
  const details = screenTheme;
  useEffect(async () => {
    await GetActorsInfo.getActorsInfo(id).then((response) => {
      setActorInfo(response);

    });
    await GetActorsInfo.getActorsFilms(id).then((data2) => {

      setActorFilms(data2.cast);
      setDirectorFilms(data2.crew);
    });

  }, []);
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Image source={{ uri: IMG_URI + actorInfo.profile_path }} style={{
          width: 250,
          height: 300,
          alignSelf: "center", borderRadius: 20,
        }} resizeMode="cover" />
        <Text style={details.actorsName}>
          {actorInfo.name}{"\n"}
        </Text>
        <Text style={{ ...details.actorsName, ...{ alignSelf: "flex-start" } }}>Personal information</Text>
        <Text style={details.actorTitles}>Profession{"\n"}<Text
          style={details.textActors}>{actorInfo.known_for_department}</Text></Text>
        <Text style={details.actorTitles}>Birthday{"\n"}<Text
          style={details.textActors}>{actorInfo.birthday}</Text></Text>

        <Text style={details.actorTitles}>Place of birth{"\n"}<Text
          style={details.textActors}>{actorInfo.place_of_birth}</Text></Text>
        <Text style={{ ...details.actorsName, ...{ alignSelf: "flex-start", paddingTop: 20 } }}>Biography {"\n"} </Text>
        <Text style={details.textActors}>{actorInfo.biography}</Text>

        <Text style={{ ...details.actorsName, ...{ alignSelf: "flex-start", paddingTop: 20 } }}>Films:</Text>
        <FlatList
          style={{ marginBottom: 30 }}
          horizontal={true}
          data={actorFilms}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={details.actorsFilms} onPress={() => navigation.push("DetailFilm", {
                id: item.id,
                navigation: navigation,
              })}>
                <ImageBackground source={{ uri: IMG_URI + item.poster_path }}
                                 style={{
                                   width: 220,
                                   height: 220,
                                   borderTopRightRadius: 5,
                                   borderTopLeftRadius: 5,
                                   backgroundSize: "cover",
                                   backgroundPositionX: "50%",
                                   backgroundPositionY: "50%",
                                 }} />


                <Text style={details.text}>{item.original_title}</Text>

              </TouchableOpacity>
            );
          }}
        />


      </View>


    </ScrollView>
  );
};

export default ActorsInfo;
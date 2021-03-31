import React from "react";

import { Image } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/restaurant-logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.tittle}>Consulta tu perfil en Restaurants</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante?, Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia.
      </Text>
      <Button
        title="Iniciar Sesion"
        buttonStyle={styles.button}
        tittle="Ver tu pefil"
        onPress={() => navigation.navigate("login")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
  },
  image: {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  titlle: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    color: "#a65273",
    marginBottom: 20,
  },
  button: {
    color: "#442484",
    fontWeight: "bold",
  },
});


import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import urls from '../../urls';
class Escuela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      escuela: null,
      url_escuela: urls.API_URL_API + "/escuelas/1",
    };
  }

  async obtener_escuela() {
    await fetch(this.state.url_escuela, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          escuela: res.datos,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.obtener_escuela();
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/mecanica-transparente.png")}
            style={{ flex: 1, flexDirection: "column" }}
          >
            <ScrollView>
              <View style={styles.mision_vision}>
                <Text style={styles.subtitulo}>Misión</Text>
              </View>
              <View>
                <Text style={styles.text3}>
                  {this.state.escuela.mision}
                </Text>
              </View>

              <View style={styles.mision_vision}>
                <Text style={styles.subtitulo}>Visión</Text>
              </View>

              <View>
                <Text style={styles.text3}>
                  {this.state.escuela.vision}
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../../assets/images/mecanica-transparente.png")}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <ActivityIndicator
            size="large"
            color="#344a72"
            justifyContent="space-around"
          />
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    flexDirection: "column",
  },
  text3: {
    fontSize: 18,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  mision_vision: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
  },

  subtitulo: {
    paddingTop: 15,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
  },
});

export default Escuela;

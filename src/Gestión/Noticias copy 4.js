import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import {
  Dialog,
  Portal,
  Card,
  Title,
  Button,
  Divider,
  Chip,
} from "react-native-paper";
import Communications from "react-native-communications";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import urls from "../../urls";

class Noticias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      loading: true,
      noticias: null,

      url_noticias: urls.API_URL_API + "/noticias/1",

      visible_noticias: false,
    };
  
  }
  _showNoticias = () => this.setState({ visible_noticias: true });
  _hideNoticias = () => this.setState({ visible_noticias: false });
  
  componentDidMount = () => {
    Promise.all([
      
        fetch(this.state.url_noticias), 
    ])
    .then((values) => {
      return Promise.all(values.map((r) => r.json()));
    })
    .then(([not,]) => 
    {
      this.setState({ 
        noticias: not.datos,
        loading: false 
      });
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  

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
              <View style={styles.politicas_calidad}>
                <Text style={styles.titulo}>Últimas Noticias </Text>
              </View>

              <View
                style={{
                  alignSelf: "center",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <Card
                  style={{ height: 250, width: 330 }}
                  onPress={() => this._showNoticias()}
                >
                  <Card.Cover
                    style={{ height: 180, width: 330, alignSelf: "center" }}
                    source={{
                      uri:
                        urls.API_URL_NOT +
                        "/" +
                        this.state.noticias.image,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Title style={{ fontSize: 17, textAlign: "center" }}>
                      {this.state.noticias.titulo}
                    </Title>
                  </Card.Content>
                </Card>
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
  text: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
  },
  text_press: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  titulo: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
    textAlign: "center",
  },
  text_mis_vis: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "justify",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
  subtitulo_mis_vis: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4d4d4d",
    textAlign: "center",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
});

export default Noticias;

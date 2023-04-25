import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
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
import { Linking } from "react-native";
import Communications from "react-native-communications";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import urls from "../../urls";

class Asociaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mecanica: null,
      
      url_mecanica: urls.API_URL_API + "/asociaciones/1",

      visible_mecanica: false,
      visible_mis_vis_mec: false,

    };
  }

  _showmecanica = () => this.setState({ visible_mecanica: true });
  _hidemecanica = () => this.setState({ visible_mecanica: false });
  _showMis_Vis_Mec = () => this.setState({ visible_mis_vis_mec: true });
  _hideMis_Vis_Mec = () => this.setState({ visible_mis_vis_mec: false });

  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_mecanica),

    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(([mec]) => {
        this.setState({
          mecanica: mec.datos,          

          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  mecanica() {
    return (
      <ScrollView>
        <View style={{ alignSelf: "center", paddingTop: 10 }}>
          <Card
            style={{ height: 65, width: 220, backgroundColor: "#ccd4e3"}}
            onPress={() => this._showMis_Vis_Mec()}
          >
            <Card.Content>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Misión / Visión
              </Title>
            </Card.Content>
          </Card>
        </View>

        <View style={{ alignSelf: "center", paddingTop: 20 }}>
          <Card style={{ height: 160, width: 290, backgroundColor: "#ccd4e3" }}>
            <Card.Content>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Contactos
              </Title>
              <Text style={styles.text}>
                <MaterialCommunityIconsIcon
                  name="phone"
                  size={18}
                  color={"black"}
                />
                Teléfono:
                <Text
                  style={styles.text_press}
                  onPress={() => 
                    Communications.phonecall(
                      this.state.mecanica.telefono_asociacion,
                      true
                    )
                  }
                >
                  {this.state.mecanica.telefono_asociacion}
                </Text>
                {"\n"}
                {"\n"}
                <MaterialCommunityIconsIcon
                  name="email"
                  size={18}
                  color={"black"}
                />
                Email:
                <Text
                  style={styles.text_press}
                  onPress={() =>
                    Communications.email(
                      ["", this.state.mecanica.correo_asociacion],
                      null,
                      null,
                      "",
                      ""
                    )
                  }
                >
                  {this.state.mecanica.correo_asociacion}
                </Text>
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <Chip
            style={{ backgroundColor: "#f7faff", marginTop: 25 }}
            textStyle={{ fontSize: 15 }}
            height={34}
            width={110}
            mode="outlined"
            icon="facebook"
            selected="true"
            selectedColor="#3b5998"
            onPress={() =>
              Communications.web(this.state.mecanica.facebook_asociacion)
            }
          >
            Síguenos
          </Chip>
        </View>
      </ScrollView>
    );
  }

 
  mis_vis_mecanica() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.subtitulo_mis_vis}>Misión</Text>
          <Text style={styles.text_mis_vis}>
            {this.state.mecanica.mision}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo_mis_vis}>Visión</Text>
          <Text style={styles.text_mis_vis}>
            {this.state.mecanica.vision}
          </Text>
        </View>
      </ScrollView>
    );
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
              <View style={styles.politicas_calidad}>
                <Text style={styles.titulo}>Asociaciones de Ingeniería Mecánica</Text>
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
                  onPress={() => this._showmecanica()}
                >
                  <Card.Cover
                    style={{ height: 180, width: 330, alignSelf: "center" }}
                    source={{
                      uri:
                        urls.API_URL_ASO +
                        "/" +
                        this.state.mecanica.logo,
                    }}
                  />
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Title style={{ fontSize: 17, textAlign: "center" }}>
                      {this.state.mecanica.nombre}
                    </Title>
                  </Card.Content>
                </Card>
              </View>

              <Divider />

              {/*--------------------------------------------------mecanica---------------------------------------------------------*/}
              <Portal>
                <Dialog
                  visible={this.state.visible_mecanica}
                  onDismiss={this._hidemecanica}
                  style={{ flex: 0.6 }}
                >
                  <Dialog.Title style={{ textAlign: "center", fontSize: 14 }}>
                    {this.state.mecanica.nombre_asociacion}
                  </Dialog.Title>
                  <Dialog.ScrollArea>{this.mecanica()}</Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hidemecanica}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Portal>
                <Dialog
                  visible={this.state.visible_mis_vis_mec}
                  onDismiss={this._hideMis_Vis_Mec}
                  style={{ flex: 0.7 }}
                >
                  <Dialog.Title style={{ textAlign: "center" }}>
                    Misión / Visión
                  </Dialog.Title>
                  <Dialog.ScrollArea>
                    {this.mis_vis_mecanica()}
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hideMis_Vis_Mec}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
             
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

export default Asociaciones;

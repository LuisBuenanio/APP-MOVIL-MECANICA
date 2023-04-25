import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Dialog,
  Portal,
  Card,
  Title,
  Button,
  Divider,
} from "react-native-paper";
import Communications from "react-native-communications";
import urls from "../../urls";

class Asociacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mecanica: null,
      url_mecanica: urls.API_URL_API + "/escuelas/1",

      visible_mecanica: false,
      visible_inf_general_emp: false,
      visible_mis_vis_emp: false,
      visible_campo_emp: false,
      visible_perfil_emp: false,

      
    };
  }

  _showMecanica = () => this.setState({ visible_mecanica: true });
  _hideMecanica = () => this.setState({ visible_mecanica: false });
  _showInf_General_Emp = () => this.setState({ visible_inf_general_emp: true });
  _hideInf_General_Emp = () =>
    this.setState({ visible_inf_general_emp: false });
  _showMis_Vis_Emp = () => this.setState({ visible_mis_vis_emp: true });
  _hideMis_Vis_Emp = () => this.setState({ visible_mis_vis_emp: false });
  _showCampo_Emp = () => this.setState({ visible_campo_emp: true });
  _hideCampo_Emp = () => this.setState({ visible_campo_emp: false });
  _showPerfil_Emp = () => this.setState({ visible_perfil_emp: true });
  _hidePerfil_Emp = () => this.setState({ visible_perfil_emp: false });


  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_mecanica),
    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(([emp, cont, fin, trans, merc]) => {
        this.setState({
          mecanica: emp.datos,
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
        <View style={{ alignSelf: "center", paddingTop: 20 }}>
          <Card
            style={{ height: 70, width: 220, backgroundColor: "#ccd4e3"  }}
            onPress={() => this._showInf_General_Emp()}
          >
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Información General
              </Title>
            </Card.Content>
          </Card>
        </View>
        <View style={{ alignSelf: "center", paddingTop: 20 }}>
          <Card
            style={{ height: 70, width: 220,backgroundColor: "#ccd4e3" }}
            onPress={() => this._showMis_Vis_Emp()}
          >
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Misión/Visión
              </Title>
            </Card.Content>
          </Card>
        </View>
        <View style={{ alignSelf: "center", paddingTop: 20 }}>
          <Card
            style={{ height: 70, width: 220, backgroundColor: "#ccd4e3" }}
            onPress={() => this._showCampo_Emp()}
          >
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Campo Ocupacional
              </Title>
            </Card.Content>
          </Card>
        </View>
        <View
          style={{ alignSelf: "center", paddingTop: 20, paddingBottom: 20 }}
        >
          <Card
            style={{ height: 70, width: 220, backgroundColor: "#ccd4e3" }}
            onPress={() => this._showPerfil_Emp()}
          >
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ fontSize: 18, textAlign: "center" }}>
                Perfil Profesional
              </Title>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    );
  }

  inf_general_mecanica() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.subtitulo}>Modalidad de Estudio</Text>
          <Text style={styles.text}>
            {this.state.mecanica.modalidad}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Duración de la </Text>
          <Text style={styles.text}>
            {this.state.mecanica.duracion} semestres
          </Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Título que Otorga</Text>
          <Text style={styles.text}>{this.state.mecanica.titulo}</Text>
        </View>
        <View>
          <Text style={styles.subtitulo}>Malla Curricular</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web(
                urls.API_URL_PDF + "/" + this.state.mecanica.malla
              )
            }
          >
            <Text style={styles.text_press}>
              {this.state.mecanica.malla}
            </Text>
          </TouchableOpacity>
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

  campo_mecanica() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.text_mis_vis}>
            {this.state.mecanica.campo}
          </Text>
        </View>
      </ScrollView>
    );
  }

  perfil_mecanica() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.text_mis_vis}>
            {this.state.mecanica.perfil}
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
                <Text style={styles.titulo}>Pregrado Vigente</Text>
              </View>

              <View
                style={{
                  alignSelf: "center",
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <Card
                  style={{ height: 190, width: 300 }}
                  onPress={() => this._showMecanica()}
                >
                  <Card.Cover
                    style={{ height: 150, width: 270, alignSelf: "center" }}
                    source={{
                      uri:
                        urls.API_URL_CAR +
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
                  onDismiss={this._hideMecanica}
                  style={{ flex: 0.6 }}
                >
                  <Dialog.ScrollArea>{this.mecanica()}</Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hideMecanica}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Portal>
                <Dialog
                  visible={this.state.visible_inf_general_emp}
                  onDismiss={this._hideInf_General_Emp}
                  style={{ flex: 0.6 }}
                >
                  <Dialog.Title style={{ textAlign: "center" }}>
                    Información General
                  </Dialog.Title>
                  <Dialog.ScrollArea>
                    {this.inf_general_mecanica()}
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hideInf_General_Emp}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Portal>
                <Dialog
                  visible={this.state.visible_mis_vis_emp}
                  onDismiss={this._hideMis_Vis_Emp}
                  style={{ flex: 0.7 }}
                >
                  <Dialog.Title style={{ textAlign: "center" }}>
                    Misión/Visión
                  </Dialog.Title>
                  <Dialog.ScrollArea>
                    {this.mis_vis_mecanica()}
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hideMis_Vis_Emp}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Portal>
                <Dialog
                  visible={this.state.visible_campo_emp}
                  onDismiss={this._hideCampo_Emp}
                  style={{ flex: 0.7 }}
                >
                  <Dialog.Title style={{ textAlign: "center" }}>
                    Campo Ocupacional
                  </Dialog.Title>
                  <Dialog.ScrollArea>{this.campo_mecanica()}</Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hideCampo_Emp}
                      labelStyle={{ color: "#344a72" }}
                    >
                      Cerrar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Portal>
                <Dialog
                  visible={this.state.visible_perfil_emp}
                  onDismiss={this._hidePerfil_Emp}
                  style={{ flex: 0.7 }}
                >
                  <Dialog.Title style={{ textAlign: "center" }}>
                    Perfil Profesional
                  </Dialog.Title>
                  <Dialog.ScrollArea>
                    {this.perfil_mecanica()}
                  </Dialog.ScrollArea>
                  <Dialog.Actions>
                    <Button
                      onPress={this._hidePerfil_Emp}
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
    textAlign: "center",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
  },
  text_press: {
    fontSize: 17,
    fontFamily: "antic-slab",
    color: "#4d4d4d",
    textAlign: "center",
    textDecorationLine: "underline",
    paddingTop: 14,
    paddingLeft: 5,
    paddingRight: 25,
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

  politicas_calidad: {
    flex: 1,
    marginTop: 5,
    alignSelf: "center",
  },

  titulo: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "#344a72",
  },

  subtitulo: {
    fontSize: 17,
    fontWeight: "bold",
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

export default Asociacion;

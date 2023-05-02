import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import urls from "../../urls";

class Noticias extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      loading: true,
      noticias: null,
      

      url_noticias: urls.API_URL_API + "/noticias",
    };
  }
  componentDidMount = () => {
    Promise.all([
      fetch(this.state.url_noticias),
    ])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then(
        ([
          noticias,
        ]) => {
          this.setState({
            noticias: noticias.datos,
            loading: false,
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }; */
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('urls.API_URL_API + "/noticias",')
      .then(response => response.json())
      .then(data => {
        const ultimasNoticias = data.sort((a, b) => {
          const fechaA = new Date(a.fechaActualizacion);
          const fechaB = new Date(b.fechaActualizacion);
          return fechaB - fechaA; // ordenar por fecha de actualización descendente
        }).slice(0, 10); // obtener las 10 primeras noticias
        setNoticias(ultimasNoticias);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{ uri: item.imagen }}
          style={styles.imagen}
        />
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={noticias}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lista: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 16,
  },
});
export default Noticias;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('http://100.25.182.199/api/noticias')
      .then(response => response.json())
      .then(datos => {
        const ultimasNoticias = datos.sort((a, b) => {
          const fechaA = new Date(a.fechaActualizacion);
          const fechaB = new Date(b.fechaActualizacion);
          return fechaB - fechaA; // ordenar por fecha de actualización descendente
        }).slice(0, 10); // obtener las 10 primeras noticias
        setNoticias(ultimasNoticias);
      })
      .catch(error => console.error(error));
  }, []);

  const renderNoticias = () => {
    return noticias.map((noticia, index) => {
      return (
        <View key={index} style={styles.item}>
          <Image
            source={{ uri: noticia.imagen }}
            style={styles.imagen}
          />
          <Text style={styles.titulo}>{noticia.titulo}</Text>
          <Text style={styles.descripcion}>{noticia.descripcion}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.lista}>
        {renderNoticias()}
      </ScrollView>
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

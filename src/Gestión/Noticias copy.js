import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('http://100.25.182.199/api/noticias')
      .then(response => response.json())
      .then(datos => setNoticias(datos.noticias))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      {noticias.map(noticia => (
        <View key={noticia.id}>
          <Text>{noticia.titulo}</Text>
          {noticia.imagenes.map(imagen => (
            <View key={imagen.id}>
              <Image source={{ uri: imagen.url }} style={{ width: 200, height: 200 }} />
              <Text>{imagen.descripcion}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Noticias;

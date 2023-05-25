import React from 'react';
import { View, Text, Image } from 'react-native';

const NewsItem = ({ title, content, imageUrl }) => {
  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 200 }} />
      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
      <Text style={{ marginTop: 5 }}>{content}</Text>
    </View>
  );
};

export default NewsItem;

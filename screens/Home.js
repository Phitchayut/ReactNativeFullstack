import {View, Text, FlatList, Image ,Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';

const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:5000/api/attractions')
      .then(res => res.json())
      .then(result => {
        setItems(result);
        setIsLoading(false);
      });
  }, [isLoading]);

  const onPressToDetail = (id) => {
    navigation.navigate('Detail' ,{id:id})
  }

  const renderItem = ({item}) => (
    <Pressable onPress={() => onPressToDetail(item.id)}>
    <View>
      <Image
        style={{width: '100%', height: 333}}
        source={{
          uri: item.coverimage,
        }}
      />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20}}>{item.name}</Text>
        <Text>{item.detail}</Text>
      </View>
    </View>
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
    </View>
  );
};

export default Home;

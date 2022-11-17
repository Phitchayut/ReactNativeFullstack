import {View, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const baseUrl = 'http://10.0.2.2:5000/api/attractions/';

const Detail = ({navigation, route}) => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}${route.params.id}`)
      .then(res => res.json())
      .then(result => {
        setItem(result);
        setIsLoading(false);
      });
  }, []);
  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
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
      )}
    </View>
  );
};

export default Detail;

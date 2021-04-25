import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import FoodItem from '../components/FoodItem';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { getData } from '../helpers/storage';

export default function Home() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useFocusEffect(() => {
    getData().then((data) => {
      if (data) setItems(data);
    });
  });
  return (
    <Screen>
      <Header label="In the mood for food?" />
      <Container fill>
        {items.length > 0 && (
          <ScrollView style={{ flex: 1 }}>
            <Container>
              {items.map((item) => (
                <FoodItem
                  key={item}
                  item={item}
                  onPress={() => navigation.navigate('Detail', { item })}
                />
              ))}
            </Container>
          </ScrollView>
        )}
      </Container>
      <Container>
        <Button
          label="add food"
          onPress={() => {
            navigation.navigate('New');
          }}
        />
      </Container>
    </Screen>
  );
}

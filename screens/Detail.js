import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Screen from '../components/Screen';

export default function Detail(props) {
  const navigation = useNavigation();
  const { params } = props.route;
  return (
    <Screen>
      <Header label={params.item.title} />
      <Container fill>
        <ScrollView style={{ flex: 1 }}>
          <Container>
            {params.item.image && (
              <ImagePreview
                source={{
                  uri: params.item.image,
                }}
              />
            )}
          </Container>
        </ScrollView>
      </Container>
      <Container>
        <Button label="go back" onPress={() => navigation.goBack()} />
      </Container>
    </Screen>
  );
}

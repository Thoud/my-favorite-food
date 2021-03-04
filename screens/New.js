import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { addData } from '../helpers/storage';

export default function New() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setImage(pickerResult.uri);
  };

  const save = async () => {
    await addData({ title, image });
    navigation.goBack();
  };

  return (
    <Screen>
      <Header label="What food do you like most?" />
      <Container fill>
        <ScrollView style={{ flex: 1 }}>
          <Container>
            <Input
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="insert Title"
            />
            <Spacer />
            <>
              <ImagePreview
                source={{
                  uri: image,
                }}
              />
              <Spacer />
            </>
            <Button label="select image" onPress={() => selectImage()} />
          </Container>
        </ScrollView>
      </Container>
      <Container>
        <Button
          label="save"
          disabled={title === '' || !image}
          onPress={() => save()}
        />
      </Container>
    </Screen>
  );
}

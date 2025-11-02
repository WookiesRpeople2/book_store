import React, { FC, useState } from 'react';
import { Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from './ui/button';

type Props = {
  value?: string;
  onChange: (uri: string) => void;
};

export const ImageSelecter: FC<Props> = ({ value, onChange }) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-40 h-52 rounded-xl mb-3"
        />
      ) : (
        <View className="w-40 h-52 bg-gray-100 rounded-xl mb-3 items-center justify-center">
          <Button variant={'outline'} onPress={pickImage}>
            <Text>Pick Cover</Text>
          </Button>
        </View>
      )}
      {image && (
        <Button variant={'outline'} onPress={pickImage}>
          <Text>Change Cover</Text>
        </Button>
      )}
    </View>
  );
};

import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  cover: string;
  onPress: () => void;
};

export const BookCard: FC<Props> = ({ name, cover, onPress }) => (
  <Pressable
    className="w-32 m-2"
    onPress={onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.7 : 1,
      transform: [{ scale: pressed ? 0.98 : 1 }]
    })}
  >
    <View className="relative">
      <View className="absolute top-1 left-1 w-full h-48 bg-gray-800 rounded-sm" />

      <View className="relative bg-white rounded-sm overflow-hidden shadow-lg">
        <Image
          source={{ uri: cover }}
          className="w-full h-48"
          resizeMode="cover"
        />

        <View className="absolute inset-0 border border-gray-200/20" />
      </View>

      <View className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/10" />
    </View>

    <View className="mt-3 px-1">
      <Text
        className="text-gray-900 text-sm font-medium leading-tight"
        numberOfLines={2}
      >
        {name}
      </Text>
    </View>
  </Pressable>
);

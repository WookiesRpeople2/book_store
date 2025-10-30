import { ArrowLeft } from "lucide-react-native";
import { FC } from "react";
import { Image, Pressable, View } from "react-native";


type Props = {
  cover: string,
  onBack: () => void;
};

export const BookHero: FC<Props> = ({ cover, onBack }) => (
  <View className="relative">
    <View className="h-96 bg-gray-900">
      <Image
        source={{ uri: cover }}
        className="w-full h-full opacity-30"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-black/40" />

      <Pressable
        onPress={onBack}
        className="absolute top-12 left-6 bg-white/10 backdrop-blur p-3 rounded-full active:bg-white/20"
      >
        <ArrowLeft size={20} color="white" />
      </Pressable>
    </View>

    <View className="absolute bottom-0 left-0 right-0 items-center" style={{ transform: [{ translateY: 80 }] }}>
      <View className="bg-white rounded-lg shadow-2xl overflow-hidden w-48 h-72">
        <Image
          source={{ uri: cover }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
    </View>
  </View>

);

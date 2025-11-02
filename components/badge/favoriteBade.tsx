import { Heart } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

type Props = {
  favorite: boolean;
};

export const FavoriteBage: FC<Props> = ({ favorite }) => favorite && (
  <View className="bg-red-500 rounded-full p-1.5 shadow-md">
    <Heart size={14} color="white" fill="white" />
  </View>

);

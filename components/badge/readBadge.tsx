import { BookOpen } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

type Props = {
  read: boolean;
};

export const ReadBadge: FC<Props> = ({ read }) => read && (
  <View className="bg-green-600 rounded-full p-1.5 shadow-md">
    <BookOpen size={14} color="white" />
  </View>
);

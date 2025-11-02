import { Text, View } from "react-native";
import { Card, CardContent } from "../ui/card";
import { Sparkles } from "lucide-react-native";
import { FC } from "react";

type Props = {
  title: string;
  discription: string;
  about: string;
};

export const BooksHero: FC<Props> = ({ title, discription, about }) => (
  <View className="px-6 pt-12 pb-8">
    <Card className="bg-gradient-to-br from-sky-500 to-indigo-500 border-0">
      <CardContent className="p-6">
        <View className="flex-row items-center mb-3">
          <Sparkles size={32} color="#ffffff" />
          <Text className="text-3xl font-bold text-white ml-3">
            {title}
          </Text>
        </View>
        <Text className="text-base text-white/90 leading-relaxed mb-4">
          {discription}
        </Text>
        <View className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <Text className="text-white text-sm font-medium">
            {about}
          </Text>
        </View>
      </CardContent>
    </Card>
  </View>
);



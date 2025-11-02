import { Text, View } from "react-native";
import { Card, CardContent } from "../ui/card";
import { Sparkles } from "lucide-react-native";
import { FC } from "react";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title: string;
  discription: string;
  about: string;
};

export const BooksHero: FC<Props> = ({ title, discription, about }) => {
  const { isDarkColorScheme } = useTheme();

  const textColor = isDarkColorScheme ? "text-white" : "text-black";
  const textColorMuted = isDarkColorScheme ? "text-white/90" : "text-black/90";
  const aboutBg = isDarkColorScheme ? "bg-white/20" : "bg-black/10";
  const aboutText = isDarkColorScheme ? "text-white" : "text-black";

  return (
    <View className="px-6 pt-12 pb-8">
      <Card className={`${isDarkColorScheme ? "bg-black" : "bg-white"}`}>
        <CardContent className="p-6">
          <View className="flex-row items-center mb-3">
            <Sparkles size={32} color={isDarkColorScheme ? "#ffffff" : "#000000"} />
            <Text className={`text-3xl font-bold ml-3 ${textColor}`}>
              {title}
            </Text>
          </View>
          <Text className={`text-base leading-relaxed mb-4 ${textColorMuted}`}>
            {discription}
          </Text>
          <View className={`${aboutBg} rounded-lg p-3 backdrop-blur-sm`}>
            <Text className={`text-sm font-medium ${aboutText}`}>
              {about}
            </Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}


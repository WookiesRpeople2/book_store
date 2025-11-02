import { Text, View } from "react-native";
import { Badge } from "../ui/badge";
import { FC } from "react";

type Props = {
  theme: string;
};

export const ThemeBadge: FC<Props> = ({ theme }) => theme && (
  <View className="absolute bottom-2">
    <Badge variant={"secondary"}>
      <Text className="text-gray-900 text-xs font-medium" numberOfLines={1}>
        {theme}
      </Text>
    </Badge>
  </View>

);

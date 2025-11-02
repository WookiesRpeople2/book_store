import { FC, PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";
import { Separator } from "./ui/separator";
import { Text } from "./ui/text";
import { useTheme } from "@/hooks/useTheme"; 

type Props = {
  title: string;
  icon?: ReactNode;
  accentColor?: string;
};

export const Header: FC<PropsWithChildren<Props>> = ({
  title,
  icon,
  children,
}) => {
  const { isDarkColorScheme } = useTheme();
  const textColor = isDarkColorScheme ? "text-white" : "text-black";
  const separatorColor = isDarkColorScheme ? "bg-gray-700" : "bg-gray-200";

  return (
    <View className="px-6 mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`text-2xl ${textColor}`}>{title}</Text>
        </View>
        {children}
      </View>
      <Separator className={separatorColor} />
    </View>
  );
};


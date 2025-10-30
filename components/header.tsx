import { FC, PropsWithChildren, ReactNode } from "react";
import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type Props = {
  title: string;
  icon?: ReactNode;
  accentColor?: string;
};

export const Header: FC<PropsWithChildren<Props>> = ({
  title,
  icon,
  children
}) => (
  <View className="px-6 mb-4">
    <View className="flex-row items-center justify-between mb-2">
      <View className="flex-row items-center">
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      </View>
        {children}
    </View>
    <Separator className="bg-gray-200" />
  </View>
);

// {showSeeAll && (
//         <Button
//           variant="ghost"
//           size="sm"
//           onPress={onSeeAllPress}
//           className="flex-row items-center"
//         >
//           <Text className="text-sm text-amber-700 font-medium mr-1">
//             See All
//           </Text>
//           <ChevronRight size={16} color="#b45309" />
//         </Button>
//       )}


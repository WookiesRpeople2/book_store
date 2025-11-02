import { FC, ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  icon: ReactNode;
  iconBgColor: string;
  label: string;
  value?: string;
  customValue?: ReactNode;
  showBorder?: boolean;
};

export const DetailRow: FC<Props> = ({
  icon,
  iconBgColor,
  label,
  value,
  customValue,
  showBorder
}) => (
  <View className={`flex-row items-center gap-4 ${showBorder ? 'pb-6 border-b border-gray-100' : ''}`}>
    <View className={`${iconBgColor} p-3 rounded-xl`}>
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-500 font-medium mb-2">
        {label}
      </Text>
      {customValue ? (
        <View className="mt-7">{customValue}</View>
      ) : (
        <Text className="text-base font-semibold text-gray-900">
          {value}
        </Text>
      )}
    </View>
  </View>
);



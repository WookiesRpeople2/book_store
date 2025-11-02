import { FC } from "react";
import { Text, View } from "react-native";
import { Book, Check, Star, Layers } from "lucide-react-native";

type Props = {
  title: string;
  value: string | number;
  type: "total" | "read" | "favourite" | "rating";
};


export const StatsCard: FC<Props> = ({ title, value, type }) => {
  const getIcon = () => {
    switch (type) {
      case "total":
        return <Layers size={24} color="#2563EB" />;
      case "read":
        return <Check size={24} color="#16A34A" />;
      case "favourite":
        return <Star size={24} color="#F59E0B" />;
      case "rating":
        return <Book size={24} color="#7C3AED" />;
      default:
        return <Book size={24} color="#2563EB" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "total":
        return "bg-blue-100";
      case "read":
        return "bg-green-100";
      case "favourite":
        return "bg-yellow-100";
      case "rating":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <View className={`flex-1 min-w-[140px] max-w-[180px] m-2 p-4 rounded-2xl shadow-lg ${getBgColor()}`}>
      <View className="flex-row items-center mb-3">
        {getIcon()}
        <Text className="ml-3 text-gray-700 font-bold text-sm">{title}</Text>
      </View>
      <Text className="text-2xl font-extrabold text-gray-900">{value}</Text>
    </View>
  );
};


import { Star } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

type Props = {
  rateing: number;
};

export const RatingStars: FC<Props> = ({ rateing }) => rateing > 0 && (
  <View className="flex-row items-center gap-0.5">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={12}
        color={index < rateing ? "#f59e0b" : "#d1d5db"}
        fill={index < rateing ? "#f59e0b" : "none"}
      />
    ))}
  </View>
);

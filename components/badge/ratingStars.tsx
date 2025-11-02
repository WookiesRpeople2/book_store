import { FC } from "react";
import { View } from "react-native";
import { Star } from "lucide-react-native";

interface Props {
  rateing: number;
}

export const RatingStars: FC<Props> = ({ rateing }) => (
  <View className="flex-row items-center gap-0.5">
    {[...Array(5)].map((_, index) => {
      const starValue = index + 1;

      if (rateing >= starValue) {
        return <Star key={index} size={12} color="#f59e0b" fill="#f59e0b" />;
      } else if (rateing >= starValue - 0.5) {
        return (
          <View key={index} style={{ width: 12, height: 12, position: "relative" }}>
            <Star size={12} color="#d1d5db" fill="none" />
            <View style={{ width: 6, overflow: "hidden", position: "absolute", top: 0, left: 0 }}>
              <Star size={12} color="#f59e0b" fill="#f59e0b" />
            </View>
          </View>
        );
      } else {
        return <Star key={index} size={12} color="#d1d5db" fill="none" />;
      }
    })}
  </View>
);


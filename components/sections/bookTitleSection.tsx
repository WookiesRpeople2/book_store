import { FC } from "react";
import { Text, View } from "react-native";
import { RatingStars } from "@/components/badge/ratingStars";

type Props = {
  name: string;
  author: string;
  rating: number;
};

export const BookTitleSection: FC<Props> = ({ name, author, rating }) => {
  return (
    <View className="items-center mb-8">
      <Text className="text-4xl font-bold text-gray-900 text-center mb-3">
        {name}
      </Text>
      <Text className="text-xl text-gray-600 mb-4">
        by {author}
      </Text>
      <RatingStars rateing={rating} />
    </View>
  );
};

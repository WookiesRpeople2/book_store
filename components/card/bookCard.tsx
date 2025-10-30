import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Book } from "@/types";
import { ThemeBadge } from "../badge/themeBadge";
import { ReadBadge } from "../badge/readBadge";
import { FavoriteBage } from "../badge/favoriteBade";
import { RatingStars } from "../badge/ratingStars";

type Props = {
  onPress: () => void;
} & Book;

export const BookCard: FC<Props> = ({
  name,
  author,
  read,
  favorite,
  rating,
  cover,
  theme,
  onPress,
}) => (
  <Pressable className="w-44 m-2" onPress={onPress}>
    <View className="bg-white rounded-sm overflow-hidden shadow-lg h-80 flex flex-col">

      <View className="h-44 flex flex-col">
        <Image
          source={{ uri: cover }}
          className="w-full h-36"
          resizeMode="cover"
        />
        <View className="flex-row gap-2 p-2">
          <FavoriteBage favorite={favorite} />
          <ReadBadge read={read} />
        </View>
      </View>

      <View className="px-1 mt-2">
        <Text
          className="text-gray-900 text-sm font-bold leading-tight mb-1"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text
          className="text-gray-600 text-xs"
          numberOfLines={1}
        >
          {author}
        </Text>
      </View>

      <View className="flex-1" />
      <View className="flex-col space-y-10 px-2">
          <View>
            <RatingStars rateing={rating} />
          </View>
        <View>
          <ThemeBadge theme={theme} />
        </View>
      </View>
    </View>
  </Pressable>
);


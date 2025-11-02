import React from "react";
import { FlatList, TouchableOpacity, Text, View, Pressable } from "react-native";
import { Book } from "@/types";
import { Image } from "../image";

type SearchResultsProps = {
  books: Book[];
  onBookSelect: (book: Book) => void;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ books, onBookSelect }) => {
  if (books.length === 0) {
    return <Text className="text-center text-gray-400 mt-2">No results found.</Text>;
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          className="flex-row items-center py-3 px-2 active:bg-gray-100 rounded-xl"
          onPress={() => onBookSelect(item)}
        >
          <Image
            url={item.cover}
            className="w-12 h-16 rounded-md mr-3 bg-gray-200"
            resizeMode="cover"
          />

          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-sm text-gray-500" numberOfLines={1}>
              {item.author}
            </Text>
          </View>
        </Pressable>)}
      ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
    />
  );
};



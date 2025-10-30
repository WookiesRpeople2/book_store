import { FavoriteBage } from "@/components/badge/favoriteBade";
import { ReadBadge } from "@/components/badge/readBadge";
import { BookDetailsCard } from "@/components/card/bookDetailsCard";
import { BookHero } from "@/components/hero/bookHero";
import { BookTitleSection } from "@/components/sections/bookTitleSection";
import { useBooks } from "@/hooks/books/useBooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Edit, Trash2 } from "lucide-react-native";
import { Text } from "react-native";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";


export default function Index() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const { data, isLoading } = useBooks({ params: [id] });
  const router = useRouter()

  const handleOnBack = () => {
    console.log("back");
  };

  const handleOnDelete = () => {
    console.log("onDelete");
  };

  const handleOnEdit = () => {
    router.push({pathname: "/books/[id]/edit", params:{id}})
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!data) {
    throw new Error("Could not find book");
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <BookHero cover={data.cover} onBack={handleOnBack} />

      <View className="mt-24 px-6 pb-8">
        <View className="flex-row justify-center gap-3 mb-6">
          <FavoriteBage favorite={data.favorite} />
          <ReadBadge read={data.read} />
        </View>
        <BookTitleSection
          name={data.name}
          author={data.author}
          rating={data.rating}
        />
        <BookDetailsCard
          editor={data.editor}
          year={data.year}
          theme={data.theme}
        />
      </View>
<View className="flex-row gap-4">
  <Button
    onPress={handleOnEdit}
    className="flex-1 bg-blue-600 rounded-xl py-4 active:bg-blue-700"
  >
    <View className="flex-row items-center justify-center gap-2">
      <Edit size={20} color="white" />
      <Text className="text-white font-semibold text-base">
        Edit Book
      </Text>
    </View>
  </Button>

  <Button
    onPress={handleOnDelete}
    className="flex-1 bg-red-600 rounded-xl py-4 active:bg-red-700"
  >
    <View className="flex-row items-center justify-center gap-2">
      <Trash2 size={20} color="white" />
      <Text className="text-white font-semibold text-base">
        Delete
      </Text>
    </View>
  </Button>
  </View>
  </ScrollView>
  );
}

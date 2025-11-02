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
import { DeleteAlerte } from "@/components/alert/deleteAlerte";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Toast } from "toastify-react-native";
import { Book, Notes } from "@/types";
import { BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { useOpenLib } from "@/hooks/openLib/useOpenLib";
import { queryClient } from "@/app/_layout";


export default function Index() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const { data: bookData, isLoading: bookLoading, refetch: refetchBooks } = useBooks({ params: [id] });
  const { data: noteData, isLoading: noteLoading, refetch: refetchNotes } = useBooks<Notes[]>({ params: [id, "notes"] });
  const { data: openLibData, isLoading: openLibLoading } = useOpenLib({ params: { title: bookData?.name || '', fields: "edition_count"}, enabled: !!bookData?.name });
  const { mutate: mutateDelete } = useBooks({ method: "DELETE", params: [id], mutationOptions: { onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOOKS_API_BOOK_ENDPOINT] }) } });
  const { mutateAsync: mutateCreate, isPending: isPendingCreate } = useBooks<Notes>({ method: "POST", params: [id, "notes"] });
  const { trigger } = useRefreshOnFocus({
    onRefresh: () => {
      refetchBooks();
      return refetchNotes();
    },
    refetchOnFocus: true,
  });
  const router = useRouter();

  const handleOnBack = () => {
    router.back();
  };

  const handleOnDelete = () => {
    mutateDelete({});
    trigger();

    router.back();
    Toast.show({
      type: "success",
      text1: "book succsesfully deleted",
      text2: "the book has been succsesfully deleted"
    });
  };

  const handleCreate = async (content: string) => {
    await mutateCreate({ content });
    trigger();

    Toast.show({
      type: "success",
      text1: "note succsesfully created",
      text2: "the note has been succsesfully created"
    });
  };

  const handleOnEdit = () => {
    router.push({ pathname: "/books/[id]/edit", params: { id } });
  };

  if (bookLoading || noteLoading || openLibLoading) {
    return <Text>Loading</Text>;
  }

  if (!bookData || !noteData) {
    throw new Error("Could not find book");
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <BookHero cover={bookData.cover} onBack={handleOnBack} />

      <View className="mt-24 px-6 pb-8">
        <View className="flex-row justify-center gap-3 mb-6">
          <FavoriteBage favorite={bookData.favorite} />
          <ReadBadge read={bookData.read} />
        </View>
        <BookTitleSection
          name={bookData.name}
          author={bookData.author}
          rating={bookData.rating}
        />
        <BookDetailsCard
          editor={bookData.editor}
          year={bookData.year}
          theme={bookData.theme}
          notes={noteData}
          numEditions={openLibData ? openLibData.docs.reduce((sum, doc) => sum + (doc.edition_count || 0), 0) : 1}
          handleNoteCreated={handleCreate}
          isPending={isPendingCreate}
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

        <DeleteAlerte buttonText="Delete Book" header="Are you sure you want to delete this book?" description="this action is irriversable and will delete this book forever" continueAction={handleOnDelete} />
      </View>
    </ScrollView>
  );
}

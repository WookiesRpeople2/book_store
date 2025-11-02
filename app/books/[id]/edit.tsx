import { UpdateBookForm } from "@/components/form/updateBookForm";
import { LoadingSpinner } from "@/components/loaders/loadingSpinner";
import { useBooks } from "@/hooks/books/useBooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";
import { Toast } from "toastify-react-native";

export default function EditPage() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const { data, isLoading } = useBooks({ params: [id] });
  const router = useRouter();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    throw new Error("Could not find book");
  }

  return (
    <UpdateBookForm
      book={data}
      onSuccess={() => {
        router.back();
        Toast.show({
          type: "success",
          text1: "book succsesfully updated",
          text2: "the book has been succsesfully updated"
        });
      }}
    />
  );
}

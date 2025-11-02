import { CreateBookForm } from "@/components/form/creatBookForm";
import { LoadingSpinner } from "@/components/loaders/loadingSpinner";
import { useBooks } from "@/hooks/books/useBooks";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Toast } from "toastify-react-native";

export default function EditPage() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const { data, isLoading } = useBooks({ params: [id] });

  if (isLoading) {
    return <LoadingSpinner />;
  }


  if (!data) {
    throw new Error("Could not find book");
  }

  return (
    <CreateBookForm
      onSuccess={() => {
        router.back();
        Toast.show({
          type: "success",
          text1: "book succsesfully created",
          text2: "the book has been succsesfully created"
        });
      }}
    />
  );
}

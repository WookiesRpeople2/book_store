import { UpdateBookForm } from "@/components/form/updateBookForm";
import { useBooks } from "@/hooks/books/useBooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";



export default function EditPage() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const router = useRouter();
  const { data, isLoading } = useBooks({ params: [id] });

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  
  console.log(data)

  if (!data) {
    throw new Error("Could not find book");
  }

  return (
    <UpdateBookForm
      book={data}
      onSuccess={() => {
        router.back();
      }}
    />
  );
}

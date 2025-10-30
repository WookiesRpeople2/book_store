import { CreateBookForm } from "@/components/form/creatBookForm";
import { useBooks } from "@/hooks/books/useBooks";
import { useRouter } from "@/hooks/useRouter";
import { useLocalSearchParams} from "expo-router";
import { Text } from "react-native";

export default function EditPage() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const router = useRouter();
  const { data, isLoading } = useBooks({ params: [id] });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  console.log(data);

  if (!data) {
    throw new Error("Could not find book");
  }

  return (
    <CreateBookForm
      onSuccess={() => {
        router.goBackAndReload();
      }}
    />
  );
}

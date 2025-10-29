import { BookCard } from "@/components/card/bookCard";
import { useBooks } from "@/hooks/books/useBooks";
import { Book } from "@/types";
import { Text, View } from "react-native";

export default function Index() {
  const { data } = useBooks();

  console.log(data);

  return (
    <View>
      {data?.map((x) => <BookCard key={x.id} {...x} onPress={()=>{}} />)}
    </View>
  );
}

import { FC, ReactNode } from "react";
import { View, ScrollView } from "react-native";
import { BookCard } from "@/components/card/bookCard";
import { Book } from "@/types";
import { Header } from "../header";

type BookListSectionProps = {
  title: string;
  books: Book[];
  icon?: ReactNode;
  onBookPress: (book: Book) => void;
};

export const BookListSection: FC<BookListSectionProps> = ({
  title,
  books,
  icon,
  onBookPress,
}) => {
  return (
    <View className="mb-10">
      <Header title={title} icon={icon}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-grow-0 px-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onPress={() => onBookPress(book)}
          />
        ))}
      </ScrollView>
    </View>
  );
};


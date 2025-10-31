import { FloatingAddButton } from "@/components/button/floatingAddButton";
import { BooksHero } from "@/components/hero/booksHero";
import { BookCardSkeleton } from "@/components/loaders/bookCardSkelaton";
import { BookListSection } from "@/components/sections/bookListSection";
import { BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { useBooks } from "@/hooks/books/useBooks";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Book } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { Fragment } from "react";
import { ScrollView} from "react-native";

export default function Index() {
  const { data, isLoading, refetch } = useBooks<Book[]>();
  const queryClient = useQueryClient();
  const router = useRouter()
  useRefreshOnFocus({
    onRefresh: refetch,
    refetchOnFocus: true,
    goBack: false
  });

  const handleBookPress = ({id}: Book) => {
    router.push({pathname:"/books/[id]",  params: {id}})
  };

  if(isLoading){
    return <BookCardSkeleton />
  }

  if(!data){
    throw new Error("Could not fetch data")
  }

  return (
    <>  
    <ScrollView>
        <BooksHero title="Discover your next read" discription="books from every genre" about="”One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.” – Carl Sagan" />
        <BookListSection
          title="All books"
          books={data}
          icon={<TrendingUp size={24} color="#dc2626" />}
          onBookPress={handleBookPress}
        />

        <BookListSection
          title="Favourites"
          books={data.filter((x) => x.favorite)}
          icon={<TrendingUp size={24} color="#dc2626" />}
          onBookPress={handleBookPress}
        />

        <BookListSection
          title="Read"
          books={data.filter((x) => x.read)}
          icon={<TrendingUp size={24} color="#dc2626" />}
          onBookPress={handleBookPress}
        />
      </ScrollView>
      <FloatingAddButton />
      </>
  );
}

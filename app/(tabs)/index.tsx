import { FloatingAddButton } from "@/components/button/floatingAddButton";
import { BooksHero } from "@/components/hero/booksHero";
import { BookCardSkeleton } from "@/components/loaders/bookCardSkelaton";
import { BookFilters } from "@/components/search/bookFilter";
import { SearchBar } from "@/components/search/searchBar";
import { BookListSection } from "@/components/sections/bookListSection";
import { useBookFilters } from "@/hooks/books/useBookFilter";
import { useBooks } from "@/hooks/books/useBooks";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useTheme } from "@/hooks/useTheme";
import { Book } from "@/types";
import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { filter, sort, params, handleFilterChange } = useBookFilters();
  const { data, isLoading, refetch } = useBooks<Book[]>({ params });
  const router = useRouter();
  useRefreshOnFocus({
    onRefresh: refetch,
    refetchOnFocus: true,
  });

  console.log('[INDEX] Query state:', { 
    isLoading, 
    hasData: !!data,
    dataLength: data?.length 
  });

  const handleBookPress = ({ id }: Book) => {
    router.push({ pathname: "/books/[id]", params: { id } });
  };


  if (isLoading) {
    return <BookCardSkeleton />;
  }

  if (!data) {
    throw new Error("Could not fetch data");
  }

  return (
    <>
      <ScrollView>
        <View className="mt-4">
          <View>
            <SearchBar onBookSelect={handleBookPress} />
          </View>

          <View className="mt-4">
            <BookFilters onChange={handleFilterChange} initialFilter={filter} initialSort={sort} />
          </View>
        </View>
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

import { FloatingAddButton } from "@/components/button/floatingAddButton";
import { BooksHero } from "@/components/hero/booksHero";
import { BookCardSkeleton } from "@/components/loaders/bookCardSkelaton";
import { BookListSection } from "@/components/sections/bookListSection";
import { useBooks } from "@/hooks/books/useBooks";
import { useRouter } from "@/hooks/useRouter";
import { Book } from "@/types";
import { TrendingUp } from "lucide-react-native";
import { ScrollView} from "react-native";

export default function Index() {
  const { data, isLoading } = useBooks<Book[]>();
  const router = useRouter()

  const handleBookPress = ({id}: Book) => {
    router.push({pathname:"/books/[id]",  params: {id}})
  };

  if(isLoading){
    return <BookCardSkeleton />
  }

  if(!data){
    throw new Error("Could not fetch data")
  }

  console.log(data)
  

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

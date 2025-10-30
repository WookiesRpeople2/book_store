import { Book } from "@/types";
import { BookFormView } from "./bookFormView";
import { useBooks } from "@/hooks/books/useBooks";

export const UpdateBookForm = ({
  book,
  onSuccess,
}: {
  book: Book;
  onSuccess?: () => void;
}) => {
  const { mutate, isPending } = useBooks({ method: "PUT", params: [book.id], mutationOptions: { onSuccess: () => onSuccess?.() } });

  const handleSubmit = (formData: Partial<Book>) => {
    console.log("formData ", formData)
    mutate({
      ...formData,
      year: formData.year || new Date().getFullYear(),
    });
  };

  return (
    <BookFormView
      title="Update Book"
      buttonText="Update Book"
      buttonColor="bg-green-600"
      initialData={{
        name: book.name,
        author: book.author,
        editor: book.editor,
        year: book.year,
        read: book.read,
        favorite: book.favorite,
        rating: book.rating,
        cover: book.cover,
        theme: book.theme,
      }}
      onSubmit={(value)=>{
      console.log("value", value) 
      handleSubmit(value)
      }}
      isPending={isPending}
    />
  );
}

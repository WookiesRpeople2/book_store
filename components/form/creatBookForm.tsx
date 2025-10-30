import { useBooks } from "@/hooks/books/useBooks";
import { Book } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { BookFormView } from "./bookFormView";

export const CreateBookForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { mutate, isPending } = useBooks({ method: "POST", mutationOptions: { onSuccess: () => onSuccess?.() } });

  const handleSubmit = (formData: Partial<Book>) => {
    mutate({
      ...formData,
      year: formData.year || new Date().getFullYear(),
    });
  };

  return (
    <BookFormView
      title="Create New Book"
      buttonText="Create Book"
      buttonColor="bg-blue-600"
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

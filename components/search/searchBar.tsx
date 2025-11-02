import React, { useState, useMemo, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Book } from "@/types";
import {SearchInput} from "./searchInput";
import {SearchResults} from "./searchResults";
import { useForm } from "@tanstack/react-form";
import { useBooks } from "@/hooks/books/useBooks";

interface SearchBarProps {
  onBookSelect: (book: Book) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onBookSelect }) => {
  const [query, setQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false)
  const [params, setParams] = useState({q: ""})
  const { data } = useBooks<Book[]>({
    params,
    enabled: searchTrigger
  });

  useEffect(() => {
    setParams({q: query})
  }, [query]);

  return (
    <View className="w-full flex flex-col space-y-3">
      <SearchInput query={query} onChange={setQuery} setSearchTrigger={setSearchTrigger} />
      {query.length > 0 && data && (
        <SearchResults books={data} onBookSelect={onBookSelect} />
      )}
    </View>
  );
};


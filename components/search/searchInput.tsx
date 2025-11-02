import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchInputProps = {
  query: string;
  onChange: (value: string) => void;
  setSearchTrigger: (value: boolean)=>void
}

export const SearchInput: React.FC<SearchInputProps> = ({ query, onChange, setSearchTrigger}) => {
  return (
    <Pressable className="flex-row items-center bg-white border border-gray-300 rounded-2xl px-3 py-2 shadow-sm" onPress={()=>setSearchTrigger(true)}>
      <Ionicons name="search-outline" size={18} color="#6b7280" />
      <TextInput
        className="flex-1 ml-2 text-base text-gray-800"
        placeholder="Search by title or author..."
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={onChange}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </Pressable>
  );
};



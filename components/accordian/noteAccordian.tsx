import { Notes } from "@/types";
import { StickyNote } from "lucide-react-native";
import { FC } from "react";
import { Text, View } from "react-native";
import { Accordion } from "../ui/accordion";
import { NoteItem } from "./noteItem";

type Props = {
  notes: Notes[];
};

export const NotesAccordion: FC<Props> = ({ notes }) => {
  const title = "Content";

  if (!notes || notes.length === 0) {
    return (
      <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <Text className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
          {title}
        </Text>
        <View className="items-center py-8">
          <View className="bg-gray-100 rounded-full p-4 mb-3">
            <StickyNote size={32} color="#9CA3AF" />
          </View>
          <Text className="text-gray-500 text-sm">No notes yet</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          {title}
        </Text>
        <View className="bg-indigo-100 rounded-full px-3 py-1">
          <Text className="text-xs font-semibold text-indigo-600">
            {notes.length}
          </Text>
        </View>
      </View>

      <Accordion type="multiple" collapsible className="w-full">
        {notes.map((note, index) => (
          <NoteItem
            key={`${note.bookId}-${index}`}
            note={note}
            index={index}
          />
        ))}
      </Accordion>
    </View>
  );
};

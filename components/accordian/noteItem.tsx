import { Notes } from "@/types";
import { FC } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Text, View } from "react-native";
import { Calendar, StickyNote } from "lucide-react-native";

type Props = {
  note: Notes;
  index: number;
};

export const NoteItem: FC<Props> = ({ note, index }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <AccordionItem value={`note-${index}`} className="mb-3">
      <AccordionTrigger className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <View className="flex-row items-center flex-1">
          <View className="bg-indigo-100 rounded-full p-2 mr-3">
            <StickyNote size={20} color="#6366F1" />
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800 mb-1">
              Note {index + 1}
            </Text>
            <View className="flex-row items-center">
              <Calendar size={14} color="#9333EA" />
              <Text className="text-xs text-gray-600 ml-1">
                {formatDate(note.dateISO)}
              </Text>
            </View>
          </View>
        </View>
      </AccordionTrigger>

      <AccordionContent className="bg-white rounded-xl mt-2 p-4 border border-gray-200 shadow-sm">
        <Text className="text-sm text-gray-700 leading-6">
          {note.content}
        </Text>
      </AccordionContent>
    </AccordionItem>
  );
};

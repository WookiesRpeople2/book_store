import { FC } from "react";
import { Text, View } from "react-native";
import { Calendar, Building2, BookOpen, ClipboardList } from "lucide-react-native";
import { ThemeBadge } from "@/components/badge/themeBadge";
import { DetailRow } from "../detailrow";
import { NotesAccordion } from "../accordian/noteAccordian";
import { Notes } from "@/types";

type Props = {
  editor: string;
  year: number;
  theme: string;
  notes: Notes[];
  numEditions: number;
  handleNoteCreated?: (noteText: string) => void;
  isPending?: boolean;
};

export const BookDetailsCard: FC<Props> = ({ editor, year, theme, notes, numEditions, handleNoteCreated, isPending }) => {
  return (
    <View>
      <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <Text className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">
          Book Details
        </Text>

        <View className="gap-6">
          <DetailRow
            icon={<Building2 size={22} color="#3B82F6" />}
            iconBgColor="bg-blue-50"
            label="Publisher"
            value={editor}
            showBorder
          />

          <DetailRow
            icon={<Calendar size={22} color="#9333EA" />}
            iconBgColor="bg-purple-50"
            label="Publication Year"
            value={year.toString()}
            showBorder
          />

          <DetailRow
            icon={<BookOpen size={22} color="#6366F1" />}
            iconBgColor="bg-indigo-50"
            label="Genre"
            customValue={<ThemeBadge theme={theme} />}
            showBorder
          />

          <DetailRow
            icon={<ClipboardList size={22} color="#14B8A6" />}
            iconBgColor="bg-teal-50"
            label="Number of editions"
            value={numEditions.toString()}
          />
        </View>
      </View>
      <NotesAccordion notes={notes} handleNoteCreated={handleNoteCreated} isPending={isPending} />
    </View>
  );
};

import { Notes } from "@/types";
import { StickyNote } from "lucide-react-native";
import { FC, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Accordion } from "../ui/accordion";
import { NoteItem } from "./noteItem";
import { NoteForm } from "../form/noteForm";

type Props = {
  notes: Notes[];
  handleNoteCreated?: (noteText: string) => void;
  isPending?: boolean;
};

export const NotesAccordion: FC<Props> = ({ notes, handleNoteCreated, isPending = false }) => {
  const title = "Content";
  const [showForm, setShowForm] = useState(false);

  if (!notes || notes.length === 0) {
    return (
      <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            {title}
          </Text>
        </View>
        
        <View className="items-center py-8">
          <View className="bg-gray-100 rounded-full p-4 mb-3">
            <StickyNote size={32} color="#9CA3AF" />
          </View>
          <Text className="text-gray-500 text-sm">No notes yet</Text>
        </View>

        {handleNoteCreated && (
          <>
            {showForm ? (
              isPending ? (
                <View className="items-center py-4">
                  <Text className="text-gray-500 text-sm">Creating note...</Text>
                </View>
              ) : (
                <NoteForm
                  onSubmit={(noteText) => {
                    handleNoteCreated(noteText);
                    setShowForm(false);
                  }}
                  isSubmitting={isPending}
                />
              )
            ) : (
              <Pressable
                onPress={() => setShowForm(true)} 
                className="bg-indigo-600 rounded-full w-12 h-12 items-center justify-center self-center mt-4"
                disabled={isPending}
              >
                <Text className="text-white text-2xl font-bold">+</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    );
  }

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

      {handleNoteCreated && (
        <>
          {showForm ? (
            isPending ? (
              <View className="items-center py-4 mt-4">
                <Text className="text-gray-500 text-sm">Creating note...</Text>
              </View>
            ) : (
              <View className="mt-4">
                <NoteForm
                  onSubmit={(noteText) => {
                    handleNoteCreated(noteText);
                    setShowForm(false);
                  }}
                  isSubmitting={isPending}
                />
              </View>
            )
          ) : (
            <Pressable
              onPress={() => setShowForm(true)}
              className="bg-indigo-600 rounded-full w-12 h-12 items-center justify-center self-center mt-4"
              disabled={isPending}
            >
              <Text className="text-white text-2xl font-bold">+</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

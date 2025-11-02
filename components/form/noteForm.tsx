import { useForm } from '@tanstack/react-form';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { FC } from 'react';

type CreateNoteFormProps = {
  onSubmit: (noteText: string) => void;
  isSubmitting?: boolean
}

export const NoteForm: FC<CreateNoteFormProps> = ({ onSubmit, isSubmitting }) => {
  const form = useForm({
    defaultValues: {
      noteText: '',
    },
    onSubmit: async ({ value }) => {
      if (value.noteText.trim()) {
        onSubmit(value.noteText);
      }
    },
  });

  return (
    <View className="mb-4">
      <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
      <form.Field
        name="noteText"
        children={(field) => (
          <TextInput
            className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200"
            placeholder="Write your note..."
            value={field.state.value}
            onChangeText={field.handleChange}
            multiline
            autoFocus
            editable={!isSubmitting}
          />
        )}
      />
      <View className="flex-row gap-2">
        <Pressable
          onPress={form.handleSubmit}
          className="bg-indigo-600 rounded-lg px-4 py-2 flex-1"
          disabled={isSubmitting}
        >
          <Text className="text-white text-center font-semibold">{isSubmitting ? 'Saving...' : 'Save'}</Text>
        </Pressable>
      </View>
      </form>
    </View>
  );
};

import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Switch } from 'react-native';
import { useForm } from '@tanstack/react-form';
import {DraggableStarRating} from './fields/draggableStars';
import type { Book } from '@/types';
import {FieldInfo} from './fields/fieldInfo'; 
import { ImageSelecter } from '../imagePicker';


export const BookFormView = ({
  title,
  buttonText,
  buttonColor,
  initialData = {
    name: '',
    author: '',
    editor: '',
    year: new Date().getFullYear(),
    read: false,
    favorite: false,
    rating: 0,
    cover: '',
    theme: '',
  },
  onSubmit,
  isPending,
}: {
  title: string;
  buttonText: string;
  buttonColor: string;
  initialData?: Partial<Book>;
  onSubmit: (data: Partial<Book>) => void;
  isPending: boolean;
}) => {
  const form = useForm({
    defaultValues: initialData,
    onSubmit: ({value}) => onSubmit(value)
    
  });

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
      <Text className="text-2xl font-bold mb-6">{title}</Text>
      
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? 'Book name is required' : undefined),
        }}
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Book Name *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter book name"
            />
            <FieldInfo field={field} />
          </View>
        )}
      />

      <form.Field
        name="author"
        validators={{
          onChange: ({ value }) => (!value ? 'Author is required' : undefined),
        }}
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Author *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter author name"
            />
            <FieldInfo field={field} />
          </View>
        )}
      />

      <form.Field
        name="editor"
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Editor</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter editor name"
            />
          </View>
        )}
      />

      <form.Field
        name="year"
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Year</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={field.state.value?.toString()}
              onChangeText={(text) => field.handleChange(parseInt(text) || 0)}
              onBlur={field.handleBlur}
              placeholder="Enter publication year"
              keyboardType="numeric"
            />
          </View>
        )}
      />

      <form.Field
        name="cover"
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Cover URL</Text>
              <ImageSelecter value={field.state.value} onChange={field.handleChange}/>
            </View>
        )}
      />

      <form.Field
        name="theme"
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Theme</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter book theme"
            />
          </View>
        )}
      />

      <form.Field
        name="rating"
        children={(field) => (
          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Rating (Drag or Tap)</Text>
            <DraggableStarRating rating={field.state.value ?? 0} onRatingChange={field.handleChange} />
          </View>
        )}
      />

      <View className="flex-row justify-between mb-4">
        <form.Field
          name="read"
          children={(field) => (
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold mr-3">Read</Text>
              <Switch value={field.state.value ?? false} onValueChange={field.handleChange} />
            </View>
          )}
        />
        <form.Field
          name="favorite"
          children={(field) => (
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold mr-3">Favorite</Text>
              <Switch value={field.state.value ?? false} onValueChange={field.handleChange} />
            </View>
          )}
        />
      </View>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Pressable
            className={`${buttonColor} rounded-lg p-4 items-center mt-4`}
            onPress={form.handleSubmit}
            disabled={!canSubmit || isPending}
          >
            <Text className="text-white font-bold text-base">
              {isSubmitting || isPending ? 'Loading...' : buttonText}
            </Text>
          </Pressable>
        )}
      />
      </form>
    </ScrollView>
  );
};


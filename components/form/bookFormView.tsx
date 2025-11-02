import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Switch } from 'react-native';
import { useForm } from '@tanstack/react-form';
import { DraggableStarRating } from './fields/draggableStars';
import type { Book } from '@/types';
import { FieldInfo } from './fields/fieldInfo';
import { ImageSelecter } from '../imagePicker';
import { useTheme } from '@/hooks/useTheme';
import { Form } from './Form';




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
    onSubmit: ({ value }) => onSubmit(value),
  });

  const { isDarkColorScheme } = useTheme();
  const textColor = isDarkColorScheme ? 'text-white' : 'text-black';
  const inputBorderColor = isDarkColorScheme ? 'border-gray-600' : 'border-gray-300';
  const inputBgColor = isDarkColorScheme ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <ScrollView className={`flex-1 p-4 ${isDarkColorScheme ? 'bg-black' : 'bg-white'}`}>
      <Text className={`text-2xl font-bold mb-6 ${textColor}`}>{title}</Text>
      <Form onSubmit={form.handleSubmit}>
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? 'Book name is required' : undefined),
        }}
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Book Name *</Text>
            <TextInput
              className={`border rounded-lg p-3 text-base ${inputBgColor} ${inputBorderColor}`}
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter book name"
              placeholderTextColor={isDarkColorScheme ? '#aaa' : '#666'}
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
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Author *</Text>
            <TextInput
              className={`border rounded-lg p-3 text-base ${inputBgColor} ${inputBorderColor}`}
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter author name"
              placeholderTextColor={isDarkColorScheme ? '#aaa' : '#666'}
            />
            <FieldInfo field={field} />
          </View>
        )}
      />

      <form.Field
        name="editor"
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Editor</Text>
            <TextInput
              className={`border rounded-lg p-3 text-base ${inputBgColor} ${inputBorderColor}`}
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter editor name"
              placeholderTextColor={isDarkColorScheme ? '#aaa' : '#666'}
            />
          </View>
        )}
      />

      <form.Field
        name="year"
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Year</Text>
            <TextInput
              className={`border rounded-lg p-3 text-base ${inputBgColor} ${inputBorderColor}`}
              value={field.state.value?.toString()}
              onChangeText={(text) => field.handleChange(parseInt(text) || 0)}
              onBlur={field.handleBlur}
              placeholder="Enter publication year"
              keyboardType="numeric"
              placeholderTextColor={isDarkColorScheme ? '#aaa' : '#666'}
            />
          </View>
        )}
      />

      <form.Field
        name="cover"
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Cover URL</Text>
            <ImageSelecter value={field.state.value} onChange={field.handleChange} />
          </View>
        )}
      />

      <form.Field
        name="theme"
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Theme</Text>
            <TextInput
              className={`border rounded-lg p-3 text-base ${inputBgColor} ${inputBorderColor}`}
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              placeholder="Enter book theme"
              placeholderTextColor={isDarkColorScheme ? '#aaa' : '#666'}
            />
          </View>
        )}
      />

      <form.Field
        name="rating"
        children={(field) => (
          <View className="mb-4">
            <Text className={`text-sm font-semibold mb-2 ${textColor}`}>Rating (Drag or Tap)</Text>
            <DraggableStarRating rating={field.state.value ?? 0} onRatingChange={field.handleChange} />
          </View>
        )}
      />

      <View className="flex-row justify-between mb-4">
        <form.Field
          name="read"
          children={(field) => (
            <View className="flex-row items-center">
              <Text className={`text-sm font-semibold mr-3 ${textColor}`}>Read</Text>
              <Switch value={field.state.value ?? false} onValueChange={field.handleChange} />
            </View>
          )}
        />
        <form.Field
          name="favorite"
          children={(field) => (
            <View className="flex-row items-center">
              <Text className={`text-sm font-semibold mr-3 ${textColor}`}>Favorite</Text>
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
      </Form>
    </ScrollView >
  );
};


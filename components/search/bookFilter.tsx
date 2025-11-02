import React, { FC } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "@tanstack/react-form";
import { FilterType, SortType } from "@/types";
import { Form } from "../form/Form";


type Props = {
  onChange: (filters: { filter: FilterType; sort: SortType; }) => void;
  initialFilter?: FilterType;
  initialSort?: SortType;
};

export const BookFilters: FC<Props> = ({ onChange, initialFilter = "all", initialSort = "title" }) => {
  const form = useForm({
    defaultValues: {
      filter: initialFilter,
      sort: initialSort,
    },
    onSubmit: ({ value }) => {
      onChange(value);
    },
  });

  return (
    <View className="px-4 py-2 bg-white rounded-2xl shadow-sm mb-3">
      <Form onSubmit={form.handleSubmit}>
      <form.Field
        name="filter"
        children={(field) => (
          <View className="flex-row justify-between mb-2">
            {[
              { label: "all", value: "all" },
              { label: "read", value: "read" },
              { label: "unread", value: "unread" },
              { label: "favorite", value: "favorite" },
            ].map((item) => (
              <Pressable
                key={item.value}
                onPress={() => {
                  field.handleChange(item.value as FilterType);
                  form.handleSubmit();
                }}
              >
                <Text
                  className={`text-sm ${field.state.value === item.value
                    ? "font-bold text-red-600"
                    : "text-gray-600"
                    }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      <form.Field
        name="sort"
        children={(field) => (
          <Picker
            selectedValue={field.state.value}
            style={{ width: 160 }}
            onValueChange={(value: SortType) => {
              field.handleChange(value);
              form.handleSubmit();
            }}
          >
            <Picker.Item label="Titre" value="title" />
            <Picker.Item label="Auteur" value="author" />
            <Picker.Item label="Thème" value="theme" />
          </Picker>
        )}
      />
      </Form>
    </View>

  );
}


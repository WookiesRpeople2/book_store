import { PanResponder, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ComponentProps, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const DraggableStarRating = ({
  rating,
  onRatingChange,
  maxStars = 5,
  starSize = 32,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
  starSize?: number;
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => updateRatingFromPosition(evt.nativeEvent.locationX),
      onPanResponderMove: (evt) => updateRatingFromPosition(evt.nativeEvent.locationX),
    })
  ).current;

  const updateRatingFromPosition = (x: number) => {
    let newRating = x / starSize;
    newRating = Math.min(maxStars, Math.max(0, Math.round(newRating * 2) / 2));
    onRatingChange(newRating);
  };

  return (
    <View {...panResponder.panHandlers} style={{ flexDirection: 'row', paddingVertical: 8 }}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starNumber = i + 1;
        let iconName: ComponentProps<typeof Ionicons>['name']  = 'star-outline';

        if (rating >= starNumber) {
          iconName = 'star';
        } else if (rating + 0.5 >= starNumber) {
          iconName = 'star-half';
        }

        return (
          <TouchableOpacity
            key={i}
            onPress={() => onRatingChange(starNumber)}
            style={{ marginRight: 6 }}
          >
            <Ionicons name={iconName} size={starSize} color="#FFD700" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


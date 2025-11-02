import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";

export const BookCardSkeleton = () => (
  <View className="w-32 m-2">
    <View className="relative">
      <Skeleton className="w-full h-48 rounded-sm" />

      <View className="absolute inset-0 border border-gray-200/20 rounded-sm" />

      <View className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/10" />
    </View>

    <View className="mt-3 px-1 space-y-1">
      <Skeleton className="w-full h-4 rounded" />
      <Skeleton className="w-3/4 h-4 rounded" />
    </View>
  </View>
);

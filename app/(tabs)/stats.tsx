import { StatsCard } from "@/components/card/statsCard";
import { StatsChart } from "@/components/chart/statChart";
import { LoadingSpinner } from "@/components/loaders/loadingSpinner";
import { useStats } from "@/hooks/stats/useStats";
import { ScrollView, Text, View } from "react-native";

export default function Stats() {
  const { data, isLoading } = useStats();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    throw new Error("Could not find book");
  }

  const nonReadCount = data.totalBooks - data.readCount;
  const totalBooksX = Array.from({ length: data.totalBooks }, (_, i) => i + 1);
  const totalBooksY = totalBooksX.map(x => x);
  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-6 bg-white rounded-md">
        Book Dashboard
      </Text>

      <View className="flex-row flex-wrap justify-center mb-6">
        <StatsCard title="Total Books" value={data.totalBooks} type="total" />
        <StatsCard title="Read Books" value={data.readCount} type="read" />
        <StatsCard title="Favourites" value={data.favoritesCount} type="favourite" />
        <StatsCard title="Average Rating" value={data.averageRating.toFixed(1)} type="rating" />
      </View>

      <View className="flex-wrap items-center justify-center">
        <StatsChart
          title="Books Read vs Not Read"
          labels={["Read", "Not Read"]}
          values={[data.readCount, nonReadCount]}
          type="pie"
        />

        <StatsChart
          title="Favourites Progress"
          labels={["Favourites"]}
          values={[data.favoritesCount]}
          type="progress"
          maxValue={data.totalBooks}
        />

        <StatsChart
          title="Average Rating"
          labels={["Rating"]}
          values={[data.averageRating]}
          type="progress"
          maxValue={5}
        />

        <StatsChart
          title="Total Books Over Time"
          labels={totalBooksX.map(x => x.toString())}
          values={totalBooksY}
          type="line"
          color="#2563EB"
        />

      </View>
    </ScrollView>
  );
}

import { FC } from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

type ChartType = "bar" | "line" | "pie" | "progress";

type StatsChartProps = {
  title: string;
  labels?: string[];
  values: number[];
  type?: ChartType;
  color?: string;
  maxValue?: number;
};

export const StatsChart: FC<StatsChartProps> = ({
  title,
  labels = [],
  values,
  type = "bar",
  color = "#2563EB",
  maxValue = 100,
}) => {
  const width = Dimensions.get("window").width * 0.9;
  const height = 220;

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => color,
    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#fff" },
  };

  return (
    <View className="m-3 bg-white p-4 rounded-2xl shadow-md">
      <Text className="text-lg font-bold mb-3">{title}</Text>

      {type === "bar" && (
        <BarChart
          data={{ labels: labels.length ? labels : values.map((_, i) => ""), datasets: [{ data: values }] }}
          width={width}
          height={height}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={{ borderRadius: 16 }}
        />
      )}

      {type === "line" && (
        <LineChart
          data={{ labels: labels.length ? labels : values.map(() => ""), datasets: [{ data: values }] }}
          width={width}
          height={height}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          bezier={false}
          withDots={true}
          withVerticalLabels={false} // hide labels
          withHorizontalLabels={true}
          style={{ borderRadius: 16 }}
        />
      )}

      {type === "pie" && (
        <PieChart
          data={labels.map((label, i) => ({
            name: label,
            population: values[i],
            color: ["#2563EB", "#16A34A", "#F59E0B", "#7C3AED"][i % 4],
            legendFontColor: "#000",
            legendFontSize: 14,
          }))}
          width={width}
          height={height}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      {type === "progress" && (
        <View className="flex-1 justify-center items-center" style={{ width, height }}>
          <Text className="text-4xl font-extrabold text-gray-800">
            {values[0]} / {maxValue}
          </Text>
          <View className="w-full bg-gray-200 rounded-full h-6 mt-4">
            <View
              className="bg-green-400 h-6 rounded-full"
              style={{ width: `${(values[0] / maxValue) * 100}%` }}
            />
          </View>
        </View>
      )}
    </View>
  );
};


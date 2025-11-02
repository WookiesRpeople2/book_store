import { FC } from "react";
import { View, Text, Dimensions } from "react-native";

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
  const chartHeight = 220;
  const pieColors = ["#2563EB", "#16A34A", "#F59E0B", "#7C3AED"];

  const dataMax = Math.max(...values, 1);

  const renderBarChart = () => {
    const graphHeight = 160;

    return (
      <View className="items-center">
        <View className="flex-row items-end justify-center gap-5" style={{ height: graphHeight }}>
          {values.map((value, i) => {
            const barHeight = (value / dataMax) * (graphHeight - 20);
            return (
              <View key={i} className="items-center">
                <View className="items-center justify-end">
                  <Text className="text-xs font-semibold mb-1">{value}</Text>
                  <View
                    className="rounded mt-1"
                    style={{
                      height: barHeight,
                      width: 40,
                      backgroundColor: color,
                    }}
                  />
                </View>
                {labels[i] && (
                  <Text className="text-[11px] mt-2 text-gray-600">{labels[i]}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderLineChart = () => {
    const graphHeight = 160;
    const padding = 20;
    const usableHeight = graphHeight - padding * 2;
    const screenWidth = Dimensions.get("window").width;
    const graphWidth = screenWidth - 120; // More space for padding
    const pointSpacing = values.length > 1 ? graphWidth / (values.length - 1) : graphWidth / 2;

    return (
      <View className="items-center w-full px-4">
        <View className="w-full" style={{ height: graphHeight }}>
          {/* Y-axis labels */}
          <View className="absolute left-0 h-full justify-between py-5">
            <Text className="text-[10px] text-gray-500">{dataMax}</Text>
            <Text className="text-[10px] text-gray-500">{Math.round(dataMax / 2)}</Text>
            <Text className="text-[10px] text-gray-500">0</Text>
          </View>

          {/* Graph area */}
          <View className="ml-8 relative" style={{ height: graphHeight }}>
            {/* Grid lines */}
            <View className="absolute w-full border-b border-gray-200" style={{ top: padding }} />
            <View className="absolute w-full border-b border-gray-200" style={{ top: graphHeight / 2 }} />
            <View className="absolute w-full border-b border-gray-200" style={{ bottom: padding }} />

            {/* Line segments with proper angles */}
            {values.map((value, i) => {
              if (i >= values.length - 1) return null;

              const y1 = padding + (1 - value / dataMax) * usableHeight;
              const y2 = padding + (1 - values[i + 1] / dataMax) * usableHeight;
              const x1 = i * pointSpacing;
              const x2 = (i + 1) * pointSpacing;

              const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

              return (
                <View
                  key={`line-${i}`}
                  className="absolute origin-left"
                  style={{
                    left: x1,
                    top: y1,
                    width: length,
                    height: 3,
                    backgroundColor: color,
                    transform: [{ rotate: `${angle}deg` }],
                  }}
                />
              );
            })}

            {/* Data points and labels */}
            {values.map((value, i) => {
              const y = padding + (1 - value / dataMax) * usableHeight;
              const x = i * pointSpacing;

              return (
                <View key={`point-${i}`}>
                  {/* Point */}
                  <View
                    className="absolute w-3 h-3 rounded-full border-2 border-white"
                    style={{
                      left: x - 6,
                      top: y - 6,
                      backgroundColor: color,
                    }}
                  />
                  {/* Value label */}
                  <Text
                    className="absolute text-xs font-semibold"
                    style={{
                      left: x - 15,
                      top: y - 28,
                      color: color,
                      width: 30,
                      textAlign: 'center'
                    }}
                  >
                    {value}
                  </Text>
                  {/* X-axis label */}
                  {labels[i] && (
                    <Text
                      className="absolute text-[10px] text-gray-600"
                      style={{
                        left: x - 20,
                        top: graphHeight - 15,
                        width: 40,
                        textAlign: 'center'
                      }}
                    >
                      {labels[i]}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderPieChart = () => {
    const total = values.reduce((sum, val) => sum + val, 0);

    return (
      <View className="items-center">
        <View className="items-start justify-center">
          {values.map((value, i) => {
            const percentage = (value / total) * 100;
            return (
              <View key={i} className="flex-row items-center my-1">
                <View
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: pieColors[i % pieColors.length] }}
                />
                <Text className="text-[13px] text-gray-800">
                  {labels[i]}: {value} ({percentage.toFixed(1)}%)
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderProgress = () => {
    const percentage = (values[0] / maxValue) * 100;

    return (
      <View className="justify-center items-center" style={{ height: chartHeight }}>
        <Text className="text-4xl font-extrabold text-gray-800 mb-4">
          {values[0]} / {maxValue}
        </Text>
        <View className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="m-3 bg-white p-4 rounded-2xl shadow-md">
      <Text className="text-lg font-bold mb-3">{title}</Text>
      {type === "bar" && renderBarChart()}
      {type === "line" && renderLineChart()}
      {type === "pie" && renderPieChart()}
      {type === "progress" && renderProgress()}
    </View>
  );
};

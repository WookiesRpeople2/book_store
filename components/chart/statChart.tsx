import { FC } from "react";
import {
  BarChart as ReBarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const width = "100%";
  const height = 220;

  const data =
    labels.length > 0
      ? labels.map((label, i) => ({ label, value: values[i] }))
      : values.map((v, i) => ({ label: "", value: v }));

  const pieData = labels.map((label, i) => ({
    name: label,
    value: values[i],
  }));

  const pieColors = ["#2563EB", "#16A34A", "#F59E0B", "#7C3AED"];

  return (
    <div className="m-3 bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      {type === "bar" && (
        <ResponsiveContainer width={width} height={height}>
          <ReBarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </ReBarChart>
        </ResponsiveContainer>
      )}

      {type === "line" && (
        <ResponsiveContainer width={width} height={height}>
          <ReLineChart data={data}>
            <XAxis dataKey="label" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              dot={{ r: 4 }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      )}

      {type === "pie" && (
        <ResponsiveContainer width={width} height={height}>
          <RePieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={pieColors[i % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      )}

      {type === "progress" && (
        <div className="flex flex-col justify-center items-center" style={{ height }}>
          <p className="text-4xl font-extrabold text-gray-800">
            {values[0]} / {maxValue}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-6 mt-4">
            <div
              className="bg-green-400 h-6 rounded-full"
              style={{ width: `${(values[0] / maxValue) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};


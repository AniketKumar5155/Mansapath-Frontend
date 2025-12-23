import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useMemo } from "react";
import useFormStore from "../store/formStore";

const COLORS = [
  "#3B82F6", "#FACC15", "#22C55E", "#EF4444", "#8B5CF6", "#10B981", "#F472B6"
];

const SubmissionCategoryDonutChart = () => {
  const { getAllAcceptedSubmissions, acceptedSubmissions } = useFormStore();

  useEffect(() => {
    getAllAcceptedSubmissions();
  }, []);

  const chartData = useMemo(() => {
    const categoryCounts = {};

    acceptedSubmissions?.forEach((item) => {
      const category = item?.category || "Unknown";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.keys(categoryCounts).map((key) => ({
      name: key,
      value: categoryCounts[key],
    }));
  }, [acceptedSubmissions]);

  return (
    <div className="w-full h-70 flex justify-center items-center p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            // labelLine={{ strokeDasharray: "0" }}
            // label={({ name, value }) => `${name}: ${value}`}
            data={chartData}
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            stroke="#fff"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold fill-gray-800"
          >
            {acceptedSubmissions?.length || 0}
          </text>

          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm fill-gray-500"
          >
            Total
          </text>

          <Tooltip cursor={false} formatter={(value) => [`${value}`, "Count"]} />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={12}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionCategoryDonutChart;

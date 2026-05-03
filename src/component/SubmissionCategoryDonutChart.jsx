import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import useFormStore from "../store/formStore";

const COLORS = [
  "#3B82F6", "#FACC15", "#22C55E", "#EF4444", "#8B5CF6", "#10B981", "#F472B6"
];

const SubmissionCategoryDonutChart = () => {
  const { allSubmissions } = useFormStore();

  const chartData = useMemo(() => {
    const categoryCounts = {};

    allSubmissions?.forEach((item) => {
      const category = item?.category || "Unknown";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.keys(categoryCounts).map((key) => ({
      name: key,
      value: categoryCounts[key],
    }));
  }, [allSubmissions]);

  return (
    <div className="h-[260px] w-full sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius="58%"
            outerRadius="76%"
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
            {allSubmissions?.length || 0}
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
            wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionCategoryDonutChart;

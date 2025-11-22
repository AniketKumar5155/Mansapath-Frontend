import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useMemo } from "react";
import useFormStore from "../store/formStore";

const COLORS = ["#3B82F6", "#FACC15", "#22C55E"];

const SubmissionStatusDonutChart = () => {
  const { allSubmissions, getAllSubmissions } = useFormStore();

  useEffect(() => {
    getAllSubmissions();
  }, []);


  const chartData = useMemo(() => {
    const statusCounts = { OPEN: 0, PENDING: 0, CLOSED: 0 };

    allSubmissions?.forEach((item) => {
      const s = item?.status?.toUpperCase();
      if (statusCounts[s] !== undefined) statusCounts[s] += 1;
    });

    return [
      { name: "Open", value: statusCounts.OPEN },
      { name: "Pending", value: statusCounts.PENDING },
      { name: "Closed", value: statusCounts.CLOSED },
    ];
  }, [allSubmissions]);

  return (
    <div className="w-full h-70 flex justify-center items-center p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            labelLine={{ strokeDasharray: "0" }}
            label={({ name, value }) => `${name}: ${value}`}
            data={chartData}
            innerRadius="55%"
            outerRadius="75%"
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            stroke="#fff"
            strokeWidth={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
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
            wrapperStyle={{ paddingTop: "15px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionStatusDonutChart;

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import useFormStore from "../store/formStore";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const STATUS_LABELS = {
  ENROLLED: "Enrolled",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

const SubmissionStatusDonutChart = () => {
  const { allSubmissions } = useFormStore();

  const chartData = useMemo(() => {
    const statusCounts = { ENROLLED: 0, PENDING: 0, REJECTED: 0 };

    allSubmissions?.forEach((item) => {
      const s = item?.status?.toUpperCase();
      if (statusCounts[s] !== undefined) statusCounts[s] += 1;
    });

    return [
      { name: STATUS_LABELS.ENROLLED, value: statusCounts.ENROLLED },
      { name: STATUS_LABELS.PENDING, value: statusCounts.PENDING },
      { name: STATUS_LABELS.REJECTED, value: statusCounts.REJECTED },
    ];
  }, [allSubmissions]);

  return (
    <div className="h-[260px] w-full sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            // labelLine={{ strokeDasharray: "0" }}
            // label={({ name, value }) => `${name}: ${value}`}
            data={chartData}
            innerRadius="58%"
            outerRadius="78%"
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
            wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionStatusDonutChart;

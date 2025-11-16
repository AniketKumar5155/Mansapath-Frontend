import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useMemo } from "react";
import useFormStore from "../store/formStore";

const COLORS = ["#F5A623", "#50E3C2", "#D0021B"]; 

const SubmissionStatusDonutChart = () => {
  const { submissions, getSubmissions } = useFormStore();

  useEffect(() => {
    getSubmissions();
  }, []);

  const chartData = useMemo(() => {
    const statusCounts = { OPEN: 0, CLOSED: 0, PENDING: 0 };

    submissions.forEach((item) => {
      const status = item.status?.toUpperCase() || "UNKNOWN";
      if (statusCounts[status] !== undefined) {
        statusCounts[status] += 1;
      }
    });

    return [
      { name: "Open", value: statusCounts.OPEN },
      { name: "Pending", value: statusCounts.PENDING },
      { name: "Closed", value: statusCounts.CLOSED },
    ];
  }, [submissions]);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          dataKey="value"
          nameKey="name"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SubmissionStatusDonutChart;

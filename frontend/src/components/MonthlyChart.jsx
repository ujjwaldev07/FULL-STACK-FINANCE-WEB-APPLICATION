import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "./ui/Card";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyChart = ({ data }) => {
  const chartData = data.map((item) => ({
    ...item,
    name: monthNames[item.month - 1],
  }));
  const totals = chartData.reduce(
    (acc, item) => {
      acc.income += item.income;
      acc.expense += item.expense;
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const pieData = [
    { name: "Income", value: totals.income, color: "#34d399" },
    { name: "Expense", value: totals.expense, color: "#fb7185" },
  ];

  return (
    <Card className="analytics-card">
      <h3>Monthly Analytics</h3>
      <div className="analytics-grid">
        <div style={{ width: "100%", height: 290 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293733" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#34d399" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#fb7185" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: "100%", height: 290 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyChart;

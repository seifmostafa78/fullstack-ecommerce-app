import { useUsersStatsQuery } from "../../redux/features/user/userApiSlice";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = ({ aspect, title }) => {
  const { data: stats } = useUsersStatsQuery();
  const usersStats = stats
    ?.map((stat) => ({
      name: MONTHS[stat._id - 1],
      "total users": stat.total,
    }))
    .sort((a, b) => b["total users"] - a["total users"]);

  return (
    <section className="chart" aria-label={title}>
      <header>
        <h2 className="title">{title}</h2>
      </header>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={usersStats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="totalUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total users"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#totalUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;

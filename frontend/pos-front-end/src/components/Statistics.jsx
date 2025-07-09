import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Legend,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { useState } from 'react';
import { Expand, Minimize, Minimize2 } from 'lucide-react';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, ArcElement);

const Statistics = () => {
  const [focused, setFocused] = useState(null); // 'line' | 'doughnut' | 'bar' | null

  const lineChartData = {
    labels: ['Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Sales',
        data: [5, 6, 7],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Returns',
        data: [3, 2, 1],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Electronics', 'Groceries', 'Clothing'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [40, 30, 30],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderColor: ['#1e40af', '#047857', '#b45309'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const barChartData = {
    labels: ['Electronics', 'Groceries', 'Clothing'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12000, 9500, 7800],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="relative">
      {/* Focused View */}
      {focused && (
        <div className="bg-white p-6 shadow-2xl">
          <button
            className="mb-4 px-4 py-2 text-red-500 rounded float-right"
            onClick={() => setFocused(null)}
          >
            <Minimize2/>
          </button>
          <div className="w-full ">
            {focused === 'line' && <Line data={lineChartData} />}
            {focused === 'doughnut' && <Doughnut data={doughnutData} options={doughnutOptions} />}
            {focused === 'bar' && <Bar data={barChartData} />}
          </div>
        </div>
      )}

      {/* Grid View */}
      {!focused && (
        <div className="grid grid-cols-3 grid-rows-2 gap-6 h-full p-4 bg-gray-50">
          <div className="rounded-lg shadow-lg bg-white p-4">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('line')}
            >
              <Expand/>
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2">Monthly Sales Overview</h3>
            <Line data={lineChartData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('doughnut')}
            >
              <Expand/>
            </button>
            <h3 className="text-md font-semibold text-sky-800 mb-2">Category Distribution</h3>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('bar')}
            >
              <Expand/>
            </button>
            <h3 className="text-md font-semibold text-sky-800 mb-2">Sales per Category</h3>
            <Bar data={barChartData} />
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg shadow-lg bg-white p-6 flex items-center justify-center text-gray-400"
            >
              Placeholder {i + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statistics;

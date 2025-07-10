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
import { useEffect, useState } from 'react';
import { Expand, Minimize2 } from 'lucide-react';
import api from '../utils/api';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement
);

const Statistics = () => {
  const [focused, setFocused] = useState(null);
  const [salesChartData, setSalesChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales',
        data: [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });
  const [stockChartData, setStockChartData] = useState([{
    labels: [],
    datasets: [
      {
        label: 'Sales',
        data: [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  }]);

  const [prodData, setProdData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Product-wise Sales',
        data: [],
        backgroundColor: [],
      },
    ],
  });

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

  const fetchBills = async () => {
    const now = new Date();
    now.setHours(now.getHours() + 10);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const payload = {
      from: oneMonthAgo.toISOString(),
      to: now.toISOString(),
    };

    try {
      const res = await api.post('/billing/getbilsbitween', payload);
      const bills = res.data;
      console.log(bills)
      const labels = [];
      const data = [];

      const prodMap = new Map(); // Aggregate by product name

      bills.forEach((bill) => {
        const date = new Date(bill.issuedAt).toLocaleDateString('en-GB');
        labels.push(date);
        data.push(bill.total);

        bill.billProducts.forEach((bp) => {
          const name = bp.productName;
          const qty = bp.issuedQuantity * bp.priceWhenBought || 0;
          prodMap.set(name, (prodMap.get(name) || 0) + qty);
        });
      });

      const prodLabels = Array.from(prodMap.keys());
      const prodValues = Array.from(prodMap.values());

      setSalesChartData({
        labels,
        datasets: [
          {
            label: 'Sales Over Time',
            data,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      });

      setProdData({
        labels: prodLabels,
        datasets: [
          {
            label: 'Product-wise Sales',
            data: prodValues,
            backgroundColor: prodLabels.map(
              (_, i) => ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]
            ),
            borderRadius: 6,
          },
        ],
      });
    } catch (err) {
      console.error('Failed to fetch bills:', err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="relative">
      {/* Focused Chart View */}
      <div
        className={`z-50 bg-white p-6 shadow-2xl fixed top-10 left-10 right-10 bottom-10 rounded-lg overflow-auto
          transform transition-all duration-500 ease-in-out
          ${focused ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <button
          className="mb-4 px-4 py-2 text-red-500 rounded float-right"
          onClick={() => setFocused(null)}
        >
          <Minimize2 />
        </button>

        <div className="w-full">
          {focused === 'line' && <Line data={salesChartData} />}
          {focused === 'productvary' && <Line data={prodData} />}
          {focused === 'doughnut' && <Doughnut data={doughnutData} options={doughnutOptions} />}
          {focused === 'bar' && <Bar data={prodData} />}
        </div>
      </div>

      {/* Grid View */}
      {!focused && (
        <div className="grid grid-cols-3 grid-rows-2 gap-6 h-full p-4 bg-gray-50">
          <div className="rounded-lg shadow-lg bg-white p-4">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('line')}
            >
              <Expand />
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2">Sales Overview</h3>
            <Line data={salesChartData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('productvary')}
            >
              <Expand />
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2">Sales by Product</h3>
            <Line data={prodData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('doughnut')}
            >
              <Expand />
            </button>
            <h3 className="text-md font-semibold text-sky-800 mb-2">Category Distribution</h3>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <button
              className="text-sm text-blue-500 float-right"
              onClick={() => setFocused('bar')}
            >
              <Expand />
            </button>
            <h3 className="text-md font-semibold text-sky-800 mb-2">Sales per Product</h3>
            <Bar data={prodData} />
          </div>

          {[...Array(2)].map((_, i) => (
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

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
  const [billList, setBillList] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

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

  const [productDecayData, setProductDecayData] = useState({
    labels: [],
    datasets: [],
  });

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

      const labels = [];
      const data = [];
      const prodMap = new Map();
      const decayMap = new Map();
      const billElements = [];

      bills.forEach((bill, index) => {
        const date = new Date(bill.issuedAt).toLocaleDateString('en-GB');
        labels.push(date);
        data.push(bill.total);

        billElements.push(
          <div key={index} className="border p-2 rounded hover:bg-gray-100">
            <button
              onClick={() => {
                setSelectedBill(
                  <div className="text-sm bg-white p-6 rounded-lg shadow space-y-4 overflow-x-auto">
                    <h1 className="text-xl font-bold text-sky-800">🧾 Bill ID: {bill.billId}</h1>
                    <div className="bg-sky-50 p-4 rounded-lg shadow-inner space-y-1">
                      <h2 className="font-semibold text-sky-700">🏪 Shop Information</h2>
                      <p><strong>ID:</strong> {bill.shop.shopId}</p>
                      <p><strong>Name:</strong> {bill.shop.shopName}</p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-lg shadow-inner space-y-1">
                      <h2 className="font-semibold text-sky-700">👤 Cashier Information</h2>
                      <p><strong>Full Name:</strong> {bill.user.fullName}</p>
                      <p><strong>Email:</strong> {bill.user.email}</p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-lg shadow-inner">
                      <p><strong>🕒 Issued At:</strong> {new Date(bill.issuedAt).toLocaleString()}</p>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-lg shadow-inner space-y-2">
                      <h2 className="font-semibold text-sky-700 mb-2">📦 Products</h2>
                      {bill.billProducts.map((bp, i) => (
                        <div key={i} className="border border-sky-200 rounded p-3 bg-white shadow-sm">
                          <p><strong>Product Name:</strong> {bp.productName}</p>
                          <p><strong>Product ID:</strong> {bp.productId}</p>
                          <p><strong>Quantity:</strong> {bp.issuedQuantity} {bp.unit}</p>
                          <p><strong>Price When Bought:</strong> Rs. {bp.priceWhenBought.toFixed(2)}</p>
                          <p><strong>Existing Quantity:</strong> {bp.existingQuantity}</p>
                          <p><strong>Unit Price:</strong> Rs. {bp.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-sky-100 p-4 rounded-lg shadow-inner space-y-1 text-right">
                      <p className="text-lg font-semibold text-sky-800">💵 Total: Rs. {bill.total.toFixed(2)}</p>
                      <p><strong>Payment:</strong> {bill.payment}</p>
                    </div>
                  </div>
                );
                setFocused('bill');
              }}
            >
              {bill.billId} — {new Date(bill.issuedAt).toLocaleString()} — {bill.user.fullName}
            </button>
          </div>
        );

        bill.billProducts.forEach((bp) => {
          const name = bp.productName;
          const qty = (bp.issuedQuantity * bp.priceWhenBought) || 0;
          prodMap.set(name, (prodMap.get(name) || 0) + qty);

          const date = new Date(bill.issuedAt).toLocaleDateString('en-GB');
          if (!decayMap.has(name)) decayMap.set(name, []);
          decayMap.get(name).push({ date, value: bp.existingQuantity });
        });
      });

      // For Bar Chart
      const prodLabels = Array.from(prodMap.keys());
      const prodValues = Array.from(prodMap.values());

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

      // For Line Chart (Decay)
      const allDatesSet = new Set();
      decayMap.forEach((entries) => entries.forEach((e) => allDatesSet.add(e.date)));
      const allDates = Array.from(allDatesSet).sort((a, b) => new Date(a) - new Date(b));

      const decayDatasets = Array.from(decayMap.entries()).map(([productName, entries], idx) => {
        const colorPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        const color = colorPalette[idx % colorPalette.length];
        const dateMap = new Map(entries.map((e) => [e.date, e.value]));

        return {
          label: productName,
          data: allDates.map((date) => dateMap.get(date) ?? null),
          borderColor: color,
          backgroundColor: color,
          fill: false,
          tension: 0.3,
        };
      });

      setProductDecayData({
        labels: allDates,
        datasets: decayDatasets,
      });

      setSalesChartData((prev) => ({
        ...prev,
        labels,
        datasets: [{ ...prev.datasets[0], data }],
      }));

      setBillList(billElements);
    } catch (err) {
      console.error('Failed to fetch bills:', err);
      alert('Failed to fetch bills');
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="relative">
      {/* Focused View */}
      <div
        className={`z-50 bg-white p-6 shadow-2xl fixed top-10 left-10 right-10 bottom-10 rounded-lg overflow-auto
          transform transition-all duration-500 ease-in-out
          ${focused ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <button
          className="mb-4 px-4 py-2 text-red-500 rounded float-right"
          onClick={() => setFocused(null)}
        >
          <Minimize2 />
        </button>
        <div className="w-full">
          {focused === 'line' && <Line data={salesChartData} />}
          {focused === 'productvary' && <Line data={productDecayData} />}
          {focused === 'bar' && <Bar data={prodData} />}
          {focused === 'bill' && selectedBill}
        </div>
      </div>

      {/* Grid View */}
      {!focused && (
        <div className="grid grid-cols-3 grid-rows-2 gap-6 h-full p-4 bg-gray-50">
          <div className="rounded-lg shadow-lg bg-white p-4">
            <button className="text-sm text-blue-500 float-right" onClick={() => setFocused('line')}>
              <Expand />
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2">Sales Overview</h3>
            <Line data={salesChartData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4">
            <button className="text-sm text-blue-500 float-right" onClick={() => setFocused('productvary')}>
              <Expand />
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2">Product Stock Decay</h3>
            <Line data={productDecayData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4">
            <button className="text-sm text-blue-500 float-right" onClick={() => setFocused('bar')}>
              <Expand />
            </button>
            <h3 className="text-lg font-semibold text-sky-800 mb-2 overflow-auto w-70">Sales per Product</h3>
            <Bar data={prodData} />
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6 col-span-2 overflow-auto">
            <h3 className="text-md font-semibold text-sky-800 mb-2">All Bills</h3>
            <div className="m-3 p-2 overflow-auto h-70 space-y-2">
              {billList.length > 0 ? billList : <p>No bills found.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;

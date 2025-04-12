import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import fitness from '../assets/fitness.svg'; 
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../api/axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/logs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl text-gray-500">Loading logs...</div>;
  }

  if (!logs || logs.length === 0) {
    return <div className="text-center mt-10 text-lg text-gray-400">No logs available</div>;
  }

  const totalStudy = logs.reduce((sum, log) => sum + log.studyHours, 0);
  const totalSleep = logs.reduce((sum, log) => sum + log.sleepHours, 0);
  const totalWater = logs.reduce((sum, log) => sum + log.waterIntake, 0);

  const chartData = {
    labels: logs.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Study Hours',
        data: logs.map((log) => log.studyHours),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Sleep Hours',
        data: logs.map((log) => log.sleepHours),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Water Intake (L)',
        data: logs.map((log) => log.waterIntake),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-bg text-text">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Your Weekly Balance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-100 shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Study Hours</h2>
          <p className="text-2xl font-bold">{totalStudy} hrs</p>
        </div>
        <div className="bg-indigo-100 shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-green-600 mb-2">Water Intake</h2>
          <p className="text-2xl font-bold">{totalWater} L</p>
        </div>
        <div className="bg-indigo-100 shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Sleep</h2>
          <p className="text-2xl font-bold">{totalSleep} hrs</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full md:w-2/3">
        <h2 className="text-lg font-semibold mb-4 text-center text-primary">Daily Logs</h2>
          <Line data={chartData} />
      </div>

      {/* Habit Tracker Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full md:w-1/3">
        <h2 className="text-lg font-semibold mb-4 text-center text-green-600">🧠 Habit Tracker</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm text-gray-700">
            <thead>
            <tr>
            <th className="p-2 text-left">Habit</th>
            {logs.slice(-7).map((log, index) => (
              <th key={index} className="p-2 text-center">
                {new Date(log.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </th>
            ))}
            </tr>
            </thead>
          <tbody>
          {[
            { label: "Study", key: "studyHours", color: "text-purple-600" },
            { label: "Sleep", key: "sleepHours", color: "text-blue-500" },
            { label: "Water", key: "waterIntake", color: "text-teal-600" },
          ].map((habit, hIndex) => (
            <tr key={hIndex} className="border-t">
              <td className={`p-2 font-medium ${habit.color}`}>{habit.label}</td>
              {logs.slice(-7).map((log, index) => (
                <td key={index} className="text-center p-2">
                  {log[habit.key] > 0 ? "✅" : "❌"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
</div>

{/* Image below Habit Tracker */}
<div className="mt-6">
  <img
    src={fitness}
    alt="Wellness illustration"
    className="w-full rounded-xl shadow-md"
  />
</div>

</div>

</div>


      {/* Suggestions */}
      <div className="bg-indigo-100 shadow-md rounded-2xl p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4 text-primary">💡 Suggestions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {totalStudy > 30 && (
            <li>📚 You've studied a lot this week! Take a 15-minute break and relax. 🎧</li>
          )}
          {totalSleep < 40 && (
            <li>🛌 Try to get more rest! Quality sleep boosts memory and focus. 😴</li>
          )}
          {totalWater < 14 && (
            <li>💧 Don’t forget to hydrate! Aim for at least 2L of water per day. 🚰</li>
          )}
          {logs.length >= 5 && (
            <li>🔥 Great consistency! Keep logging your habits daily for better insights. ✅</li>
          )}
        </ul>
      </div>
    </div>
  );
}

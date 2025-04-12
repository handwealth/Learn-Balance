import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function LogForm() {
  const [formData, setFormData] = useState({
    date: '',
    studyHours: '',
    sleepHours: '',
    waterIntake: '',
    steps: '',
    foodQuality: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      studyHours: parseFloat(formData.studyHours),
      sleepHours: parseFloat(formData.sleepHours),
      waterIntake: parseFloat(formData.waterIntake),
      steps: parseInt(formData.steps),
    };

    try {
      const token = localStorage.getItem('token');
      await api.post('/logs', dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Log saved!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to submit log');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 shadow-md rounded-2xl bg-indigo-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">📝 Log Your Day</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="number"
          name="studyHours"
          value={formData.studyHours}
          onChange={handleChange}
          placeholder="Study Hours"
          min="0"
          step="0.1"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="number"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={handleChange}
          placeholder="Sleep Hours"
          min="0"
          step="0.1"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="waterIntake"
          value={formData.waterIntake}
          onChange={handleChange}
          placeholder="Water Intake (L)"
          min="0"
          step="0.1"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="number"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          placeholder="Steps Taken"
          min="0"
          step="1"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <select
          name="foodQuality"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.foodQuality}
          onChange={handleChange}
          required
        >
          <option value="">Select Food Quality</option>
          <option value="Poor">🍟 Poor</option>
          <option value="Average">🍜 Average</option>
          <option value="Good">🥗 Good</option>
          <option value="Excellent">🥦 Excellent</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
        >
          Save Log
        </button>
      </form>
    </div>
  );
}

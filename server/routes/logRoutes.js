import express from 'express';
import LogEntry from '../models/LogEntry.js'; // Ensure the file is named correctly
import authMiddleware from '../middleware/auth.js'; // Token verification

const router = express.Router();

// POST: Create a new log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { date, studyHours, sleepHours, waterIntake, steps, foodQuality } = req.body;

    if (!date || !studyHours || !sleepHours || !waterIntake || !steps || !foodQuality) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const log = new LogEntry({
      user: req.user.id,
      date,
      studyHours,
      sleepHours,
      waterIntake,
      steps,
      foodQuality,
    });

    await log.save();
    res.status(201).json({ message: 'Log created', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized!', user: req.user });
});

// GET: Fetch all logs for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await LogEntry.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
});

export default router;


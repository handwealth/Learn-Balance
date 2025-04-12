// server/controllers/logController.js
import LogEntry from "../models/LogEntry.js";

export const createLog = async (req, res) => {
  try {
    const log = await LogEntry.create({ ...req.body, userId: req.userId });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await LogEntry.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateLog = async (req, res) => {
  try {
    const updated = await LogEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteLog = async (req, res) => {
  try {
    await LogEntry.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

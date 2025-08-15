// controllers/trainers.controller.js
const Trainer = require('../models/trainers.model');

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ id: req.params.id });
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new trainer
const createTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json(trainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete trainer
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findOneAndDelete({ id: req.params.id });
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json({ message: 'Trainer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer
};
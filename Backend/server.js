// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true                // allow cookies to be sent
}));
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


  const authRoutes = require('./routes/auth.routes');
  const authenticate = require("./middleware/auth.middleware");

  app.use(cookieParser());

  app.use('/yoga-verse/auth', authRoutes);
// Schema
const asanaSchema = new mongoose.Schema({
  asana_name: String,
  sanskrit_meaning: String,
  origin: String,
  historical_background: String,
  benefits: [String],
  category: String,
  image_url: String
});

const Asana = mongoose.model("Asana", asanaSchema);

// Google Cloud TTS
const ttsClient = new TextToSpeechClient();

// GET all asanas
app.get("/yoga-verse/asanas", async (req, res) => {
  try {
    const grouped = await Asana.aggregate([
      {
        $group: {
          _id: "$category",
          asanas: { $push: "$$ROOT" }
        }
      }
    ]);
    res.json(grouped);
    console.log(grouped)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET asana by ID
app.get('/yoga-verse/asanas/:id', async (req, res) => {
  const { id } = req.params;
  const asana = await Asana.findById(id);
  if (!asana) return res.status(404).json({ error: 'Asana not found' });
  res.json(asana);
});

// GET TTS narration
app.get("/yoga-verse/asanas/:id/tts", async (req, res) => {
  try {
    const asana = await Asana.findById(req.params.id);
    if (!asana) return res.status(404).json({ error: "Asana not found" });

    const narration = `${asana.asana_name}, also known as ${asana.sanskrit_meaning}. Origin: ${asana.origin}. ${asana.historical_background}. Benefits include: ${asana.benefits.join(", ")}. References include: ${asana.references.join(", ")}.`;

    const [response] = await ttsClient.synthesizeSpeech({
      input: { text: narration },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" }
    });

    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// // backend/index.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { spawn } = require("child_process");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" })); // allow base64 images

// // Map of asana name to Python script
// const asanaScripts = {
//   tadasana: "../../Ml-Backend/asanas/tadasana.py",
//   vrksasana: "ml/vrksasana.py",
//   bhujangasana: "ml/bhujangasana.py",
//   // add more asanas here
// };

// app.post("/detect", (req, res) => {
//   const { image, asana } = req.body;

//   if (!image || !asana) {
//     return res.status(400).json({ error: "Missing image or asana" });
//   }

//   const scriptPath = asanaScripts[asana];
//   if (!scriptPath) {
//     return res.status(400).json({ error: `Unknown asana: ${asana}` });
//   }

//   // Spawn Python process
//   const python = spawn("python", [scriptPath, image]);

//   let output = "";
//   python.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     console.error(`Python error: ${data}`);
//   });

//   python.on("close", () => {
//     res.json({ result: output.trim() });
//   });
// });

// app.listen(5000, () => {
//   console.log("✅ Backend running at http://localhost:5000");
// });

// // backend/index.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { spawn } = require("child_process");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" })); // allow base64 images

// // Map of asana name to Python script
// const asanaScripts = {
//   tadasana: "../../Ml-Backend/asanas/tadasana.py",
//   vrksasana: "ml/vrksasana.py",
//   bhujangasana: "ml/bhujangasana.py",
//   // add more asanas here
// };

// app.post("/detect", (req, res) => {
//   const { image, asana } = req.body;

//   if (!image || !asana) {
//     return res.status(400).json({ error: "Missing image or asana" });
//   }

//   const scriptPath = asanaScripts[asana.toLowerCase()];
//   if (!scriptPath) {
//     return res.status(400).json({ error: `Unknown asana: ${asana}` });
//   }

//   // Spawn Python process
//   const python = spawn("python", [scriptPath]);

//   let output = "";
//   python.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     console.error(`Python error: ${data}`);
//   });

//   python.on("close", () => {
//     res.json({ result: output.trim() });
//   });

//   // Send image data to Python via stdin
//   python.stdin.write(image);
//   python.stdin.end();
// });

// app.listen(5000, () => {
//   console.log("✅ Backend running at http://localhost:5000");
// });

const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());

let pythonProcess = null;
const FEEDBACK_FILE = "feedback.txt";

// Start ML for Tadasana
app.get("/start-ml", (req, res) => {
    if (pythonProcess) {
        return res.status(400).json({ message: "ML already running" });
    }

    pythonProcess = spawn("python", ["../../Ml-Backend/asanas/tadasana.py"]);

    pythonProcess.stdout.on("data", (data) => {
        const feedback = data.toString().trim();
        fs.writeFileSync(FEEDBACK_FILE, feedback);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Python error:", data.toString());
    });

    pythonProcess.on("close", () => {
        pythonProcess = null;
    });

    res.json({ message: "ML process started" });
});

// Stop ML
app.get("/stop-ml", (req, res) => {
    if (!pythonProcess) return res.status(400).json({ message: "ML not running" });
    pythonProcess.kill();
    pythonProcess = null;
    res.json({ message: "ML process stopped" });
});

// Get feedback
app.get("/feedback", (req, res) => {
    if (fs.existsSync(FEEDBACK_FILE)) {
        const feedback = fs.readFileSync(FEEDBACK_FILE, "utf-8");
        return res.json({ feedback });
    }
    res.json({ feedback: "Waiting for pose detection..." });
});

app.listen(5000, () => console.log("✅ Backend running at http://localhost:5000"));

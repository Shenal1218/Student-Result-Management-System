const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==============================
// 📦 Temporary Memory Storage
// ==============================
let results = [];


/* =========================
   ➕ Add Result
========================= */
app.post("/add", (req, res) => {
  const { regno, subject, marks } = req.body;

  // Validation
  if (!regno || !subject || marks == null || marks < 0 || marks > 100) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  results.push({
    regno,
    subject,
    marks: Number(marks)
  });

  res.json({ message: "Result Added Successfully" });
});


/* =========================
   📋 Get All Results
========================= */
app.get("/results", (req, res) => {
  res.json(results);
});


/* =========================
   🔎 Search by Reg No
========================= */
app.get("/search/:regno", (req, res) => {

  const regno = req.params.regno;

  const filteredResults = results.filter(
    (r) => r.regno === regno
  );

  res.json(filteredResults);
});


// ==============================
// 🚀 Start Server
// ==============================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
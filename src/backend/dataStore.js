// In-memory data store for student results
// For persistence, results are also saved to a JSON file on disk.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'results.json');

let results = [];

// Initialize with sample data (used when no file exists or file is invalid)
function initializeSampleData() {
  results = [
    {
      id: '1',
      regno: '2025IT01',
      subject: 'Mathematics',
      marks: 85,
      grade: 'A+',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      regno: '2025IT02',
      subject: 'Science',
      marks: 72,
      grade: 'B',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      regno: '2025IT03',
      subject: 'ICT',
      marks: 61,
      grade: 'C',
      createdAt: new Date().toISOString()
    }
  ];
}

function saveResultsToFile() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save results to file:', err.message);
  }
}

function loadResultsFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        results = parsed;
        return;
      }
    }
  } catch (err) {
    console.error('Failed to load results from file, using sample data:', err.message);
  }

  // Fallback to sample data if file is missing or invalid
  initializeSampleData();
  saveResultsToFile();
}

// Load results (from file if available, otherwise sample data)
loadResultsFromFile();

// Add a new result
function addResult(result) {
  results.push(result);
  saveResultsToFile();
  return result;
}

// Get all results
function getAllResults() {
  return results;
}

// Get results by registration number
function getResultsByRegno(regno) {
  return results.filter(result => 
    result.regno.toLowerCase() === regno.toLowerCase()
  );
}

// Get result by ID
function getResultById(id) {
  return results.find(result => result.id === id);
}

// Delete result by ID
function deleteResult(id) {
  const index = results.findIndex(result => result.id === id);
  if (index !== -1) {
    results.splice(index, 1);
    saveResultsToFile();
    return true;
  }
  return false;
}

// Update result by ID
function updateResult(id, updatedData) {
  const index = results.findIndex(result => result.id === id);
  if (index !== -1) {
    results[index] = { ...results[index], ...updatedData };
    saveResultsToFile();
    return results[index];
  }
  return null;
}

// Clear all results (useful for testing)
function clearAllResults() {
  results = [];
  saveResultsToFile();
}

module.exports = {
  addResult,
  getAllResults,
  getResultsByRegno,
  getResultById,
  deleteResult,
  updateResult,
  clearAllResults
};

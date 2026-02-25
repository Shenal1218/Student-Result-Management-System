// In-memory data store for student results
// In production, this would be replaced with a database

let results = [];

// Initialize with sample data
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

// Initialize sample data on module load
initializeSampleData();

// Add a new result
function addResult(result) {
  results.push(result);
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
    return true;
  }
  return false;
}

// Update result by ID
function updateResult(id, updatedData) {
  const index = results.findIndex(result => result.id === id);
  if (index !== -1) {
    results[index] = { ...results[index], ...updatedData };
    return results[index];
  }
  return null;
}

// Clear all results (useful for testing)
function clearAllResults() {
  results = [];
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

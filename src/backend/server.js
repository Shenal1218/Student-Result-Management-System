const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataStore = require('./dataStore');
const { calculateGPA, getGrade } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Add a new result
app.post('/api/results', (req, res) => {
  try {
    const { regno, subject, marks } = req.body;

    // Validation
    if (!regno || !subject || marks === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: regno, subject, and marks are required' 
      });
    }

    const marksNum = parseFloat(marks);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      return res.status(400).json({ 
        error: 'Invalid marks. Marks must be a number between 0 and 100' 
      });
    }

    const grade = getGrade(marksNum);
    const result = {
      id: Date.now().toString(),
      regno: regno.trim(),
      subject: subject.trim(),
      marks: marksNum,
      grade: grade,
      createdAt: new Date().toISOString()
    };

    dataStore.addResult(result);
    res.status(201).json({ 
      message: 'Result added successfully', 
      result: result 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get all results
app.get('/api/results', (req, res) => {
  try {
    const results = dataStore.getAllResults();
    res.json({ results, count: results.length });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get results by registration number
app.get('/api/results/:regno', (req, res) => {
  try {
    const { regno } = req.params;
    const results = dataStore.getResultsByRegno(regno);
    
    if (results.length === 0) {
      return res.status(404).json({ 
        error: 'No results found for the given registration number',
        regno: regno 
      });
    }

    res.json({ 
      regno: regno,
      results: results,
      count: results.length 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Calculate GPA for a student
app.get('/api/gpa/:regno', (req, res) => {
  try {
    const { regno } = req.params;
    const results = dataStore.getResultsByRegno(regno);
    
    if (results.length === 0) {
      return res.status(404).json({ 
        error: 'No results found for the given registration number',
        regno: regno 
      });
    }

    const gpa = calculateGPA(results);
    const gradePoints = results.map(r => ({
      subject: r.subject,
      marks: r.marks,
      grade: r.grade,
      point: getGradePoint(r.marks)
    }));

    res.json({
      regno: regno,
      gpa: gpa.toFixed(2),
      totalSubjects: results.length,
      gradePoints: gradePoints
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get dashboard statistics
app.get('/api/dashboard', (req, res) => {
  try {
    const allResults = dataStore.getAllResults();
    const uniqueStudents = new Set(allResults.map(r => r.regno));
    
    // Calculate overall statistics
    let totalSubjects = allResults.length;
    let totalStudents = uniqueStudents.size;
    
    // Get best grade
    const grades = allResults.map(r => r.grade);
    const bestGrade = getBestGrade(grades);
    
    // Calculate average GPA across all students
    let totalGPA = 0;
    let studentsWithResults = 0;
    
    uniqueStudents.forEach(regno => {
      const studentResults = dataStore.getResultsByRegno(regno);
      if (studentResults.length > 0) {
        totalGPA += calculateGPA(studentResults);
        studentsWithResults++;
      }
    });
    
    const averageGPA = studentsWithResults > 0 ? (totalGPA / studentsWithResults).toFixed(2) : '0.00';

    res.json({
      totalStudents: totalStudents,
      totalSubjects: totalSubjects,
      averageGPA: parseFloat(averageGPA),
      bestGrade: bestGrade,
      recentResults: allResults.slice(-5).reverse() // Last 5 results
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Delete a result by ID
app.delete('/api/results/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dataStore.deleteResult(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Result not found' });
    }
    
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Helper function to get grade point
function getGradePoint(marks) {
  if (marks >= 85) return 4.0;
  else if (marks >= 75) return 3.7;
  else if (marks >= 65) return 3.0;
  else if (marks >= 55) return 2.0;
  else if (marks >= 40) return 1.0;
  else return 0.0;
}

// Helper function to get best grade
function getBestGrade(grades) {
  const gradeOrder = ['A+', 'A', 'B', 'C', 'D', 'F'];
  const sorted = grades.sort((a, b) => {
    return gradeOrder.indexOf(a) - gradeOrder.indexOf(b);
  });
  return sorted[0] || 'N/A';
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

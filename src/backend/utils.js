// Utility functions for grade calculation and GPA

/**
 * Get grade based on marks
 * @param {number} marks - Student marks (0-100)
 * @returns {string} Grade (A+, A, B, C, D, F)
 */
function getGrade(marks) {
  if (marks >= 85) return 'A+';
  else if (marks >= 75) return 'A';
  else if (marks >= 65) return 'B';
  else if (marks >= 55) return 'C';
  else if (marks >= 40) return 'D';
  else return 'F';
}

/**
 * Get grade point based on marks
 * @param {number} marks - Student marks (0-100)
 * @returns {number} Grade point (0.0 - 4.0)
 */
function getGradePoint(marks) {
  if (marks >= 85) return 4.0;
  else if (marks >= 75) return 3.7;
  else if (marks >= 65) return 3.0;
  else if (marks >= 55) return 2.0;
  else if (marks >= 40) return 1.0;
  else return 0.0;
}

/**
 * Calculate GPA from an array of results
 * @param {Array} results - Array of result objects with marks property
 * @returns {number} GPA value
 */
function calculateGPA(results) {
  if (!results || results.length === 0) {
    return 0;
  }

  let totalPoints = 0;
  results.forEach(result => {
    totalPoints += getGradePoint(result.marks);
  });

  return totalPoints / results.length;
}

/**
 * Validate marks
 * @param {number} marks - Marks to validate
 * @returns {boolean} True if valid
 */
function isValidMarks(marks) {
  return !isNaN(marks) && marks >= 0 && marks <= 100;
}

/**
 * Validate registration number format
 * @param {string} regno - Registration number to validate
 * @returns {boolean} True if valid
 */
function isValidRegno(regno) {
  return regno && typeof regno === 'string' && regno.trim().length > 0;
}

module.exports = {
  getGrade,
  getGradePoint,
  calculateGPA,
  isValidMarks,
  isValidRegno
};

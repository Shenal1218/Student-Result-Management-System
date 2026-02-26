// api/index.js
const app = require('../src/backend/app');

module.exports = (req, res) => app(req, res);
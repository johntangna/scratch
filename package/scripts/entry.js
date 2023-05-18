if (process.env.NODE_ENV === 'production') {
  module.exports = require('./smart-calendar.min.js');
} else {
  module.exports = require('./smart-calendar.js');
}

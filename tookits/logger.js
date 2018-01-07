const path = require('path');

const logger = {
  logType: {
    normal: path.resolve(__dirname, '../logs/normal.txt'),
    error: path.resolve(__dirname, '../logs/error.txt')
  },
  writeLog (log, type) {
    console.log(log)
  },
  log (log, type) {
    console.log(log);
    logger.writeLog(log, type);
  },
  warn (log, type) {
    console.warn(log);
    logger.writeLog(log, type);
  },
  error (log, type) {
    console.error(log);
    logger.writeLog(log, type);
  }
}

module.exports = logger;
// backend/services/fileService.js
const fs   = require('fs/promises');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/results.txt');

/**
 * Read all existing result records from disk.
 * @returns {Promise<Array<Object>>}
 */
async function readResults() {
  try {
    const raw = await fs.readFile(logFilePath, 'utf-8');
    return raw
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => JSON.parse(line));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // file doesn't exist yet
      return [];
    }
    throw err;
  }
}

/**
 * Append or replace a submission record in the log.
 * Keeps only the newest record per sessionId.
 * @param {Object} record
 * @returns {Promise<void>}
 */
async function appendResult(record) {
  const all = await readResults();
  // remove any old record for this session
  const filtered = all.filter(r => r.sessionId !== record.sessionId);
  filtered.push(record);
  // write them all back
  const toWrite = filtered.map(r => JSON.stringify(r)).join('\n') + '\n';
  await fs.writeFile(logFilePath, toWrite, 'utf-8');
}

module.exports = {
  readResults,
  appendResult
};

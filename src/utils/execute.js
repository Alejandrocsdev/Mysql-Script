const { execFileSync } = require('child_process');

const normalize = (query) => query.replace(/\s+/g, ' ');

const raw = (query) => {
  // -e: execute
  const output = execFileSync('mysql', ['-e', normalize(query)], {
    encoding: 'utf8',
  });
  return output.trim();
};

const table = (query) => {
  // --table: table format output
  // -e: execute
  const output = execFileSync('mysql', ['--table', '-e', normalize(query)], {
    encoding: 'utf8',
  });
  return output.trim();
};

module.exports = { raw, table };

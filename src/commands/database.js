const { colors, header, execute } = require('../utils');
const { red } = colors;

const database = () => {
  header('MySQL Databases');

  const query = `
		SELECT schema_name AS db_name
    FROM information_schema.schemata
    WHERE schema_name NOT IN (
      'information_schema',
      'mysql',
      'performance_schema',
      'sys'
    );
	`;

  try {
    const output = execute.table(query);
    console.log(output || red('No databases found'));
  } catch (error) {
    console.error('\n❌ Failed to query MySQL databases');
    process.exit(1);
  }
};

module.exports = database;

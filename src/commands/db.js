const { colors, header, execute } = require('../utils');
const { red, blue } = colors;

const db = (action, dbName) => {
  header('MySQL Databases');

  try {
    // SHOW
    if (action === 'show') {
      const showQuery = `
		    SELECT schema_name AS 'Database'
        FROM information_schema.schemata
        WHERE schema_name NOT IN (
          'information_schema',
          'mysql',
          'performance_schema',
          'sys'
        );
	    `;
      const output = execute.table(showQuery);
      console.log(output || red('No databases found'));
      return;
    }
    // CREATE
    if (action === 'create') {
      if (!dbName) {
        throw new Error('❌ Invalid <name> argument');
      }

      const createQuery = `CREATE DATABASE ${dbName};`;

      execute.raw(createQuery);

      console.log(blue(`Database "${dbName}" created`));
      return;
    }
  } catch (error) {
    console.error('\n❌ Failed to process MySQL database command');
    throw error;
  }
};

module.exports = db;

const { colors, header, execute, decodeConfig } = require('../utils');
const { red, blue } = colors;

const SYSTEM_DBS = ['information_schema', 'mysql', 'performance_schema', 'sys'];

const db = (action, config) => {
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
      const { name } = decodeConfig(config, ['name']);

      if (!name) {
        throw new Error('❌ Invalid <name> argument');
      }

      const createQuery = `CREATE DATABASE \`${name}\`;`;

      execute.raw(createQuery);

      console.log(blue(`Database "${name}" created`));
      return;
    }
    // DROP
    if (action === 'drop') {
      const { name } = decodeConfig(config, ['name']);

      if (!name) {
        throw new Error('❌ Invalid <name> argument');
      }

      if (SYSTEM_DBS.includes(name)) {
        throw new Error('❌ Cannot operate on system database');
      }

      const dropQuery = `DROP DATABASE \`${name}\`;`;

      execute.raw(dropQuery);

      console.log(blue(`Database "${name}" dropped`));
      return;
    }
    // GRANT
    if (action === 'grant') {
      const { name, user, host } = decodeConfig(config, [
        'name',
        'user',
        'host',
      ]);

      if (!name || !user || !host) {
        throw new Error('❌ Invalid <spec> argument');
      }

      const grantQuery = `GRANT ALL PRIVILEGES ON \`${name}\`.* TO '${user}'@'${host}';`;
      execute.raw(grantQuery);
      execute.raw('FLUSH PRIVILEGES;');

      console.log(blue(`Database "${name}" granted to '${user}'@'${host}'`));
      return;
    }
    // REVOKE
    if (action === 'revoke') {
      const { name, user, host } = decodeConfig(config, [
        'name',
        'user',
        'host',
      ]);

      if (!name || !user || !host) {
        throw new Error('❌ Invalid <spec> argument');
      }

      const revokeQuery = `REVOKE ALL PRIVILEGES ON \`${name}\`.* FROM '${user}'@'${host}';`;
      execute.raw(revokeQuery);
      execute.raw('FLUSH PRIVILEGES;');

      console.log(blue(`Database "${name}" revoked from '${user}'@'${host}'`));
      return;
    }
    // DATABASE: USER ACCESS
    if (action === 'user:show') {
      const { name } = decodeConfig(config, ['name']);

      if (!name) {
        throw new Error('❌ Invalid <spec> argument');
      }

      const userAccessQuery = `
			  SELECT User, Host
        FROM mysql.db
        WHERE Db = '${name}';
      `;

      const output = execute.table(userAccessQuery);

      console.log(output || red(`No user have access to "${name}" database`));
      return;
    }
  } catch (error) {
    console.error('\n❌ Failed to process MySQL database command');
    throw error;
  }
};

module.exports = db;

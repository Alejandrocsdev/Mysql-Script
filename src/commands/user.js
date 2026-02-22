const { colors, header, execute, decodeConfig } = require('../utils');
const { red, blue } = colors;

const SYSTEM_USERS = [
  'debian-sys-maint',
  'mysql.infoschema',
  'mysql.session',
  'mysql.sys',
  'root',
];

const user = (action, config) => {
  header('MySQL Users');

  try {
    // SHOW
    if (action === 'show') {
      const showQuery = `
          SELECT user, host
          FROM mysql.user
          WHERE user NOT IN (
            'debian-sys-maint',
            'mysql.infoschema',
            'mysql.session',
			      'mysql.sys',
            'root'
          );
			  `;
      const output = execute.table(showQuery);
      console.log(output || red('No users found'));
      return;
    }
    // CREATE
    if (action === 'create') {
      const { user, host, pass } = decodeConfig(config, [
        'user',
        'host',
        'pass',
      ]);

      if (!user || !host || !pass) {
        throw new Error('❌ Invalid <spec> argument');
      }

      const createQuery = `
        CREATE USER '${user}'@'${host}'
        IDENTIFIED BY '${pass}';
      `;

      execute.raw(createQuery);

      console.log(blue(`User '${user}'@'${host}' created`));
      return;
    }
    // DROP
    if (action === 'drop') {
      const { user, host } = decodeConfig(config, ['user', 'host']);

      if (!user || !host) {
        throw new Error('❌ Invalid <spec> argument');
      }

      if (SYSTEM_USERS.includes(user)) {
        throw new Error('❌ Cannot operate on system user');
      }

      const dropQuery = `DROP USER '${user}'@'${host}';`;

      execute.raw(dropQuery);

      console.log(blue(`User '${user}'@'${host}' dropped`));
      return;
    }
    // USER: DATABASE ACCESS
    if (action === 'db:show') {
      const { user, host } = decodeConfig(config, ['user', 'host']);

      if (!user || !host) {
        throw new Error('❌ Invalid <spec> argument');
      }

      const dbAccessQuery = `
			  SELECT Db
        FROM mysql.db
        WHERE user = '${user}'
        AND host = '${host}';
			`;

      const output = execute.table(dbAccessQuery);

      console.log(
        output || red(`No database have access from '${user}'@'${host}'`),
      );
      return;
    }
  } catch (error) {
    console.error('\n❌ Failed to process MySQL user command');
    throw error;
  }
};

module.exports = user;

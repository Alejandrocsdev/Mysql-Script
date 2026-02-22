const { colors, header, execute } = require('../utils');
const { red, blue } = colors;

const user = (action, config) => {
  header('MySQL Users');

  const decodeConfig = (str) => {
    if (!str) return {};
    const obj = {};
    str.split(',').forEach((pair) => {
      const [key, value] = pair.split(':');
      if (key && value) obj[key.trim()] = value.trim();
    });
    return obj;
  };

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
      const { user, host, pass } = decodeConfig(config);

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
  } catch (error) {
    console.error('\n❌ Failed to process MySQL user command');
    throw error;
  }
};

module.exports = user;

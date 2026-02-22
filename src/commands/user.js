const { colors, header, execute } = require('../utils');
const { red } = colors;

const user = () => {
	header('MySQL Users')

  const query = `
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

  try {
    const output = execute.table(query);
    console.log(output || red('No users found'));
  } catch (error) {
    console.error('\n❌ Failed to query MySQL users');
    process.exit(1);
  }
};

module.exports = user;

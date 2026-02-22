const { execFileSync } = require('child_process');

const { header } = require('../utils');

const config = () => {
  header('MySQL Server Config (mysqld.cnf)');

  try {
    execFileSync('nano', ['/etc/mysql/mysql.conf.d/mysqld.cnf'], {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('\n❌ Failed to open MySQL config file');
    throw error;
  }
};

module.exports = config;

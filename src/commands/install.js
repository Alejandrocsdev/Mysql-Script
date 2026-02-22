const { colors, header } = require('../utils');
const { blue } = colors;

const install = () => {
	header('MySQL Installation (Ubuntu)')

  console.log('\n1.Update package list:');
  console.log(blue('  sudo apt update'));

  console.log('\n2.Install MySQL Server:');
  console.log(blue('  sudo apt install mysql-server'));

  console.log('\n3.Verify installation:');
  console.log(blue('  mysql --version'));

  console.log('\n4.Check service status:');
  console.log(blue('  sudo systemctl status mysql'));

  console.log('\n5.Default login (Ubuntu):');
  console.log(blue('  sudo mysql'));
};

module.exports = install;

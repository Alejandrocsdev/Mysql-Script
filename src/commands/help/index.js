const fs = require('fs');
const path = require('path');

const helpPath = path.join(__dirname, 'help.txt');
const helpContent = fs.readFileSync(helpPath, 'utf8');

const install = require('./install');
const system = require('./system');

const help = (type) => {
  switch (type) {
    case undefined:
      return console.info(helpContent);
    case 'install':
      return install();
    case 'system':
      return system();
  }
};

module.exports = help;

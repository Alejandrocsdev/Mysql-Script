const help = require('./help');
const db = require('./db');
const user = require('./user');
const config = require('./config');

const commands = async (argv) => {
  try {
    const args = argv.slice(2);

    const command = args[0];
    const argument = args[1];

    if (!command) {
      throw new Error('❌ Missing command');
    }

    switch (command) {
      // HELP
      case 'help':
        return help();
      case 'help:install':
        return help('install');
      case 'help:system':
        return help('system');
      // USER
      case 'user:show':
        return user('show');
      case 'user:create':
        return user('create', argument);
      case 'user:drop':
        return user('drop', argument);
      // DATABASE
      case 'db:show':
        return db('show');
      case 'db:create':
        return db('create', argument);
      case 'db:drop':
        return db('drop', argument);
      // CONFIGURATION
      case 'config':
        return config();
    }

    throw new Error(`❌ Unknown or malformed command: "${args.join(' ')}"`);
  } catch (error) {
    console.error('Use "./run.sh help" to see available commands.');
    throw error;
  }
};

module.exports = commands;

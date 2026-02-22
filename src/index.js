// const fs = require('fs');
// const path = require('path');

const { install, system, user, database, config } = require('./commands');

// const configPath = path.join(__dirname, '..', 'config.json');

const main = () => {
  const args = process.argv.slice(2);

  try {
    // const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    if (args.length === 1 && args[0] === '--install') {
      install();
      return;
    }

    if (args.length === 1 && args[0] === '--system') {
      system();
      return;
    }

    if (args.length === 1 && args[0] === '--user') {
      user();
      return;
    }

    if (args.length === 1 && args[0] === '--database') {
      database();
      return;
    }

    if (args.length === 1 && args[0] === '--config') {
      config();
      return;
    }

    throw new Error(`Invalid command flag: ${args.join(' ')}`);
  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  }
};

main();

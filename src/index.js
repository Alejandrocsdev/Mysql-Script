const { mysqlScript } = require('./mysqlScript');
const { safeRun } = require('./utils');

safeRun(() => mysqlScript(process.argv));

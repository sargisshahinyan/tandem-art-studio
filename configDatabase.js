const fs   = require('fs');
const path = require('path');

const DB_CONFIG_FILE_PATH = path.join(__dirname, 'database.json');

console.log('Checking if database config file exists. `' + DB_CONFIG_FILE_PATH + '`');
if (fs.existsSync(DB_CONFIG_FILE_PATH)) return console.log('Config file exists');

console.log('Creating database credentials config file...');

const {
  USER_NAME = 'postgres',
  PASSWORD  = '123',
  HOST      = 'localhost',
  DATABASE  = 'tandem',
} = process.env;

let configTemplate = fs.readFileSync(path.join(__dirname, 'database.json.example')).toString('ascii');

configTemplate = (
  configTemplate
    .replace(/\{\{USER_NAME\}\}/g, USER_NAME)
    .replace(/\{\{PASSWORD\}\}/g, PASSWORD)
    .replace(/\{\{HOST\}\}/g, HOST)
    .replace(/\{\{DATABASE\}\}/g, DATABASE)
);

fs.writeFileSync(DB_CONFIG_FILE_PATH, configTemplate);

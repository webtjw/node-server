const path = require('path');
const dotenv = require('dotenv');
const chalk = require('chalk');
const fse = require('fs-extra');

const result = dotenv.config();
if (result.error) throw result.error;

if (result.parsed.BUILD_FOLDER) {
  const targetFolder = path.resolve(__dirname, '../', result.parsed.BUILD_FOLDER);
  const sourceFolder = path.resolve(__dirname, '../build');

  try {
    fse.removeSync(path.join(targetFolder, '/static'));
    fse.copySync(sourceFolder, targetFolder);
  
    console.log(`
    copying build files from ${chalk.green(sourceFolder)}
    to server static folder ${chalk.green(sourceFolder)}\n`);
  } catch (e) {
    console.log(chalk.red(`build files transfered failed: ${e}`));
  }
}

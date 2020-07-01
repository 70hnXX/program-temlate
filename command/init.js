"use strict";

const exec = require("child_process").exec;
const co = require("co");
// const clone = require('git-clone')
const prompt = require("co-prompt");
const config = require("../templates");
const inquirer = require('inquirer')
// const chalk = require("chalk");
const {
  chalk,
  execa,
  semver,

  log,
  warn,
  error,
  logWithSpinner,
  stopSpinner,

  hasGit,
  hasProjectGit,
  hasYarn,
  hasPnpm3OrLater,
  hasPnpmVersionOrLater,

  exit,
  loadModule
} = require('@vue/cli-shared-utils')

module.exports = () => {
  co(async function () {
    // 处理用户输入
    // let tplName = yield prompt("Template name: ");
    // let projectName = yield prompt("Project name: ");
    let framwork = await inquirer.prompt({
      name: 'framwork',
      type: 'list',
      message: `选择你想使用的前端框架:`,
      choices: [
        {
          name: 'Vue',
          value: 'vue'
        },
        {
          name: 'React',
          value: 'react'
        },
        {
          name: 'MiniProgram',
          value: 'wechat'
        }
      ]
    })
    let situation = await inquirer.prompt({
      name: 'framwork',
      type: 'list',
      message: `选择使用场景:`,
      choices: [
        {
          name: 'Vue',
          value: 'vue'
        },
        {
          name: 'React',
          value: 'react'
        }
      ]
    })
    let projectName = 'app'
    let branch = 'cli'
    let cmdStr = `git clone https://github.com/70hnXX/program-temlate.git && cd ${projectName} && git checkout ${branch}`;
    // console.log(chalk.white("\n Start generating..."));
    log(`✨  Creating project in projectName`)
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        process.exit();
      }
      console.log(chalk.green("\n √ Generation completed!"));
      console.log(`\n cd ${projectName} && npm install \n`);
      process.exit();
    });
  });
};

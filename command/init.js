"use strict";

const exec = require("child_process").exec;
const co = require("co");
// const clone = require('git-clone')
// const log = require('tracer').colorConsole()
const prompt = require("co-prompt");
const config = require("../templates");
const inquirer = require('inquirer')
// const shell = require('shelljs')
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
    let name = ''
    let branch = '' // 分支
    // 项目名
    let projectName = await inquirer.prompt({
      name: 'projectName',
      type: 'input',
      message: '请输入项目名称:'
    })
    name = projectName.projectName
    // 选择分支
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
    branch = framwork.framwork
    // vue
    if (framwork.framwork === 'vue') {
      let situation = await inquirer.prompt({
        name: 'situation',
        type: 'list',
        message: `选择使用场景:`,
        choices: [
          {
            name: 'web-mobile',
            value: '-app'
          },
          {
            name: 'web-pc',
            value: '-web'
          },
          {
            name: 'web-admin',
            value: '-admin'
          }
        ]
      })
      branch += situation.situation
    }
    // react
    if (framwork.framwork === 'react') {
      let situation = await inquirer.prompt({
        name: 'situation',
        type: 'list',
        message: `选择使用场景:`,
        choices: [
          {
            name: 'web-admin',
            value: '-admin'
          },
          {
            name: 'taro',
            value: '-taro'
          }
        ]
      })
      branch += situation.situation
    }
    // 确认
    // 项目名
    let confirmConfig = await inquirer.prompt({
      name: 'confirmConfig',
      type: 'confirm',
      message: '确认新建一个' + branch + '类型的项目?'
    })
    console.log(confirmConfig)
    let cmdStr = `mkdir ${name} && git clone https://github.com/70hnXX/program-temlate.git && cd ${name} && git checkout ${branch}`;
    log(`✨  Creating project in projectName`)

    // clone(`https://gitee.com/Johnwuyang/vicetone-cli-fontend.git`, pwd + `/${project}`, null, function () {
    //     shell.rm('-rf', pwd + `/${project}/.git`)
    //     log.info('done enjoy ╭(●｀∀´●)╯')
    //   })
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

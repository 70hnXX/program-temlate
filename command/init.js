"use strict";

const co = require("co");
const clone = require('git-clone')
const inquirer = require('inquirer')
const shell = require('shelljs')
const {
  chalk,
  log,
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
    let name = '' // 项目名
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
            value: '-app'          },
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
            name: 'web-pc',
            value: '-web'
          },
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
    let confirmConfig = await inquirer.prompt({
      name: 'confirmConfig',
      type: 'confirm',
      message: '确认新建一个' + branch + '类型的项目?'
    })
    if (!confirmConfig.confirmConfig) {
      process.exit();
    }
    let pwd = shell.pwd() // 当前路径
    log(`✨  Invoking generators...`)
    setTimeout(function() {
      log(`⚙\u{fe0f}   Generating. This might take a while...`)
    },500)
    try {
      clone(`https://gitee.com/Johnwuyang/program-temlate.git`,pwd + `/${name}`, {checkout:branch}, function (e) {
        shell.rm('-rf', pwd + `/${name}/.git`)
        log(
          `🌈   Get started with the following commands:\n\n` +
          chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`) +
          chalk.cyan(` ${chalk.gray('$')} npm i\n`) +
          chalk.cyan(` ${chalk.gray('$')} npm run serve\n`)
        )
        process.exit();
      })
    } catch(e) {
      console.log(e)
      process.exit();
    }
  });
};

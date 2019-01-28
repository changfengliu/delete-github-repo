const shell = require('shelljs');
const prompt = require('prompt');
const chalk = require('chalk');
const uselessRepo = require('./useless-repo.json')

prompt.start();
prompt.get({
  properties: {
    username: {
      description: "enter your github username",
      required: true
    },
    password: {
      description: "enter your github password",
      hidden: true,
      required: true
    }
  }
}, function (err, accountInfo) {
  var userName = accountInfo.username
  var password = accountInfo.password
  if(uselessRepo.length > 0) {
    console.log('')
  }
  uselessRepo.forEach((repoName, index)=>{
    var deletionResult = shell.exec(
      `curl -X DELETE -u "${userName}:${password}" https://api.github.com/repos/${userName}/${repoName}`,
      {
        silent: true
      }
    )
    var stdout = JSON.parse(deletionResult['stdout'] || '{}')
    console.log(
      (index + 1) + '. ' +
      repoName + ' : ' +
      (stdout['message'] ? chalk.red(stdout['message']) : chalk.green('Deleted')) )
  })
  console.log('')
})

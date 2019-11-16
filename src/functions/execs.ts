import { exec } from 'child_process'
const chalk = require('chalk')
export const execs = (commands, value?) => {
  const command = commands.shift()
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(chalk.red('this path exist (Essa pasta já existe)'))
      process.exit(1)
      return false
    } else {
      if (stdout) console.log(chalk.gray(stdout))
      if (stderr) console.log(chalk.gray(stderr))
      if (commands.length) execs(commands, value);
      let bool;
      if (commands.length === 0) {
        bool = true
      }
      if (bool === true) {
        console.log(chalk.green(value));
        process.exit(1)
      }
    }
  })
}

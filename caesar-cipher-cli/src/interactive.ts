export {}
const inquirer = require('inquirer')
const chalk = require('chalk')

const caersar = require('./utils/caesar')

type IAskAndDoType = (type: string, shift: number) => Promise<IAskAndDoType>

const askAndDo: IAskAndDoType = (type, shift, withOutput: boolean = false) => {
    const question = [
        {
            type: 'input',
            name: 'text',
            message: `What's text you want to ${type} ?`
        }
    ]

   return inquirer.prompt(question).then((answers: {text: string}) => {
       const ans = caersar.pasre(answers['text'], shift)
       if(withOutput){
           return ans
       }
       console.log(chalk.yellowBright('Here you are - '), chalk.red(ans))
       return askAndDo(type, shift)
    })
}

exports.interactive = askAndDo
export {}
const fs = require('fs');
const { pipeline, Readable } = require('stream');
const { promisify } = require('util');
const asyncPipeline = promisify(pipeline);
const chalk = require('chalk')

const moduleCaersar = require('./utils/caesar')


async function runWithBoth(input: string , output: string, shift: number) {

    const outputFileExists =  await new Promise((res, rej) => {
        fs.access(output, fs.F_OK, (error: NodeJS.ErrnoException | null) => {
            error ? rej(): res()
        });
    }).then(() => true).catch(() => false)

    const inputFileExists =  await new Promise((res, rej) => {
            fs.access(input, fs.F_OK, (error: NodeJS.ErrnoException | null) => {
                error ? rej(): res()
            });
        }).then(() => true).catch(() => false)

    return outputFileExists && inputFileExists ? await asyncPipeline(
        fs.createReadStream(input),
        async function* (source: any) {
            source.setEncoding('utf8');
            for await (const chunk of source) {
                yield moduleCaersar.pasre(chunk, shift);
            }
            yield '\n'
        },
        fs.createWriteStream(output,{flags: 'a+'}),
        ).catch(() => console.error('Something go wrong with reading or writing files'))
        : console.error(`Output or Input fife doesn't exist`)
}

async function runWithOutput(output: string, text: string) {
    const outputFileExists =  await new Promise((res, rej) => {
        fs.access(output, fs.F_OK, (error: NodeJS.ErrnoException | null) => {
            error ? rej(): res()
        });
    }).then(() => true).catch(() => false)

    outputFileExists ? await asyncPipeline(
        Readable.from(`${text} \n`),
        fs.createWriteStream(output,{flags: 'a+'}),
    ).catch(() => console.error('Something go wrong with writing file')):
        console.error(`Output fife doesn't exist`)
}

async function runWithInput(input: string, shift: number) {
    let ans = ''
    const inputFileExists =  await new Promise((res, rej) => {
        fs.access(input, fs.F_OK, (error: NodeJS.ErrnoException | null) => {
            error ? rej(): res()
        });
    }).then(() => true).catch(() => false)

    inputFileExists ? await asyncPipeline(
        fs.createReadStream(input),
        async function* (source: any) {
            source.setEncoding('utf8');
            for await (const chunk of source) {
                ans += moduleCaersar.pasre(chunk, shift);
            }
        },
        ).catch(() => console.error('Something go wrong with reading file')):
        console.error(`Input fife doesn't exist`)
    console.log(chalk.yellowBright('Here you are - '), chalk.red(ans))
}

exports.runWithBoth = runWithBoth
exports.runWithText = runWithOutput
exports.runWithInput = runWithInput
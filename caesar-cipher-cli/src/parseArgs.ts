export {}
const args: IArgs = require('minimist')(process.argv.slice(2));

interface IArgs {
    a?: string,
    action?: string,
    s?: number,
    shift?: number,
    i?: string,
    input?: string,
    o?: string,
    output?: string
}

interface IParsedArgs {
    action: string | null,
    shift: number | undefined,
    input: string | null,
    output: string | null
}

const parsedArgs: IParsedArgs = {
    action: args['a'] || args['action'] || null,
    shift: args['s'] || args['shift'],
    input: args['i'] || args['input'] || null,
    output: args['o'] || args['output'] || null
}

module.exports = {
    getValueForKey: <T extends keyof IParsedArgs> (key: T): IParsedArgs[T] => parsedArgs[key],
    getArguments: (): IParsedArgs | void => {
        if (parsedArgs.action === null || parsedArgs.shift === undefined) {
            console.error('You should pass required arguments')
            console.error('Process exit with code \x1b[33m%s\x1b[0m', 1)
            process.exit(1)
        }
        return parsedArgs
    }
}
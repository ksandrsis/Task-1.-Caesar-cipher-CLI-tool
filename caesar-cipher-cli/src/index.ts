const moduleArgs = require('./parseArgs');
const moduleDo = require('./interactive')
const moduleFiles = require('./workWithFiles')

const {shift, input, action, output} = moduleArgs.getArguments()

const finalShift = action === 'encode' ? shift: -shift

async function  start () {
    if (input && output) {
       await moduleFiles.runWithBoth(input, output, finalShift)
    } else if (input && !output) {
        await moduleFiles.runWithInput(input, finalShift)
    } else if (!input && output) {
        const parsedText = await moduleDo.interactive(action ,finalShift, true)
        await moduleFiles.runWithText(output, parsedText)
    } else {
        await moduleDo.interactive(action ,finalShift)
    }
}

start()


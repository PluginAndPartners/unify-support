import fs from 'fs'
import util from 'util'

function formatLogMessage (logMessage) {
  return `[ ${new Date().toISOString()} ] ${util.format(logMessage)}\n`
}

console.error = text => {
  const logMessage = formatLogMessage(text)

  fs.appendFileSync('./logs/debug.log', logMessage)
  process.stdout.write(logMessage)
}

console.log = text => {
  const logMessage = formatLogMessage(text)

  fs.appendFileSync('./logs/success.log', logMessage)
  process.stdout.write(logMessage)
}

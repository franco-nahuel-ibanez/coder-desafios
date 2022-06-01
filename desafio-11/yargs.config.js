const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

module.exports = args

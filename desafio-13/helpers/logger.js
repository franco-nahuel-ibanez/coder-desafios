const log4js = require("log4js")

log4js.configure({
    appenders: {
        myLogConsole: {type: "console"},
        myWarnFile: {type: "file", filename: "warn.log"},
        myErrFile: {type: "file", filename: "error.log"}
    },
    categories:{
        default: {appenders: ["myLogConsole"], level: "trace"},
        infoConsol: {appenders: ["myLogConsole"], level: "info"},
        warnFile : {appenders: ["myWarnFile"], level: "warn"},
        errorFile : {appenders: ["myErrFile"], level: "error"},
    }
})

const infoConsol = log4js.getLogger('infoConsol')
const warnFile = log4js.getLogger('warnFile')
const errorFile = log4js.getLogger('errorFile')

module.exports = {
    infoConsol,
    warnFile,
    errorFile
}
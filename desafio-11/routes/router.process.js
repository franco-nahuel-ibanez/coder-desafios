const routerProcess = require('express').Router();
const args = require('../yargs.config');
const { router } = require('./router.index');
const {fork} = require('child_process');
const path = require('path');

routerProcess.get('/info', (req, res) => {
    const data = {
        'argumentos': args,
        'plataforma': process.platform,
        'version de Node': process.version,
        'memoria': process.memoryUsage(),
        'ruta de ejecucion': process.execPath,
        'process ID': process.pid,
    }
    return res.json(data)
})

router.get('/api/randoms', (req, res) => {
    const forked = fork(path.join(__dirname, '../random.js')) 
    let num = 100000000
    if(req.query.cant){
        num = req.query.cant
    }
    forked.send(num)
    forked.on('message', (respuesta) => {
        res.send(respuesta)
    })
})

module.exports = routerProcess
// 修改server的东西
const http = require('http')

const PORT = 8000
const serverHandle = require('../app.js')

const server = http.createServer(serverHandle)
server.listen(PORT)
console.log("OK")
const crypto = require('crypto')

// 密匙
const SECRET_KEY = '@#SUNsih)Ua(a>?'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  let str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

console.log(genPassword('123'))

module.exports = {
  genPassword
}
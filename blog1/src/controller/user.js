const { exec,escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  // escape防止sql注入
  username = escape(username)
  
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `
    select username, realname from users where username='${username}' and password=${password};
  `
  // select返回的数据是数组
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
  // 先使用假数据
  // if (username === 'chenyi' && password === '123') {
  //   return true
  // }
  // return false
}

module.exports = {
  login
}
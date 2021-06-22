const { exec,escape } = require('../db/mysql')
// 用于密码加密
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  // mysql模块自带的escape函数：转义的作用，用于防止sql注入
  username = escape(username)
  
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `

  const rows = await exec(sql)
  // select返回的数据是数组
  return rows[0] || {}
  // 先使用假数据
  // if (username === 'chenyi' && password === '123') {
  //   return true
  // }
  // return false
}

module.exports = {
  login
}
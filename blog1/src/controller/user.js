const { exec } = require('../db/mysql')
const loginCheck = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
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
  loginCheck
}
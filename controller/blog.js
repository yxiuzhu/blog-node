// 解决xss攻击
const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  // 不确定author和keyword是否存在，所以需要加上where 1=1 
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return await exec(sql)
  // 先返回假数据（格式是正确的）
  // return [
  //   {
  //     id: 1,
  //     title: '标题A',
  //     content: '内容A',
  //     createTime: "1555823027999",
  //     author: 'chenyi'
  //   },
  //   {
  //     id: 2,
  //     title: '标题B',
  //     content: '内容B',
  //     createTime: "1555823070313",
  //     author: 'xiuzhu'
  //   }
  // ]
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
  // 先返回假数据
  // return {
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: "1555823027999",
  //   author: 'tianyi'
  // }
}

const newBlog = async (blogData) => {
  // blogData是一个博客对象，包含 title content author属性
  const title = xss(blogData.title)
  console.log('title is ', title)
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `

  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  // id 就是需要更新博客的 id
  // blogData是一个博客对象，包含 title content 属性

  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `

  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  // id就是要删除博客的id
  const sql = `delete from blogs where id='${id}' and author='${author}';`

  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
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
  return exec(sql)
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

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
  // 先返回假数据
  // return {
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: "1555823027999",
  //   author: 'tianyi'
  // }
}

const newBlog = (blogData) => {
  // blogData是一个博客对象，包含 title content author属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `

  return exec(sql).then(insertData => {
    console.log('insertData is ', insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 就是需要更新博客的 id
  // blogData是一个博客对象，包含 title content 属性

  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then(updateData => {
    console.log('updateData is ', updateData)
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  // id就是要删除博客的id
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  return exec(sql).then(delData => {
    console.log('delData is ', delData)
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
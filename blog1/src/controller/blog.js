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
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: "1555823027999",
    author: 'tianyi'
  }
}

const newBlog = (blogData) => {
  // blogData是一个博客对象，包含 title content 属性
  console.log('newBlog blogData...', blogData)
  return {
    id: 3 //表示新建博客，插入到数据表里面的 id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是需要更新博客的 id
  // blogData是一个博客对象，包含 title content 属性

  return true
}

const delBlog = (id) => {
  // id就是要删除博客的id
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  let keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username == null) {
      // 未登录
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
  // const result = getList(author, keyword)
  // return result.then(listData => {
  //   res.json(
  //     new SuccessModel(listData)
  //   )
  // })
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
  // const result = getDetail(ctx.query.id)
  // return result.then(data => {
  //   res.json(
  //     new SuccessModel(data)
  //   )
  // })
});

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
  // const result = newBlog(req.body)
  // return result.then(data => {
  //   res.json(
  //     new SuccessModel(data)
  //   )
  // })
})

router.post('/update', loginCheck, async (ctx, next) => {
  const cal = await updateBlog(ctx.query.id, ctx.request.body)

  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
  // const result = updateBlog(ctx.query.id, ctx.request.body)
  // return result.then(val => {
  //   if (val) {
  //     res.json(
  //       new SuccessModel()
  //     )
  //   } else {
  //     res.json(
  //       new ErrorModel('更新博客失败')
  //     )
  //   }
  // })
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const val = await delBlog(req.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
  // const result = delBlog(req.query.id, author)
  // return result.then(val => {
  //   if (val) {
  //     res.json(
  //       new SuccessModel()
  //     )
  //   } else {
  //     res.json(
  //       new ErrorModel('删除博客失败')
  //     )
  //   }
  // })
})

module.exports = router

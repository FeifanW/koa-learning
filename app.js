// 使用koa启动一个HTTP服务

const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const mount = require('koa-mount')
const util = require('util')
const compose = require('koa-compose')

const app = new Koa()

// 在最外层添加异常捕获的中间件
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = '服务端内部错误'
  }
})

app.use(ctx => {
  JSON.parse('ABCDE')
  ctx.body = 'hello koa'
})

app.on('error',err => {
  console.log("app error",err);
})

// app.use(async (ctx, next) => {
//   const data = await util.promisify(fs.readFile)('./views/index.html','utf8')
//   ctx.type = 'html'
//   ctx.body = data
//   next()
// })

// app.use(ctx => {
//   try {
//     JSON.parse('ABCDE')
//     ctx.body = 'hello koa'
//   } catch (err) {
//     // ctx.response.status = 500
//     // ctx.response.body = '服务端内部错误'
//     ctx.throw(500)
//   }
// })


app.use(
  mount('/haha',static(path.join(__dirname,'./public')))
)

const router = new Router()

// router.get('/', ctx => {
//   ctx.body = 'home page'
// })

router.get('/foo', ctx => {
  ctx.body = 'foo page'
})

router.post('/', ctx => {
  ctx.body = 'post /'
})

router.get('/bar', ctx => {
  ctx.redirect('/foo')
})

app.use(router.routes()).use(router.allowedMethods())

// Koa没有路由系统，只有中间功能
// app.use(ctx => {

//   const path = ctx.path
//   if (path === '/') {
//     ctx.body = 'home page'
//   } else if (path === '/foo'){
//     ctx.body = 'foo page'
//   } else {
//     ctx.body = 'hello koa'
//   }
// })

app.listen(3000,()=>{
  console.log("http://localhost:3000");
})
const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const router = require('./routers/router')
const logger = require('koa-logger')
const body = require('koa-body')
const { join } = require('path')
const session = require('koa-session')

// 生成 Koa 实例
const app = new Koa

app.keys = ["风屿是个大帅比"]

// session 的配置对象
const CONFIG = {
  key: "Sid",
  maxAge: 36e5,
  overwrite: true,
  httpOnly: true,
  // signed: true,
  rolling: true
  //rolling每操作一次刷新一次
}

// 注册日志模块
//app.use(logger())

// 注册session
app.use(session(CONFIG, app))

// 配置 koa-body 处理 post 请求数据
app.use(body())

// 配置静态资源目录
app.use(static(join(__dirname, "public")))

// 配置视图模板
app.use(views(join(__dirname, "views"), {
  extension: "pug"
}))



// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("项目启动成功，监听在3000端口")
})


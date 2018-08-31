const Router = require('koa-router')
//const fs = require('fs')
const router = new Router

//设计主页
router.get('/', async(ctx) =>{

    await ctx.render('index',{
        title: '假装这是一个正经的title'
    })
    
})
//动态路由，主要用来处理 用户登录  用户注册  用户退出
/*
router.get('/user/:fy', async(ctx) =>{
    ctx.body = ctx.params.fy
})
*/

router.get(/^\/user\/(?=reg|login)/, async(ctx)=>{
    //show为true则显示注册，false显示登录
    const show = /reg$/.test(ctx.path) 
    await ctx.render('register',{show})
    ctx.body = ctx.path
})


module.exports = router
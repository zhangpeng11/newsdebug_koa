const Koa = require('koa')
const app = new Koa()
const path = require('path')
const route = require('./server/route.js')
const Router = require('koa-router')
const static = require('koa-static')

const staticPath = './dist'
let router = new Router()

app.use(static(path.join( __dirname,  staticPath)))

router.use('/webnewsdev/api', route.routes(), route.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(8889)
console.log('start-quick is starting at port 8889')

const Koa = require('koa')
const app = new Koa()
const route = require('./src/server/route.js')
const Router = require('koa-router')

let router = new Router()

router.use('/webnewsdev/api', route.routes(), route.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(8889)
console.log('[demo] start-quick is starting at port 8889')

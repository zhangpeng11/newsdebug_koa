const Router = require('koa-router')
const util = require('./util')
const request = require('request');
const querystring = require('querystring')
const esDataBase = require('./es-database')
const redisDataBase = require('./redis-database') 
const route = new Router()

route.get('/channelData', async (ctx)=>{
    let env = ctx.query.env
    let url = util.get_domain_str(env) + '/channel/list/v2?env='+env
    ctx.body = await request(url, (err, data)=>{
        if(err){
            console.trace(err)
            return err
        } else {
            return data
        }
    })
})

route.get('/newsData/:cid', async (ctx)=>{
    let env = ctx.query.env
    let url = util.get_domain_str(env) + '/article/feed/'+ctx.params.cid+'/?'+querystring.stringify(ctx.query)+'&appid=com.newstimejp.ios.news&phonetype=__web__'
    ctx.body = await request(url, (err, data)=>{
        if(err){
            console.trace(err)
            return err
        } else {
            return data
        }
    })
})

route.get('/newsDetail/', async (ctx)=>{
    let env = ctx.query.env
    let url = util.get_domain_str(env)+'/article/detail/?'+querystring.stringify(ctx.query);
    ctx.body = await request(url, (err, data)=>{
        if(err){
            console.trace(err)
            return err
        } else {
            return data
        }
    })
})

route.get('/newsQuery/', async (ctx)=>{
    let env = ctx.query.env
    let url = util.get_domain_str(env)+'/search/query/?'+querystring.stringify(ctx.query);
    ctx.body = await request(url, (err, data)=>{
        if(err){
            console.trace(err)
            return err
        } else {
            return data
        }
    })
})

route.get('/esNewsData/', async (ctx)=>{
    let item_id = ctx.query.item_id;
    let index_json = {
        'article': 'news',
        'video': 'videonewsswitch'
    }
    let esNewsData = ['article','video'].map(type=>{
        return esDataBase.search({
            index: index_json[type],
            type: type,
            body: {
                query: {
                    match: {
                        'id': item_id
                    }
                }
            }
        })
    })
})

route.get('/redisNewsData/', async (ctx)=>{
    let item_id = ctx.query.item_id;
    let redis_result = new Promise((resolve, reject) => {
        redisDataBase.hgetall('Article#'+item_id, (err,data)=>{
            if(err){
                logger.error(err);
                res.end();
                reject();
            }
            resolve(data);
        })
    })
})

route.get('/newsData/', async (ctx)=>{
    let item_id = ctx.query.item_id;
    let redis_result = new Promise((resolve, reject) => {
        redisDataBase.hgetall('Article#'+item_id, (err,data)=>{
            if(err){
                logger.error(err);
                res.end();
                reject();
            }
            resolve(data);
        });
    });
    let index_json = {
        'article': 'news',
        'video': 'videonewsswitch'
    }
    let result_list = ['article','video'].map(type=>{
        return esDataBase.search({
            index: index_json[type],
            type: type,
            body: {
                query: {
                    match: {
                        'id': item_id
                    }
                }
            }
        })
    });
    result_list = [...result_list, redis_result]
    ctx.body = await Promise.all(result_list)
        .then((response)=>{
            // res.render('news/web/dev/news_data',{
            //     data: response,
            //     env: ctx.query.env
            // });
            res.send(response);
            return ; 
        })
        .catch((err)=>{
            console.trace(err);
        })
})

module.exports = route

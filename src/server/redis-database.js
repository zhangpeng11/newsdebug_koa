// 连接redis数据库
var redis = require('redis');
var redisClient = redis.createClient('6388','10.0.1.40');
//var client = redis.createClient('6388','10.0.1.135');
redisClient.on('connect',function(){
    console.log('redis connect');
}).on('error',function() {
    console.log('redis connect fail');
});

module.exports = redisClient;
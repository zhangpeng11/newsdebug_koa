// 连接elasticsearch数据库
const elasticsearch = require('elasticsearch');
const esClient = elasticsearch.Client({
    host: ['10.0.1.170:9200','10.0.2.171:9200']
});
esClient.ping({
    requestTimeout: 30000,
}, function (error) {
if (error) {
    console.error('elasticsearch cluster is down!');
} else {
    console.log('elasticsearch connect!');
}
});

module.exports = esClient;
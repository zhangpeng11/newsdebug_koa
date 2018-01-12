<template>
  <div class="content">
    <news-header></news-header>
    <el-container class="content_container">
        <el-main class="dataText">
            redis:
            <pre>{{newsData['redisdata']}}</pre>
            es:
            <pre>{{newsData['esdata']}}</pre>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import newsHeader from './Header.vue'
import axios from 'axios'
import util from '../assets/util'

export default {
    data () {
        return {
            newsData:{}
        }
    },
    mounted(){
        this.getData()
    },
    computed: {
        urlQuerys () {
            let query = util.get_url_strs(window.location.href)
            return query
        }
    },
    components:{
        newsHeader: newsHeader
    },
    methods: {
        getData () {
            axios.all([this.getRedisData(),this.getESData()]).then(axios.spread((acct, perms)=>{
                console.log(acct)
                console.log(perms)
            })).catch((err)=>{
                console.trace(err)
            })
        },
        getESData () {
            axios.get('/webnewsdev/api/newsDetail/?aid='+this.urlQuerys.aid+'&env='+this.urlQuerys.env)
                .then((response)=>{
                    this.$set(this.newsData, 'esdata', response.data.data) 
                })
                .catch((err)=>{
                    console.trace(err)
                })
        },
        getRedisData () {
            axios.get('/webnewsdev/api/newsDetail/?aid='+this.urlQuerys.aid+'&env='+this.urlQuerys.env)
                .then((response)=>{
                    this.$set(this.newsData, 'redisdata', response.data.data) 
                })
                .catch((err)=>{
                    console.trace(err)
                })
        }
    }
}
</script>

<style scoped>
    .content_container {
        width: 100%;
        height: 100%;
        background-color: #eee;
    }
    .dataText{
        width: 80%;
        margin: 0 10%;
        background-color: #fff;
        text-align: left;
    }
</style>

<template>
  <el-col class="newsItem">
    <div style="overflow:hidden" @click="turnNewsDetail(itemData.aid, $event)">
        <p class="newsTitle" ref="newsTitle"></p>
        <div class="picBox" v-if="itemData.image.urls.length > 0">
            <img :src="itemData.image.urls[0]">
        </div>
        <div class="newsInfo">
            <span>{{itemData.source_name}}</span>
            <span>article_id : {{itemData.aid}}</span>
            <span>item_id :{{item_id[0]}}</span>
            <router-link to="/bar">news data is here!</router-link>
        </div>
    </div>
  </el-col>
</template>

<script>
import util from '../assets/util'
import router from '../router/index'
import hashids from '../assets/hashids'

export default {
    data () {
        return {

        }
    },
    mounted(){
        this.$refs.newsTitle.innerHTML = this.itemData.title
    },
    props:['itemData'],
    computed:{
        item_id () {
            let hash = new hashids('D6QvCfxdSCMjaA')
            return hash.decode(this.itemData.aid)
        }
    },
    methods: {
        turnNewsDetail (aid,event) {
            if(event.target.tagName != "DIV"){
                return 
            }
            window.open('/webnewsdev/news_detail_server?aid='+aid+'&env='+util.get_url_strs(location.href).env)
        }
    }
}
</script>

<style>
 .newsItem{
        border-bottom: solid 1px #e6e6e6;
        height: 270px;
        position: relative;
        padding-top: 20px;
        overflow: hidden
    }
    .newsTitle{
        position: absolute;
        left: 30px;
        top: 15px;
        width: 500px;
        text-align: left; 
    }
    .newsTitle em{
        color: #409EFF;
        font-style: inherit;
        font-weight: bolder;
    }
    .picBox{
        margin: 0 20px 20px 20px;
        height: 220px;
        float: right;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        background-color: #eee;
    }
    .picBox img{
        height: 100%;
    }
    .newsInfo{
        position: absolute;
        left: 30px;
        bottom: 15px;
    }
    .newsInfo span{
        margin-right: 20px;
        font-size: 12px;
    }
</style>

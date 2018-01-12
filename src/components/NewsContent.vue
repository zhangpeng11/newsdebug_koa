<template>
  <el-main class="content_main">
    <div v-if="type == 0" class="news_content" ref="news_content"></div>
    <video-content v-else-if="type==1" :contentData="contentData"></video-content>
    <pic-content v-else-if="type=2" :contentData="contentData"></pic-content>
    <div class="button_area">
        <el-button type="primary" @click="originWebsite()">read this on the web!</el-button>
        <el-button type="primary" @click="jsonData()">news data is here!</el-button>
    </div>
  </el-main>
</template>

<script>
import axios from 'axios'
import util from '../assets/util'
import videoContent from './VideoContent'
import picContent from './PicContent'

export default {
    data () {
        return {
            type: 0,
            contentData:{}
        }
    },
    mounted (){
        this.getContent()
    },
    computed: {
        urlQuerys () {
            let query = util.get_url_strs(window.location.href)
            return query
        }
    },
    components:{
        videoContent: videoContent,
        picContent: picContent
    },
    methods:{
        getContent () {
            let self = this
            axios.get('/webnewsdev/api/newsDetail/?aid='+this.urlQuerys.aid+'&env='+this.urlQuerys.env)
                .then((response)=>{
                    self.type = response.data.data.article.type
                    self.contentData = response.data.data
                    if(response.data.data.article.type == 0){
                        let content = document.createElement('div')
                        content.innerHTML = response.data.data.article.content
                        this.$refs.news_content.append(content)
                        document.getElementsByClassName('source_pic')[0].children[0].setAttribute('src',response.data.data.article.source_pic)
                        let content_img = document.getElementById('news_body').getElementsByTagName('img')
                        for(let i = 0; i < content_img.length; i++){
                            content_img[i].setAttribute('src',response.data.data.article.detail_image_urls[i])
                        }
                    }
                })
                .catch((err)=>{
                    console.trace(err)
                })
        },
        originWebsite(){
            if(this.type == 1){
                window.open(this.contentData.article.original_site_url)
            } else if(this.type == 0){
                window.open(this.contentData.article.url)
            } else if(this.type == 2){
                window.open(this.contentData.article.share_url)
            }
        },
        jsonData(){
            window.open('/#/webnewsdev/news_data_server?aid='+this.urlQuerys.aid+'&env='+this.urlQuerys.env)
        }
    }
}
</script>

<style>
    .content_main{
        width: 60%;
        margin: 0 20%;
        background-color: #fff;
    }
    #news_top {
        margin-bottom: 20px;
    }
    .news_title {
        font-size: 18px;
        font-weight: bolder;
        line-height: 25px;
        margin-bottom: 7px;
        color: #2f2f2f;
        text-align: left;
    }
    .news_source {
        line-height: 34px;
        height: 34px;
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        color: #666;
        position: relative;
    }
    .source_pic {
        height: 100%;
        margin-right: 9px;
    }
    .source_pic img {
        height: 100%;
    }
    .source_name {
        font-size: 11px;
    }
    .source_time {
        position: absolute;
        right: 0;
    }
    .source_time span {
        height: 34px;
        display: inline-block;
        font-size: 12px;
        vertical-align: bottom;
    }
    .source_time span {
        height: 34px;
        display: inline-block;
        font-size: 12px;
        vertical-align: bottom;
    }

    #news_body{
        overflow: hidden;
        display: block;
        font-size: 16px;
        color: #2f2f2f;
        line-height: 28px;
        margin-bottom: 20px;
        text-indent: 16px;
        word-break: break-all;
        text-align: left;
    }
    #news_body img {
        display: block;
        width: 70%;
        height: 70%;
        margin: 20px auto;
    }
    .button_area{
        border-top: 1px solid #f0f0f0;
        height: 100px;
        line-height: 90px;
        text-align: right;
    }
</style>

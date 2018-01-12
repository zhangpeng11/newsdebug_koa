<template>
<div>
    <div id="news_top">
        <h1 class="news_title">{{contentData.article.title}}</h1>
        <div class="news_source">
        <div class="source_pic">
            <img :src="contentData.article.source_pic">
        </div>
        <div class="source_name">{{contentData.article.source_name}}</div>
        <div class="source_time">
            <span class="news_date">{{newsDate}}</span>
            <span class="news_time">{{newsTime}}</span>
        </div>
        </div>
    </div>
    <div id="news_body">
        <div id="player" :videoid="this.contentData.article.y_video_id"></div>
    </div>
</div>
</template>

<script>
import youtube from '../assets/youtube'
import util from '../assets/util'

export default {
    data (){
        return{

        }
    },
    mounted(){
        window.mounted = true
    },
    props:['contentData'],
    computed:{
        newsDate () {
            return util.format_date(this.contentData.article.published_at,"yyyy-MM-dd")
        },
        newsTime () {
            return util.format_date(this.contentData.article.published_at,"HH:mm:ss")
        }
    }
}
</script>

<style>
    #player{
        display: block;
        margin: 0 auto;
    }
</style>

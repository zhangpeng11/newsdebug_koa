<template>
    <article-item v-if="itemData.type == 0" :itemData="itemData"></article-item>
    <video-item  v-else-if="itemData.type == 1" :itemData="itemData"></video-item>
    <pic-item  v-else-if="itemData.type == 2" :itemData="itemData"></pic-item>
    <article-item v-else :itemData="itemData"></article-item>
</template>

<script>

import articleItem from './ArticleItem.vue'
import videoItem from './VideoItem.vue'
import picItem from './PicItem.vue'
import hashids from '../assets/hashids'

export default {
    data () {
        return {

        }
    },
    components:{
        articleItem: articleItem,
        videoItem: videoItem,
        picItem: picItem
    },
    props:['itemData']
}
</script>

<style>
    .newsItem{
        border-bottom: solid 1px #e6e6e6;
        height: 270px;
        position: relative;
        padding-top: 20px;
        overflow: hidden;
    }
    .newsTitle{
        position: absolute;
        left: 30px;
        top: 15px;
        width: 500px;
        text-align: left; 
    }
    .picBox{
        margin: 0 20px 20px 20px;
        width: 320px;
        height: 220px;
        float: right;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        box-shadow: 5px 5px 5px #555555;
        border-bottom: solid 1px #e6e6e6;
    }
    .picBox img{
        overflow: hidden;
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
    .video_icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 1.92rem;
        height: 1.92rem;
        background-size: contain;
        background-image: url(data:image/png;base64,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);
    }
</style>

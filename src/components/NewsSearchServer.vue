<template>
  <div class="searchMain" ref="searchMain">
      <div class="searchInput">
        <input type="text" ref="searchInput">
        <div class="searchIcon el-icon-search"></div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文章" name="article">
            <search-list :type="activeName" :data="newsData[activeName].data" :key="activeName"></search-list>
            <div class="loadmore" v-show="newsData[activeName].loading"></div>
            <div class="nodata" v-show="newsData[activeName].nodata">没有更多了。。。</div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="video">
            <search-list :type="activeName" :data="newsData[activeName].data" :key="activeName"></search-list>
            <div class="loadmore" v-show="newsData[activeName].loading"></div>
            <div class="nodata" v-show="newsData[activeName].nodata">没有更多了。。。</div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import newsHeader from './Header.vue'
import searchList from './SearchList.vue'
import bus from '../assets/bus'
import axios from 'axios'
import util from '../assets/util'

export default {
    data() {
      return {
        activeName: 'article',
        newsData: {
            'article':{
                page_no: 1,
                type: 0,
                loading: false,
                nodata: false,
                data: []
            },
            'video':{
                page_no: 1,
                type: 1,
                loading: false,
                nodata: false,
                data: []
            }
        },
        loadmoreBtn: false,
        keyword:''
      }
    },
    mounted (){
        this.keyword = decodeURI(this.urlQuerys.keyword)
        this.$refs.searchInput.value = decodeURI(this.urlQuerys.keyword) || ''
        this.searchArticleData()
        this.loadmore()
        this.search()
    },
    computed: {
        typeCode (){
            if(this.activeName == 'video'){
                return 1
            } else {
                return 0
            }
        },
        urlQuerys () {
            let query = util.get_url_strs(window.location.href)
            return query
        }
    },
    methods: {
        handleClick(tab, event) {
            this.searchArticleData()
        },
        searchArticleData () {
            let self = this
            if(self.newsData[self.activeName].loading || self.newsData[self.activeName].nodata){
                return 
            }
            self.$set(self.newsData[self.activeName], 'loading',  true)
            axios.get('/webnewsdev/api/newsQuery?keyword='+this.keyword+'&env='+this.urlQuerys.env+'&type='+this.typeCode+'&page_no='+this.newsData[this.activeName].page_no)
                .then((response)=>{
                    self.$set(self.newsData[self.activeName], 'loading',  false)
                    if(response.data.status == 1){
                        if(!response.data.data.has_more){
                            self.$set(self.newsData[self.activeName], 'nodata',  true)
                        }
                        self.$set(self.newsData[self.activeName], 'page_no',  self.newsData[self.activeName].page_no + 1)
                        self.$set(self.newsData[self.activeName], 'data', [ ...self.newsData[self.activeName].data, ...response.data.data.matched_results])
                    }
                })
                .catch((err)=>{
                    console.trace(err)
                })
            },
        loadmore () {
            let self = this
            window.onscroll = ()=>{
                if(document.body.scrollTop+ document.documentElement.scrollTop + window.innerHeight + 1000 > self.$refs.searchMain.offsetHeight){
                    self.loadmoreBtn = true
                    self.searchArticleData()
                }
            }
        },
        search () {
            let self = this
            this.$refs.searchInput.addEventListener('keyup',(e)=>{
                if(e.keyCode == 13){
                    self.$set(self.newsData['article'], 'nodata',  false)
                    self.$set(self.newsData['video'], 'nodata',  false)                    
                    self.$set(self.newsData['article'], 'data',  [])
                    self.$set(self.newsData['video'], 'data',  [])
                    self.keyword = self.$refs.searchInput.value
                    self.searchArticleData()
                }
            })
        }
    },
    components: {
      newsHeader: newsHeader,
      searchList: searchList
    }
}
</script>

<style>
.searchMain{
    padding: 100px;
    padding-bottom: 0;
    background-color: #f0f0f0;
}
.searchInput{
    width:  600px;
    height: 30px;
    margin-bottom: 30px;
    background-color: #fff;
    height: 44px;
    vertical-align: top;
    border-radius: 2px;
    position: relative;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.searchInput input{
    width: 526px;
    height: 30px;
    padding-left: 30px;
    padding-right: 44px;
    background-color: #fff;
    font-size: 20px;
    height: 44px;
    border: none;
    outline: none;
    background: #fff;
}
.searchIcon{
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    width: 44px;
    height: 44px;
    line-height: 44px;
    background-size: cover;
    display: inline-block;
}
.searchIcon:active{
    background-color: #eee;
}
.loadmore{
    top: 0px !important;
}
.nodata{
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}
</style>

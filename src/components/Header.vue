<template>
  <el-header>
    <h1>公共服务平台</h1>
    <div class="searchBox">
        <input type="text" placeholder="输入搜索的内容" ref="searchInput">
        <a class="searchBtn el-icon-search"></a>
    </div>
  </el-header>
</template>

<script>
import router from '../router/index'
import util from '../assets/util'

export default {
  data (){
      return {

      }
  },
  mounted (){
    this.$refs.searchInput.addEventListener('keyup',(e)=>{
        if(e.keyCode == '13'){
            this.directSearchList()
        }
    })
  },
  methods: {
      directSearchList () {
          let keyword = this.$refs.searchInput.value
          window.open('/webnewsdev/news_search_server?keyword='+keyword+'&env='+util.get_url_strs(location.href).env)
      }
  }
}
</script>

<style>
    .el-header{
        display: flex;
        align-items: center;
        justify-content: left;
        box-shadow: 0 0 1px 0px rgba(0,0,0,0.3), 0 0 6px 2px rgba(0,0,0,0.15);
        background: rgba(255,255,255,0.94);
        margin-bottom: 2px;
    }
    .el-header h1{
        position: relative;
        left: 50px;
        color: #2c3e50;
        font-size: 30px;
        text-shadow: 0px 1px 1px #2c3e50;
    }
    .searchBox{
        position: absolute;
        right: 50px;
        height: 40px;
        line-height: 40px;
        border-radius: 30px;
        width: 200px;
        background-color: #f0f0f0;
    }
    .searchBox input{
        border: none;
        outline: none;
        background: #eee;
    }
    .searchBox a{
        cursor: pointer;
    }
    .searchBox a:active{
        background-color: #f0f0f0;
    }
</style>

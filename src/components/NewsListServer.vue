<template>
  <div class="main">
    <news-header></news-header>
    <el-container style="height: 100%; border: 1px solid #eee">
      <nav-bar></nav-bar>
      <news-list ref="scroll"></news-list>
    </el-container>
  </div>
</template>

<script>
import newsHeader from './Header.vue'
import navBar from './NavBar.vue'
import newsList from './NewsList.vue'

export default {
  data () {
    return {
      
    }
  },
  mounted(){

  },
  components: {
    newsHeader: newsHeader,
    navBar: navBar,
    newsList: newsList
  }
}
</script>

<style>
  .main{
    height: 100%;

  }
</style>

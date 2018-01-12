<template>
  <div class="content">
    <news-header></news-header>
    <el-container class="content_container">
        <news-content></news-content>
    </el-container>
  </div>
</template>

<script>
import newsHeader from './Header.vue'
import newsContent from './NewsContent.vue'
export default {
  data () {
      return {

      }
  },
  components:{
    newsHeader: newsHeader,
    newsContent: newsContent
  }
}
</script>

<style>
    .content{
    }
    .content_container {
        width: 100%;
        height: 100%;
        background-color: #eee;
    }
</style>

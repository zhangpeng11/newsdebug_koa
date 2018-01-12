<template>
  <el-aside class="navBar">
      <el-menu :default-openeds="['1']" default-active="1-0">
        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>文章</span>
          </template>
          <el-menu-item v-for="(item,index) in channelList" :index="'1-'+index.toString()" :key="item.chid" @click="changeCurChannel(item.chid)">{{item.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">
            <i class="el-icon-mobile-phone"></i>
            <span>视频</span>
          </template>
          <el-menu-item v-for="(item,index) in vChannelList" :index="'2-'+index.toString()" :key="item.chid" @click="changeCurChannel(item.chid)">{{item.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
  </el-aside>
</template>

<script>
import axios from 'axios'
import bus from '../assets/bus'
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getChannelData()
  },
  computed: mapState([
    'curChid','channelList','vChannelList'
  ]),
  methods: {
    getChannelData () {
      axios.get('/webnewsdev/api/channelData')
        .then((response)=>{
          if(response.data.status == 1){
            this.$store.commit('changeCurChid',response.data.data.channels[0].chid)
            this.$store.commit('changeChannelList',response.data.data.channels)
            this.$store.commit('changevChannelList',response.data.data.v_channels)
            bus.$emit('changeChannel')
          }
        }).catch((err)=>{
            console.log(err)
        })
    },
    changeCurChannel (chid) {
      this.$store.commit('changeCurChid',chid)
      bus.$emit('changeChannel')
    }
  }
}
</script>

<style>
  .el-aside{
    border-right: solid 1px #e6e6e6;
  }
  /* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  } */
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    height: 30px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<template>
  <el-container>
    <el-aside :width="openNavList?'220px':'60px'" class="left">
      <div class="logo_img">
        <img :src="openNavList?bigImg:smileImg" alt="">
      </div>
      <navList></navList>
    </el-aside>

    <el-container class="right">
      <el-header class="header">
        <Header></Header>
      </el-header>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/interceptor/eventBus'
export default {
  data () {
    return {
      openNavList: true,
      bigImg: require('../../assets/logo.png'),
      smileImg: require('../../assets/toutiao.png')
    }
  },
  mounted () {
    eventBus.$on('openOrClose', () => {
      this.openNavList = !this.openNavList
    })
  }
}
</script>

<style scoped lang="less">
.left{
  min-height: 100vh;
  background: #323745;
  transition: all 0.3s;
  .logo_img{
    text-align: center;
    margin: 10px 0;
    img{
      height: 30px;
    }
  }
}
.right{
  .header{
    background: FFFFFF;
  }
  .main{
    background: #F2F3F5;
  }
}
</style>

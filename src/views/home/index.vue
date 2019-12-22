<template>
  <el-container>
    <el-aside width="220px" class="left">
      <div class="logo_img">
        <img src="../../assets/logo.png" alt="">
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

export default {

}
</script>

<style scoped lang="less">
.left{
  min-height: 100vh;
  background: #323745;
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

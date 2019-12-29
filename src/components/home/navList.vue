<template>
  <el-menu background-color="#353B4E" text-color="#ADAFB5" active-text-color="#fff" :unique-opened="true" router :collapse="!openNavList">
      <el-menu-item index="/home">
          <i class='el-icon-s-home'></i>
          <span>首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template  slot="title">
          <i class='el-icon-document-copy'></i>
          <span>内容管理</span>
        </template>

        <el-menu-item index="/home/publish">
            发布文章
        </el-menu-item>
        <el-menu-item index="/home/mounted_list">
            内容列表
        </el-menu-item>
        <el-menu-item index="/home/comment_list">
            评论列表
        </el-menu-item>
        <el-menu-item index="/home/material_mag">
            素材管理
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template  slot="title">
          <i class='el-icon-female'></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item  index="/fans">
            图文数据
        </el-menu-item>
        <el-menu-item  index="/404">
            粉丝概况
        </el-menu-item>
        <el-menu-item  index="3-3">
            粉丝画像
        </el-menu-item>
        <el-menu-item  index="3-4">
            粉丝列表
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/home/userinfo">
          <i class='el-icon-s-custom'></i>
          <span>账户信息</span>
      </el-menu-item>
  </el-menu>
  <!-- <el-menu :default-active="$route.path"
         :unique-opened="true"
         class="el-menu-demo"
         background-color="rgba(0,0,0,0)"
         text-color="#fff"
         active-text-color="#ffd04b"
>

      <el-menu-item index="1">业务列表</el-menu-item>

  <el-submenu index="2">
      <span slot="title">内容管理</span>
    <el-menu-item-group>
      <el-menu-item index="2-1">
        发布文章
      </el-menu-item>
      <el-menu-item index="2-2">内容列表</el-menu-item>
      <el-menu-item index="2-3">评论列表</el-menu-item>
      <el-menu-item index="2-4">素材管理</el-menu-item>
    </el-menu-item-group>
  </el-submenu>

  <el-submenu index="3">
      <span slot="title">粉丝管理</span>
    <el-menu-item-group>
      <el-menu-item index="3-1">图文数据</el-menu-item>
      <el-menu-item index="3-2">粉丝概况</el-menu-item>
      <el-menu-item index="3-3">粉丝画像</el-menu-item>
      <el-menu-item index="3-4">粉丝列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>

  <el-menu-item index="4">大数据中心</el-menu-item>
</el-menu> -->
</template>

<script>
import eventBus from '@/interceptor/eventBus'
export default {
  data () {
    return {
      openNavList: true
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

.el-submenu{
    .el-menu-item:hover{
        background-color: #409EFF !important;
        color: #fff !important;
    }
    .el-menu-item.is-active {
      background-color: #409EFF !important;
    }
    .el-menu-item{
      height: 35px;
      line-height: 35px;
    }
}
.el-menu{
  border:0
}
</style>

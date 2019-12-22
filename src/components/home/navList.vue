<template>
  <el-menu background-color="#353B4E" text-color="#ADAFB5" active-text-color="#fff" :unique-opened="true" router>
      <el-menu-item index="/home">
          首页
      </el-menu-item>

      <el-submenu index="2">
        <span slot="title">内容管理</span>
        <el-menu-item index="2-1">
            发布文章
        </el-menu-item>
        <el-menu-item index="2-2">
            内容列表
        </el-menu-item>
        <el-menu-item index="/home/comment_list">
            评论列表
        </el-menu-item>
        <el-menu-item index="2-4">
            素材管理
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <span slot="title">粉丝管理</span>
        <el-menu-item  index="3-1">
            图文数据
        </el-menu-item>
        <el-menu-item  index="3-2">
            粉丝概况
        </el-menu-item>
        <el-menu-item  index="3-3">
            粉丝画像
        </el-menu-item>
        <el-menu-item  index="3-4">
            粉丝列表
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="4">
          账户信息
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
export default {

}
</script>

<style scoped lang="less">
.el-menu-item.is-active {
   background-color: #409EFF !important;
}
.el-menu--inline{
    .el-menu-item:hover{
        background-color: #409EFF !important;
        color: #fff !important;
    }
}

</style>

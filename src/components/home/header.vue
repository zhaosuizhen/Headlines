<template>
  <el-row type="flex" align="middle">
    <el-col :span="12">
      <i class="el-icon-s-fold"></i>
      <span>饱了么？</span>
      </el-col>
    <el-col :span="12">
      <el-row type="flex" justify="end" align="middle">

        <img :src="user_info.photo ? user_info.photo : defaultImg" alt="">

        <el-dropdown @command="clickMenu">
          <span class="el-dropdown-link">
            {{user_info.name}}<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="GITaddress">git地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user_info: {},
      defaultImg: require('../../assets/avatar.jpg')
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'userInfo') {
        console.log('这里应该显示个人信息')
      } else if (command === 'GITaddress') {
        console.log('这里应该跳转到个人GitHub网页')
      } else {
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.$axios({
      url: '/user/profile'
    }).then(res => {
      this.user_info = res.data
    })
  }
}
</script>

<style scoped lang="less">
.el-row{
  height: 60px;
  font-size: 20px;
  .el-icon-s-fold{
    cursor: pointer;
    margin-right: 15px;
  }
  img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
}

</style>

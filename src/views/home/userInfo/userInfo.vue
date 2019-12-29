<template>
  <el-card>
    <Bread slot="header">
        <span slot="title_1">账户信息</span>
    </Bread>

    <el-form :model="formData" :rules="rules" label-width="100px">
        <el-form-item prop="name" label="用户名">
            <el-input v-model="formData.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="用户简介">
            <el-input v-model="formData.intro" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
            <el-input v-model="formData.email" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="用户手机">
            <el-input disabled v-model="formData.mobile" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>

    <el-upload :http-request="uploadImg" action="" :show-file-list="false">
        <img class="userPhoto" :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-upload>

  </el-card>
</template>

<script>
import eventBus from '@/interceptor/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名长度在1到7之内' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }
        ]
      },
      defaultImg: require('../../../assets/avatar.jpg')
    }
  },
  methods: {
    async uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.loading = false // 关闭弹层
      this.formData.photo = result.data.photo // 给当前的头像赋值
      // 认为保存成功 => 通知header组件 更新信息
      eventBus.$emit('updateUserInfo')
    },
    async saveUserInfo () {
      await this.$axios({
        method: 'patch',
        url: '/user/profile',
        data: this.formData
      })
      this.$message({
        type: 'success',
        message: '保存信息成功'
      })
      eventBus.$emit('updateUserInfo')
    },
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.userPhoto{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 170px;
    right: 140px;
    cursor: pointer;
}
</style>

<template>
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="素材库" name="material">
        <el-radio-group v-model="radioDef" @change="changeImg">
            <el-radio-button :label="0">全部</el-radio-button>
            <el-radio-button :label="1">收藏</el-radio-button>
        </el-radio-group>
            <div class="imgBox">
                <el-card v-for="item in list" :key="item.id" class="imgCard">
                    <img v-if="active === item.id?true:false" class="select" src="../../assets/selected.png" alt="">
                    <img @click="clickCard(item)" :src="item.url" alt="">
                </el-card>
            </div>

            <el-row type="flex" justify="center">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    @current-change="currentChange">
                </el-pagination>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top:20px">
                <el-button @click="closeDia">取消</el-button>
                <el-button @click="determineImg" type="primary">确定</el-button>
            </el-row>
    </el-tab-pane>

    <el-tab-pane label="上传图片" name="upload">
      <el-row type="flex" justify="center">
        <img style="width:500px;height:500px" :src="updataImgUrl?updataImgUrl:defaultImg" alt="">
      </el-row>
      <el-row>
        选择上传图片
        <el-upload action="" :http-request="uploadImg" :show-file-list="false">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-row>

      <el-row type="flex" justify="center">
        <el-button @click="closeDia">取消</el-button>
        <el-button @click="updateImg" type="primary">确定</el-button>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { uploadImg, getImgList } from '@/actions/material_mag'
import eventBus from '@/interceptor/eventBus.js'
export default {
  props: {
    clickImgNum: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'),
      updataImgUrl: '',
      active: -1,
      activeName: 'material',
      radioDef: 0,
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      },
      choiceImgUrl: ''
    }
  },
  methods: {
    async uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file) // 加入参数
      let result = await uploadImg(data)
      this.updataImgUrl = result.data.url
      console.log(this.updataImgUrl)
    },
    defaultData () {
      this.active = -1
      this.updataImgUrl = ''
      this.choiceImgUrl = ''
      this.activeName = 'material'
    },
    // 上传确定按钮
    updateImg () {
      this.$emit('inmInfo', this.updataImgUrl, this.clickImgNum)
      this.defaultData()
      eventBus.$emit('closeDia')
    },
    //   点击确定按钮
    determineImg () {
      this.$emit('inmInfo', this.choiceImgUrl, this.clickImgNum)
      this.defaultData()
      eventBus.$emit('closeDia')
    },
    // 点击取消按钮
    closeDia () {
      this.defaultData()
      eventBus.$emit('closeDia')
    },
    clickCard (item) {
      this.active = item.id
      this.choiceImgUrl = item.url
    },
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getImgList(0)
    },
    changeImg () {
      this.getImgList()
    },
    async getImgList () {
      let result = await getImgList({
        collect: this.radioDef,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getImgList()
  }
}
</script>

<style lang='less' scoped>
.imgBox{
    width: 720px;
    display: flex;
    flex-wrap: wrap;
    .imgCard{
        width: 150px;
        height: 150px;
        margin: 20px 14px;
        box-sizing: content-box;
            img{
                width: 130px;
                height: 130px;
                margin-left: -10px;
                margin-top: -10px;
            }
            .select{
                position: absolute;
                width: 110px;
                height: 110px;
                margin-left: 5px;
                margin-top: 5px;
            }
    }
}
</style>

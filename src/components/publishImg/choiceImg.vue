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
        配置管理
    </el-tab-pane>
  </el-tabs>
</template>

<script>
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
    //   点击确定按钮
    determineImg () {
      this.$emit('inmInfo', this.choiceImgUrl, this.clickImgNum)
      eventBus.$emit('closeDia')
    },
    // 点击取消按钮
    closeDia () {
      this.active = -1
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
    getImgList () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.radioDef,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
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

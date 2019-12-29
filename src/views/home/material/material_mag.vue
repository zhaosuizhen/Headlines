<template>
  <el-card>
    <Bread slot="header">
        <span slot="title_1">内容管理</span>
        <span slot="title_2">素材管理</span>
    </Bread>

    <el-row>
        <el-col>
            <el-row type="flex" justify="end">
                    <el-upload action="" :http-request="UploadImg" :show-file-list="false">
                      <el-button size="small" type="primary" >点击上传</el-button>
                    </el-upload>
            </el-row>
        </el-col>

        <el-col align="bottom" >
            <el-tabs v-model="default_material" @tab-click="handleClick" v-loading="loading">
                <el-tab-pane label="全部素材" name="all">
                  <div class="img_list">
                    <el-card class="img_card" v-for="(item,index) in img_list" :key="item.id">
                      <img @click="openDia(index)" :src="item.url" alt="">
                      <el-row class="btn" type="flex" align="middle" justify="space-around">
                        <i @click="shoucang(item)" class="el-icon-star-on" :style = "{ color:item.is_collected ? 'red' : '#000'}"></i>
                        <i @click="shanchu(item.id)" class="el-icon-delete-solid"></i>
                      </el-row>
                    </el-card>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="我的收藏" name="collection">
                  <div class="img_list">
                    <el-card class="img_card" v-for="item in img_list" :key="item.id">
                      <img :src="item.url" alt="">
                    </el-card>
                  </div>
                </el-tab-pane>
            </el-tabs>

        </el-col>

    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.per_page"
        :current-page="page.current_page"
        :total="page.total"
        @current-change="pageChange"
        >
      </el-pagination>
    </el-row>
    <el-dialog @opened="openEnd" :visible="dialogVisible" @close="closeDia">
        <el-carousel ref="myCarosel" indicator-position="outside" height="500px">
         <el-carousel-item v-for="(item,index) in img_list" :key="index">
           <img style="width:100%;height:100%" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      loading: false,
      default_material: 'all',
      img_list: [],
      page: {
        total: 0,
        current_page: 1,
        per_page: 8
      },
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarosel.setActiveItem(this.clickIndex)
    },
    closeDia () {
      this.dialogVisible = false
      this.clickIndex = -1
    },
    openDia (index) {
      this.clickIndex = index
      this.dialogVisible = true
    },
    handleClick (tab, event) {
      this.page.current_page = 1
      this.getImgList()
    },
    async getImgList () {
      this.loading = true
      let result = await this.$axios({
        url: '/user/images',
        params: {
          collect: this.default_material === 'collection',
          page: this.page.current_page,
          per_page: this.page.per_page
        }
      })
      this.page.total = result.data.total_count
      this.img_list = result.data.results
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    pageChange (newPage) {
      this.page.current_page = newPage
      this.getImgList()
    },
    async shoucang (item) {
      await this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
      this.getImgList()
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    },
    async shanchu (id) {
      await this.$axios({
        method: 'delete',
        url: `/user/images/${id}`
      })
      this.getImgList()
      this.$message({
        type: 'success',
        message: '删除成功'
      })
    },
    async UploadImg (params) {
      let fd = new FormData()
      fd.append('image', params.file)
      await this.$axios({
        method: 'post',
        url: '/user/images',
        data: fd
      })
      this.getImgList()
    }
  },

  mounted () {
    this.getImgList()
  }
}
</script>

<style scoped>
.img_list{
  display: flex;
  flex-wrap: wrap;
  /* justify-content:space-between; */
}
.img_list img{
  width: 100%;
}
.img_card{
  position: relative;
  width:200px;
  height:230px;
  overflow: hidden;
  margin: 20px 30px;
}
.btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left: -20px;
  background: rgba(255,255,255,0.8);
}
i{
  font-size: 28px;
  cursor: pointer;
}
</style>

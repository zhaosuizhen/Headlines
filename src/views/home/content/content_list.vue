<template>
  <div>
      <el-card>
        <Bread slot="header">
            <span slot="title_1">内容管理</span>
            <span slot="title_2">内容列表</span>
        </Bread>

        <el-form>
            <el-form-item label="文章状态">
                <el-radio-group v-model="searchForm.radio">
                    <el-radio-button :label="5">全部</el-radio-button>
                    <el-radio-button :label="0">草稿</el-radio-button>
                    <el-radio-button :label="1">待审核</el-radio-button>
                    <el-radio-button :label="2">审核通过</el-radio-button>
                    <el-radio-button :label="3">审核失败</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                <el-select v-model="searchForm.selectId">
                    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <el-date-picker
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    v-model="searchForm.dataRange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card class="main_box" v-loading='loading'>
        <el-row class="header" type="flex" align="middle">
            <span>共找到0条符合条件的内容</span>
        </el-row>
        <el-row v-for="item in list" :key="item.id.toString()" style="height:130px;overflow:hidden;padding:20px 0;border-bottom:1px solid #f2f3f5">
            <el-col :span="12">
                <el-row type="flex">
                    <el-col :span="8" style="min-width:150px;">
                        <img style="width:150px;height:100px" :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
                    </el-col>
                    <el-col :span="16">
                        <el-row style="height:100%;display:flex;flex-direction:column;justify-content:space-around;margin-left:20px;">
                            <span style="font-size:14px;color:#333">{{item.title}}</span>
                            <el-tag :type="item.status | filterType" style="width:60px;text-align: center;">{{item.status | filterStatus}}</el-tag>
                            <span style="font-size:12px;color:#999">{{item.pubdate}}</span>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="change_delete" type="flex" justify="end">
                    <span><i class="el-icon-edit"></i>修改</span>
                    <span><i class="el-icon-delete"></i>删除</span>
                </el-row>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle" style="height:100px;">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change='pageChange'
            style="height:32px;">
        </el-pagination>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../../assets/default.gif'),
      searchForm: {
        radio: 5,
        selectId: null,
        dataRange: []
      },
      list: [],
      channels: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    pageChange (newPage) {
      this.page.currentPage = newPage
      this.getNewArticles()
    },
    getNewArticles () {
      let params = {
        status: this.searchForm.radio === 5 ? null : this.searchForm.radio,
        channel_id: this.searchForm.selectId,
        begin_pubdate: this.searchForm.dataRange.length ? this.searchForm.dataRange[0] : null,
        end_pubdate: this.searchForm.dataRange.length > 1 ? this.searchForm.dataRange[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    getArticles (params) {
      this.loading = true
      this.$axios({
        url: 'articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        setTimeout(() => { this.loading = false }, 300)
      })
    },
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'dange'
        default:
          break
      }
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.getNewArticles()
      }
    }
  },
  mounted () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.main_box{
    margin-top:10px;
    .header{
        height: 30px;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 20px;
        box-sizing: content-box;
        span{
            font-size: 14px;
            color: #323745;
        }
    }
    .change_delete{
        font-size:12px;
        span{
            margin-left: 20px;
            cursor: pointer;
        }
    }
}
</style>

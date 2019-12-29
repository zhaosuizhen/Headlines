<template>
  <el-card>
    <Bread slot="header">
        <span slot="title_1">内容管理</span>
        <span slot="title_2">评论列表</span>
    </Bread>

    <el-table :data="tableData" v-loading="loading">
        <el-table-column label="标题" min-width="50%" prop="title"></el-table-column>
        <el-table-column label="评论状态" min-width="12%" prop="comment_status" :formatter="formatterBoolean"></el-table-column>
        <el-table-column label="总评论数" min-width="12%" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" min-width="12%" prop="fans_comment_count"></el-table-column>
        <el-table-column min-width="12%" label="操作">
            <template slot-scope="obj">
              <el-button size="small" type="text">修改</el-button>
              <el-button size="small" type="text" @click="openOrCloseComment(obj.row)">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row type='flex' justify="center" align="middle" style="height:100px">
      <el-pagination
        style="height:32px"
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="pageChange">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      loading: true
    }
  },
  methods: {
    pageChange (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    async getComment () {
      this.loading = true
      let result = await this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.tableData = result.data.results
      this.page.total = result.data.total_count
      setTimeout(() => { this.loading = false }, 300)
    },
    formatterBoolean (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    async openOrCloseComment (obj) {
      let text = obj.comment_status ? '关闭评论将清除所有评论，读者也不能再进行评论，是否进行此操作?' : '此操作将开启评论，是否进行此操作?'
      await this.$confirm(`${text}`, '提示')
      await this.$axios({
        url: '/comments/status',
        method: 'put',
        params: { article_id: obj.id.toString() },
        data: { allow_comment: !obj.comment_status }
      })
      this.$message({
        type: 'success',
        message: `${obj.comment_status ? '关闭' : '打开'}评论成功`
      })
      this.getComment()
      // .catch(() => {
      //   this.$message({
      //     type: 'error',
      //     message: `${obj.comment_status ? '打开' : '关闭'}评论失败`
      //   })
      // })
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped>

</style>

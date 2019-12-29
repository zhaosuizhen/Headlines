<template>
  <el-card>
      <Bread slot="header">
        <span slot="title_1">内容管理</span>
        <span slot="title_2">发布文章</span>
    </Bread>

    <el-form :model="publishForm" :rules="publishRules" ref="publish">
        <el-form-item label="标题" prop="title">
            <el-input style="width:60%" v-model="publishForm.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
            <!-- <quill-editor v-model="publishForm.content"></quill-editor> -->
            <quill-editor v-model="publishForm.content" style="height:300px;width:90%;margin-left:50px;"></quill-editor>
        </el-form-item>

        <el-form-item label="封面" prop="cover" style="margin-top:130px">
            <el-radio-group @change="changeImg" v-model="publishForm.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>

        <PublishImg @choiceImgUrl="choiceImgUrl" :list="publishForm.cover.images"></PublishImg>

        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="publishForm.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>

    <el-button @click="publishBtn()" type="primary">发表</el-button>
    <el-button @click="publishBtn(true)">存入草稿</el-button>
  </el-card>
</template>

<script>
import { getChannels } from '@/actions/content_list'
import { publishBtn, getContentByID } from '@/actions/publish'
export default {
  data () {
    return {
      radio: 1,
      value: '',
      channels: [],
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5, max: 30, message: '标题长度应在5到30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道必须选择' }]
      }
    }
  },
  watch: {
    $route (to, form) {
      this.publishForm = {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    choiceImgUrl (imgList) {
      this.publishForm.cover.images = imgList
    },
    changeImg () {
      if (this.publishForm.cover.type === 0 || this.publishForm.cover.type === -1) {
        this.publishForm.cover.images = []
      } else if (this.publishForm.cover.type === 1 && this.publishForm.cover.images.length !== 1) {
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3 && this.publishForm.cover.images.length !== 3) {
        this.publishForm.cover.images = ['', '', '']
      }
    },
    async getChannels () {
      let result = await getChannels()
      this.channels = result.data.channels
    },
    async publishBtn (draft) {
      await this.$refs.publish.validate()
      let id = this.$route.params.id
      let method = id ? 'put' : 'post'
      let url = id ? `articles/${id}` : 'articles'
      await publishBtn(method, url, { draft }, this.publishForm)
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/home/mounted_list')
    },
    async getContentByID (id) {
      let result = await getContentByID(id)

      this.publishForm = result.data
    }
  },
  mounted () {
    this.getChannels()
    let articleID = this.$route.params.id
    articleID && this.getContentByID(articleID)
  }
}
</script>

<style>

</style>

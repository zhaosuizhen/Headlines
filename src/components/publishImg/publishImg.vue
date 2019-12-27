<template>
    <div class='cover-image'>
        <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class='cover-image-item'>
            <img :src="list.length === imgList.length && imgList[index]? imgList[index] : defaultImg" alt="">
            {{listLen}}
        </div>
        <el-dialog :visible="dialog" title="选择封面图片" @close="closeDialog" >
          <ChoiceImg @inmInfo="getImgInfo" :clickImgNum="clickImgNum"></ChoiceImg>
        </el-dialog>
    </div>
</template>

<script>
import eventBus from '@/interceptor/eventBus.js'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    list: {
      deep: true,
      handler () {
        this.listLen = this.list.length
        if (this.list.length === 1 && this.list[0]) {
          this.imgList_1 = this.list
        } else if (this.list.length === 3 && this.list[0]) {
          this.imgList_3 = this.list
        }
      }
    },
    listLen (newVal) {
      if (newVal === 1) {
        this.imgList = this.imgList_1
      } else if (newVal === 3) {
        this.imgList = this.imgList_3
      }
    }
  },
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'),
      dialog: false,
      imgList: [],
      imgList_1: [''],
      imgList_3: ['', '', ''],
      listLen: -1,
      clickImgNum: -1
    }
  },
  methods: {
    getImgInfo (choiceImgUrl, clickImgNum) {
      this.imgList = this.imgList.map((val, key) => key === clickImgNum ? choiceImgUrl : val)
    },
    openDialog (index) {
      this.clickImgNum = index
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }
  },
  created () {
    eventBus.$on('closeDia', () => {
      this.closeDialog()
    })
  }
}
</script>

<style lang='less' scoped>
   .cover-image {
     margin: 20px 100px;
     display: flex;
     .cover-image-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 20px;
       img {
         width: 100%;
         height: 100%;
         cursor: pointer;
       }
     }
   }
</style>

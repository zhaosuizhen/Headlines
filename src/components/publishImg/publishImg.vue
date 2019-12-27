<template>
    <div class='cover-image'>
        <div @click="openDialog" v-for="(item,index) in list" :key="index" class='cover-image-item'>
            <img :src="list.length === 3 ? imgList[index] : defaultImg" alt="">
        </div>
        <el-dialog :visible="dialog" title="选择封面图片" @close="closeDialog" >

        </el-dialog>
    </div>
</template>

<script>
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
        if (this.list[0]) {
          this.imgList = this.list
        }
      }
    }
  },
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'),
      dialog: false,
      imgList: ''
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    }
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

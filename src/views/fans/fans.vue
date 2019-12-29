<template>
  <el-card>
      <Bread slot="header">
            <span slot="title_1">粉丝管理</span>
            <span slot="title_2">图文数据</span>
        </Bread>

        <div ref="echarts" class="echarts"></div>
        <div ref="echarts2" class="echarts"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myCharts = echarts.init(this.$refs.echarts)
    let myCharts2 = echarts.init(this.$refs.echarts2)
    myCharts.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    })
    myCharts2.setOption({
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
}
</script>

<style>
.echarts{
    width: 600px;
    height: 400px;
}
</style>

<template>
  <div class="viewport">
    <div class="column">

      <!--监控-->
      <div class="monitor panel">
        <div class="inner">
          <div class="tabs">
            <a href="javascript:;" data-index="0" class="active">故障设备监控</a>
            <a href="javascript:;" data-index="1">异常设备监控</a>
          </div>
          <div class="content" style="display: block;">
            <div class="head">
              <span class="col">故障时间</span>
              <span class="col">设备地址</span>
              <span class="col">异常代码</span>
            </div>
            <div class="marquee-view">
              <div class="marquee">
                <div class="row">
                  <span class="col">20180701</span>
                  <span class="col">11北京市昌平西路金燕龙写字楼</span>
                  <span class="col">1000001</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190601</span>
                  <span class="col">北京市昌平区城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190704</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000003</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20180701</span>
                  <span class="col">北京市昌平区建路金燕龙写字楼</span>
                  <span class="col">1000004</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000005</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000006</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建西路金燕龙写字楼</span>
                  <span class="col">1000007</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000008</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000009</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190710</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000010</span>
                  <span class="icon-dot"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="head">
              <span class="col">异常时间</span>
              <span class="col">设备地址</span>
              <span class="col">异常代码</span>
            </div>
            <div class="marquee-view">
              <div class="marquee">
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000001</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190701</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190703</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190704</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190705</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190706</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190707</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190708</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190709</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
                <div class="row">
                  <span class="col">20190710</span>
                  <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
                  <span class="col">1000002</span>
                  <span class="icon-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel" style="width: 450px;height: 320px">
        <div class="inner">
          <h3>点位分布统计</h3>
          <div id="chartmainbin" style="width: 400px;height: 320px"></div>
        </div>
      </div>
    </div>
    <div class="column">
      <el-carousel :interval="4000" type="card" height="200px" style="margin-top: 40px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <!--概览-->
      <div class="overview panel" style="margin-top: 160px">
        <div class="inner">
          <div class="item">
            <h4>2,190</h4>
            <span>
                            <i class="icon-dot" style="color: #006cff"></i>
                            设备总数
                        </span>
          </div>
          <div class="item">
            <h4>190</h4>
            <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                            季度新增
                        </span>
          </div>
          <div class="item">
            <h4>3,001</h4>
            <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                            运营设备
                        </span>
          </div>
          <div class="item">
            <h4>108</h4>
            <span>
                            <i class="icon-dot" style="color: #ed3f35"></i>
                            异常设备
                        </span>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="panel" style="width: 450px;height: 320px">
        <div class="inner">
          <h3>点位分布统计</h3>
          <div id="chartmainline" style="width: 400px;height: 320px"></div>
        </div>
      </div>
      <div class="panel" style="width: 450px;height: 320px">
        <div class="inner">
          <h3>点位分布统计</h3>
          <div id="chartmainbar" style="width: 400px;height: 320px"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import echarts from "echarts";
    import "@/assets/css/index.css";
    import  "@/assets/fonts/icomoon.css";


    export default {
        name: "BigData"
        ,
        data(){
            return{
                //柱状图
                optionBar : {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                        ,
                        splitLine:{
                            show:false
                        }
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',


                        itemStyle: {
                            normal: {
                                color: this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#1E90FF'},
                                        {offset: 1, color: '#00FF7F'}
                                    ])
                            }
                        }
                    }]
                },

                //曲线图
                option :{
                    grid: {
                        width: "85%", // 宽度
                        height: "59%"// 高度
                    },

                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLine: {
                            lineStyle: {
                                color: '#006cff',
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#006cff',
                                width: 2
                            }
                        },
                        splitLine:{
                            show:false
                        }
                        },
                    series: [{
                        data: [150,230,480,800,1300,500,796,820, 932, 901, 934, 1290, 1330, 1320,900,800,700],
                        type: 'line',
                        smooth: true,
                        lineStyle:{
                            width:3//设置线条粗细
                        }
                    }]
                },
                //饼图
                optionBin : {


                    title: {
                        text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 274, name: '联盟广告'},
                                {value: 235, name: '视频广告'},
                                {value: 400, name: '搜索引擎'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                }

            }
        },
        mounted() {
            this.drawLine()
        },
        methods: {
            drawLine: function(){
                //基于准本好的DOM，初始化echarts实例
                let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
                let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
                let chartmainbin = this.$echarts.init(document.getElementById("chartmainbin"));
                //绘制图表
                chartmainline.setOption(this.option);
                chartmainbar.setOption(this.optionBar);
                chartmainbin.setOption(this.optionBin);
            }

        }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

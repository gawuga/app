<template>
    <div>
      <el-row>
          <el-col :span="12">
            <cascade-select @returnSel="returnSel" style="float: left; margin-left: 16px"></cascade-select>
          </el-col>
      </el-row>

      <el-row :gutter="20" style=" margin-top: 8px; margin-left: 8px;">

          <el-col :span="11" ><el-card style="background: #FFFACD">

            <div slot="header" class="clearfix">
              <span style="margin-left: -280px">每日检测量统计</span>
              <el-date-picker
                style="float: right; margin-top: -8px"
                v-model="barMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月" @change="changebarMonth">
              </el-date-picker>
            </div>


            <div id="chartmainline"  style="height: 200px"></div>


          </el-card></el-col>
          <el-col :span="6" v-if="show()">
            <el-card style="background: #D2B48C">

              <div slot="header" class="clearfix" >
                <span style="margin-left: -80px">缺陷统计</span>
                <el-date-picker
                  style="float: right; margin-top: -8px;width: 120px"
                  v-model="binMonth"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="选择月" @change="changebinMonth">
                </el-date-picker>
              </div>

              <div   id="bin" style="height: 200px"></div>

            </el-card>
          </el-col>
        </el-row>

    </div>
</template>

<script>
    import CascadeSelect from "./CascadeSelect";
    export default {
        name: "Statis",
        components:{
            CascadeSelect
        },
        data() {
            return {

                userId:1000,
                deviceMac:'',
                deviceType:'logo',
                deviceLine:'',
                deviceName:'',

                chartmainline:null,
                bin:null,

                pieData:[],
                //柱状图的x数据
                barXData:[],
                //柱状图的y数据
                barYData:[],

                noBarData:false,

                //目前的设备类型
                currentDevice:'',


                //Ng类型图表的时间默认值
                binMonth:"",
                //日均量图表的时间默认值
                barMonth:'',

                //曲线图
                option :{
                    grid: {
                            x:35,
                            y:40,
                            x2:60,
                            y2:60,

                        height: "69%"// 高度
                    },
                    xAxis: {
                        name: '日期',
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        name: '检测量',
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true,
                        areaStyle: {}
                    }]
                },
                //饼图
                optionBin : {
                    title: {
                        text: '',
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
                        min: 0,
                        max: 6,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '缺陷型号',
                            type: 'pie',
                            radius: '75%',
                            center: ['50%', '45%'],
                            data: [
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: '#FFFAF0'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: '#FFFAF0'
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


            };
        },
        methods:{
            returnSel(e){
                console.log("选择对象")
                console.log(e)
                console.log("fds")
                this.deviceMac = e.deviceMac
                this.deviceLine = e.deviceLine
                this.deviceType= e.value
                this.deviceName= e.deviceName
                console.log("获取柱状图数据")
                this.getBarStaticData(this.barMonth)
                if (this.show()){
                    console.log("获取饼图数据")
                    this.getBinStaticData(this.barMonth)
                }
            },



            /**
             * 得到该设备的统计数据--当前选择的设备
             */
            getBarStaticData: function (time){
                this.$addr.get("statistics/getBarDataByDevice/", {
                    params: {
                        deviceType: this.deviceType,
                        deviceLine:this.deviceLine,
                        deviceName:this.deviceName,
                        userId:this.userId,
                        time: time
                    }
                }).then((response) =>{
                    if (this.chartmainline==null){
                        this.chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
                    }

                    // console.log(response);
                    this.barXData = response.data.xdata
                    this.barYData = response.data.ydata

                    this.option.xAxis.data =  this.barXData
                    this.option.series[0].data = this.barYData

                    this.chartmainline.setOption(this.option);
                });
            },

            getBinStaticData: function (time){
                this.$addr.get("statistics/getPieDataByDevice/", {
                    params: {
                        deviceType: this.deviceType,
                        deviceLine:this.deviceLine,
                        deviceName:this.deviceName,
                        userId:this.userId,
                        time: time
                    }
                }).then((response) =>{
                    if (this.bin==null){
                        this.bin = this.$echarts.init(document.getElementById("bin"));
                    }

                    // console.log(response);
                    let values = response.data.values
                    let names = response.data.names
                    this.pieData = []
                    for (let i = 0; i< values.length;i++){
                        let obj = {}
                        obj.value = values[i]
                        obj.name = names[i]
                        this.pieData.push(obj);
                    }
                    this.optionBin.series[0].data = this.pieData.sort(function (a, b) { return a.value - b.value; }),
                        console.log(this.optionBin.series[0].data)
                    this.bin.setOption(this.optionBin);
                });
            },

            //柱状图
            changebarMonth(e){
                console.log(e)
                this.barMonth = e
                this.getBarStaticData(e)
            },
            //饼状图
            changebinMonth(e){
                this.binMonth = e
                console.log(e)
                this.getBinStaticData(e)
            },
            getMonth(){
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                this.binMonth = year + seperator1 + month
                this.barMonth = this.binMonth
            },   //是否有缺陷统计
            show(){
                if (this.deviceType=='logo' || this.deviceType=='socket' || this.deviceType=='aoi'){
                    console.log("hello")
                    return true
                }else return false
            }

        },
        created() {
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
            this.getMonth()
        },
        mounted() {
           // this.drawLine()
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




  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

</style>

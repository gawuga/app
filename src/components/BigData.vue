<template>
  <el-main>
    <el-row v-if="showMain">
      <el-row>
        <el-col :span="12" >

          <el-carousel indicator-position="outside" :autoplay="false" @change="carouselChange">
            <el-carousel-item v-for="item in deviceList" :key="item.value">
              <h3>{{ item.text }} 通过:{{ currentDevicePass}}</h3>

            </el-carousel-item>
          </el-carousel>


        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>{{currentDevice}}实时数据</span>

            </div>

            <el-row>
              <el-col :span="5">日期</el-col>
              <el-col :span="5">生产线</el-col>
              <el-col :span="5">设备名称</el-col>
              <el-col :span="5">被测物id</el-col>
              <el-col :span="4">结果</el-col>
            </el-row>
            <vue-seamless-scroll :data="this.listData[this.currentDevice]" :class-option="optionHover" class="seamless-warp" style="height: 180px">

              <div v-for="item in this.listData[this.currentDevice]" >
                <el-row >
                  <el-col :span="5"><span v-text="item.date"></span></el-col>
                  <el-col :span="5"><span v-text="item.line"></span></el-col>
                  <el-col :span="5"><span  v-text="item.deviceName"></span></el-col>
                  <el-col :span="5"><span v-text="item.dataId"></span></el-col>
                  <el-col :span="4"><span  v-text="item.result"></span></el-col>
                </el-row>

              </div>

            </vue-seamless-scroll>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" >

        <el-col :span="12" ><el-card>

          <div slot="header" class="clearfix">
            <span style="margin-left: -160px">{{currentDevice}}每日检测量统计</span>
            <el-date-picker
              style="float: right; margin-top: -8px"
              v-model="barMonth"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月" @change="changebarMonth">
            </el-date-picker>
          </div>


          <div id="chartmainline" style="height: 280px"></div>


        </el-card></el-col>
        <el-col :span="12">
          <el-card>

            <div slot="header" class="clearfix" v-if="show()">
              <span style="margin-left: -160px">{{currentDevice}}缺陷统计</span>
              <el-date-picker
                style="float: right; margin-top: -8px"
                v-model="binMonth"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月" @change="changebinMonth">
              </el-date-picker>
            </div>

            <div   v-if="show()" id="bin" style="height: 280px"></div>

            <div v-if="!show()" style="height: 340px" ><span>该类型无缺陷统计</span></div>

          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <el-row type="flex" v-if="!showMain" justify="space-between">
      <el-col :span="6"><div></div></el-col>
      <el-col :span="6"><div><span>{{tip}}暂无数据</span></div></el-col>
      <el-col :span="6"><div></div></el-col>
    </el-row>

  </el-main>
</template>

<script>
    import echarts from "echarts";
    import vueSeamlessScroll from 'vue-seamless-scroll'


    export default {
        name: "BigData",
        data () {
            return {
                tip:"无法连接上服务器,",
                showMain:false,
                chartmainline:null,
                bin:null,

                pieData:[],
                //柱状图的x数据
                barXData:[],
                //柱状图的y数据
                barYData:[],
                currentDevicePass:0,
                list: [],

                passData: {
                    "led":0,
                    "label":0,
                    "logo":0,
                    "code":0,
                    "socket":0,
                    "aoi":0,
                },

                listData: {
                    "led":[],
                    "label":[],
                    "logo":[],
                    "code":[],
                    "socket":[],
                    "aoi":[],
                },

                //为了标识socket链接的唯一性
                userNum:'',
                //后台socke
                path:"ws://localhost:8086/online/send/",
                socket:"",

                //目前的设备类型
                currentDevice:'',

                //时间选择器的数据
                TimeOptions: [{
                    value: '1',
                    label: '近一周'
                }, {
                    value: '2',
                    label: '近一个月'
                }],
                //通过类型图表的时间默认值
                passValue: '',
                //Ng类型图表的时间默认值
                binMonth:"",
                //日均量图表的时间默认值
                barMonth:'',
                //轮播组件的列表
                deviceList:[
                ],


                //曲线图
                option :{
                    grid: {

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
                                color: '#FF69B4'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: '#FF69B4'
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
        created() {
            console.log("this.created")
            if(window.sessionStorage.getItem("userId")){
                this.userNum = JSON.parse(window.sessionStorage.getItem("userId"));
            }

            this.getMonth();
            this.init();
           // this.drawLine();
            this.getDeviceList();


        },
        mounted() {
            console.log("this.mounted")
            //this.init();
           // this.drawLine();
            console.log("this.drawLine")
        },
        methods: {
            //----------------------------------------------socket----------------------------------------------
            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path  +this.userNum + "/device")
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                }
            },
            open: function () {
                console.log("socket连接成功")
                //发送用户编号和 数据类型

            },
            error: function () {
                console.log("连接错误")
            },
            getMessage: function (msg) {

                //实时面板数据筛选---筛选出当前幻灯片选择的数据
                let data = JSON.parse(msg.data)
                console.log(data)


                //根据设备类型 展示
                if (data.dataType==='led'){

                    this.listData.led.push(data);
                    this.passData.led = data.pass

                }else if (data.dataType==='label'){

                    this.listData.label.push(data);
                    this.passData.label = data.pass

                }else if (data.dataType==='logo'){

                    this.listData.logo.push(data);
                    this.passData.logo = data.pass

                }else if (data.dataType==='code'){

                    this.listData.code.push(data);
                    this.passData.code = data.pass

                }else if (data.dataType==='socket'){

                    this.listData.socket.push(data);
                    this.passData.socket = data.pass

                }else if (data.dataType==='aoi'){

                    this.listData.aoi.push(data);
                    this.passData.aoi = data.pass
                    console.log(this.listData.aoi)
                }


                this.currentDevicePass = this.passData[this.currentDevice]
                console.log(data.pass)
            },
            send: function (dataType) {
                this.socket.send(dataType)
            },
            close: function () {
                console.log("socket已经关闭")
            },
            //----------------------------------------------socket----------------------------------------------

            //--------------------------------图表-------------------------------------------------------
            /**
             * 画图表
             */
            drawLine: function(){
                //基于准本好的DOM，初始化echarts实例
                console.log('?')
                this.chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
                //  let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
                this.bin = this.$echarts.init(document.getElementById("bin"));
                //绘制图表
                this.chartmainline.setOption(this.option);
                //  chartmainbar.setOption(this.optionBar);
                this.bin.setOption(this.optionBin);
            },

            /**
             * 图表选择时间触发函数
             */

            selectTime:function(time){
                //根据时间参数 向后台请求数据

                console.log("selectTime------" + time);

            },

            //--------------------------------图表-----------------------------------------------------------------
            /**
             * 得到用户的检测设备类别
             */
            getDeviceList: function () {

                this.$addr.get("device/deviceTypeList/", {
                    params: {
                        userId:1000,

                    }})
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            if (response.data.length==0){
                                this.showMain = false
                                this.tip = "您没有设备,"
                            }else {

                                this.showMain = true
                                for (let i = 0; i< response.data.length;i++){
                                    let obj = {}
                                    obj.value = response.data[i].split(',')[0]
                                    obj.text = response.data[i].split(',')[1]
                                    if (i==0){
                                        //默认当前的设备类型 就是轮播图的第一个展示的设备
                                        this.currentDevice =  obj.value
                                    }

                                    obj.pass = 0;
                                    this.deviceList.push(obj);
                                }

                                this.getBarStaticData(this.barMonth)
                                if (this.currentDevice=='logo' || this.currentDevice=='socket' || this.currentDevice=='aoi'){
                                    this.getBinStaticData(this.barMonth)
                                }
                            }

                        }else {
                            this.$message({
                                message: '获取设备类型数据失败',
                                type: 'warning'
                            });
                            this.showMain = false

                        }

                    })
                    .catch((error)=> {
                        console.log(error);
                        this.showMain = false
                        this.tip = "无法连接上服务器,"
                    });

            },

            /**
             * 得到检测数据实时通过量
             */
            getRealTimeTotalPass: function () {

            },

            /**
             * 得到该设备的统计数据--当前选择的设备
             */
            getBarStaticData: function (time){
                this.$addr.get("statistics/getBarData/", {
                    params: {
                        deviceType: this.currentDevice,
                        userId:1000,
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
                this.$addr.get("statistics/getPieData/", {
                    params: {
                        deviceType: this.currentDevice,
                        userId:1000,
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

            carouselChange: function(key1, key2) {
                //切换幻灯片 然后整个页面请求该设备类型的数据
                this.currentDevice = this.deviceList[key1].value;
                //切换幻灯片 实时数据区域展示该设备类型的数据
                this.currentDevicePass = this.passData[this.currentDevice]
                this.getBarStaticData(this.barMonth)
                //this.optionBin.series[0].data=[]
                //只有这几类才有缺陷统计
                if (this.currentDevice=='logo' || this.currentDevice=='socket' || this.currentDevice=='aoi'){
                    this.getBinStaticData(this.barMonth)
                }else {
                    this.optionBin.series[0].data=[]
                    this.bin.setOption(this.optionBin);
                }

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
            },

            //是否有缺陷统计
            show(){
                if (this.currentDevice=='logo' || this.currentDevice=='socket' || this.currentDevice=='aoi'){
                    return true
                }else return false
            }



        },
        components: {
            vueSeamlessScroll
        },

        computed: {
            optionHover () {
                return {
                    hoverStop: false
                }
            }
        },
        destroyed() {
            console.log("socket已经关闭")
            this.socket.close()
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

  .seamless-warp {
    height: 229px;
    overflow: hidden;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

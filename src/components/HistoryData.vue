<template>

 <div style="background: white;height: 800px" >
   <el-card class="box-card" style="width: 100%">
     <div slot="header" class="clearfix">


      <el-row>
        <el-select v-model="value" style="float: left; padding: 3px 0" placeholder="请选择设备类型"  @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="deviceLineValues" style="float: left; padding: 3px 0" placeholder="请选择生产线"  @change="selectLineChange">
          <el-option
            v-for="item in deviceLineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="deviceNameValues" style="float: left; padding: 3px 0" placeholder="请选择设备名称"  @change="selectDeviceNameChange">
          <el-option
            v-for="item in deviceNameOptions "
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>

        </el-select>

      </el-row>
       <el-row>

         <div style="float: left; padding: 3px 0" >
           <el-button type="primary" @click="selectTime(360)">近一年</el-button>
           <el-button type="primary" @click="selectTime(180)">近半年</el-button>
           <el-button type="primary" @click="selectTime(90)">近三月</el-button>
           <el-button type="primary" @click="selectTime(30)">近一月</el-button>
           <el-button type="primary" @click="selectTime(7)">近一周</el-button>
           <el-button type="primary" @click="selectTime(3)">近三天</el-button>

         </div>
       </el-row>
       <el-row>

       </el-row>
      <el-row>

      </el-row>
     </div>
     <el-row type="flex" v-if="!show" justify="space-between">
       <el-col :span="6"><div></div></el-col>
       <el-col :span="6"><div><span>{{tip}}</span></div></el-col>
       <el-col :span="6"><div></div></el-col>
     </el-row>
       <el-table
         :data="tableData"
         v-if="show"
         border
         fit>
         <div v-for="item in tableHead" :key="item.prop">
           <af-table-column  :prop=item.prop
                             :label=item.label></af-table-column>
         </div>

       <el-table-column
         fixed="right"
         label="操作"
         width="100">
         <template slot-scope="scope">
           <el-button @click="centerDialogVisible = true" type="text" size="small">查看</el-button>
         </template>
       </el-table-column>
     </el-table>
     <el-pagination
       background
       layout="prev, pager, next"
       :total="1000" style="margin-top: 64px" @current-change="changePage"  :page-size="pageSize" :current-page="currentPage">
     </el-pagination>
   </el-card>

   <el-dialog
     title="被测物详情"
     :visible.sync="centerDialogVisible"
     width="30%"
     center>
     <template >
       <el-form label-position="left" inline class="demo-table-expand">

         <el-form-item label="生产公司">
           <span></span>
         </el-form-item>
         <el-form-item label="被测物 SN">
           <span></span>
         </el-form-item>
       </el-form>
     </template>
     <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
   </el-dialog>
 </div>
</template>

<script>
    export default {
        name: "HistoryData",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            //选择数据时间范围
            selectTime(day) {

                //重新置位默认时间
                this.currentPage = 1
                this.time = day
                console.log(day);
                //this.value是当前选择的设备类型
                this.getDeviceHistoryData(this.value,this.deviceLineValues,this.deviceNameValues )

            },
            //分页选择器
            changePage(currentPage) {
                this.currentPage = currentPage
                this.getDeviceHistoryData(this.value,this.deviceLineValues,this.deviceNameValues )
                console.log(currentPage)
            },


            /**
             * 向后台请求设备类型字段，页面的表格顶部会现实该设备字段
             */
            getDeviceField(deviceType) {
                this.$addr.get("device/deviceAllFields", {
                    params: {
                        userId:this.userId,
                        deviceType: deviceType,
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){

                            this.initTableHead(response.data)
                            console.log("获取设备数据中")
                           // this.getDeviceHistoryData(deviceType)
                        }else {
                            this.$message({
                                message: '获取设备数据失败',
                                type: 'warning'
                            });

                        }


                    })
                    .catch(function (error) {
                        console.log(error);
                       // this.show = false
                    });


            },
            /**
             * 向后台获取获取用户的设备类型
             */
            getDeviceTypeByUserId(){

                this.$addr.get("device/deviceTypeList", {
                    params: {
                        userId:this.userId
                    }})
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            this.deviceNameValues = ''
                            for (let i = 0; i< response.data.length;i++){
                                let obj = {}
                                obj.value = response.data[i].split(',')[0]
                                obj.label = response.data[i].split(',')[1]
                                if (i === 0) {
                                    this.value = obj.value
                                    this.getDeviceField(this.value)

                                    this.getDeviceLine(this.value)

                                }
                                //console.log(obj)
                                /**
                                 * 复制给选择器
                                 */
                                this.options.push(obj)

                            }

                        }else {
                            this.$message({
                                message: '获取设备类型数据失败',
                                type: 'warning'
                            });
                            this.show = false
                            this.tip = "没法连上服务器，暂无数据"
                        }

                    })
                    .catch((error)=> {

                        console.log(error);
                        this.show = false
                        this.tip = "没法连上服务器，暂无数据"
                    });
            },

            /**
             * 获取设备的历史数据
             */
            getDeviceHistoryData(deviceType,deviceLine,deviceName){
                this.$addr.get("history/"+deviceType, {
                    params: {

                        deviceType: deviceType,
                        userId:1000,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize,
                        time:this.time,
                        deviceLine:deviceLine,
                        deviceName:deviceName

                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){

                            //复制到前端表单数据数组
                            this.tableData = response.data
                            for (let i = 0; i < this.tableData.length;i++){
                                //如果有额外的数据字段 ---- 这些字段是用户自己添加的  那么进行展示
                                if (this.tableData[i].extraData.length>0){
                                    for (let j = 0;j <this.tableData[i].extraData.length;j++ ){
                                        this.tableData[i][this.tableData[i].extraData[j].fieldName] = this.tableData[i].extraData[j].value
                                    }
                                    console.log( this.tableData[i])
                                }
                            }
                            console.log(this.tableData)
                        }else {
                            this.$message({
                                message: '获取设备数据失败',
                                type: 'warning'
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            /**
             * 得到设备生产线数据
             */
            getDeviceLine(deviceType){
                this.$addr.get("device/getDeviceLine", {
                    params: {

                        deviceType: deviceType,
                        userId:1000,
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            //清空
                            this.deviceLineValues = ''
                            this.deviceLineOptions = []
                            for (let i = 0; i < response.data.length;i++){
                                let obj = {}
                                obj.value = response.data[i]
                                obj.label = "生产线"+obj.value
                                if (i === 0) {
                                    this.deviceLineValues = obj.value
                                    //this.getDeviceField(this.value)
                                    this.getDeviceName(this.value,this.deviceLineValues)
                                }
                                //console.log(obj)
                                /**
                                 * 复制给选择器
                                 */
                                this.deviceLineOptions.push(obj)
                            }
                           // console.log(this.tableData)
                        }else {
                            this.$message({
                                message: '获取设备数据失败',
                                type: 'warning'
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            /**
             * 得到设备名字数据
             */
            getDeviceName(deviceType,deviceLine){
                this.$addr.get("device/getDeviceName", {
                    params: {

                        deviceType: deviceType,
                        deviceLine:deviceLine,
                        userId:1000,
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            //清空
                            this.deviceNameValues = ''
                            this.deviceNameOptions = []
                            for (let i = 0; i < response.data.length;i++){
                                let obj = {}
                                obj.value = response.data[i].deviceName
                                obj.label = obj.value
                                if (i === 0) {
                                    this.deviceNameValues = obj.value
                                    //this.getDeviceField(this.value)
                                    this.getDeviceHistoryData(deviceType,deviceLine,this.deviceNameValues )
                                    console.log("获取数据中")
                                }
                                //console.log(obj)
                                /**
                                 * 复制给选择器
                                 */
                                this.deviceNameOptions.push(obj)
                                console.log(this.deviceNameValues)
                            }
                            // console.log(this.tableData)
                        }else {
                            this.$message({
                                message: '获取设备数据失败',
                                type: 'warning'
                            });

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //设备类型选择器改变函数
            selectChange(){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值
                this.time = 3
                this.currentPage = 1
                this.clearData()
                this.getDeviceField(this.value)
                this.getDeviceLine(this.value)
            },

            //设备生产线选择器改变函数
            selectLineChange(){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值
                this.time = 3
                this.currentPage = 1

                //this.getDeviceField(this.value)
                this.getDeviceName(this.value,this.deviceLineValues)
            },

            //设备名字选择器改变函数
            selectDeviceNameChange(){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值
                this.time = 3
                this.currentPage = 1

                //this.getDeviceField(this.value)
                //直接获取数据
                console.log("获取数据中")
                this.getDeviceHistoryData(this.value,this.deviceLineValues,this.deviceNameValues )
            },
            /**
             * 初始化表格头部
             */
            initTableHead(data){

                //清空一下
                this.tableHead = []
                for (let i = 0; i < data.length;i++){
                    let obj = {}
                    obj.prop = data[i]
                    obj.label = data[i]
                    this.tableHead.push(obj)
                }
                console.log(this.tableHead)
                if (this.tableHead.length>0){
                    this.show = true
                }
            }




            ,changeMonth(e){
                console.log(e)

            },
            clearData(){
                this.deviceNameValues=''
                this.deviceLineValues=''
                this.tableData = []
            },



        },
        created() {
            //页面创建时就获取用户拥有的设备类型
            //this.getDeviceListByPage();
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
            this.getDeviceTypeByUserId()
            console.log("this.value---"+this.value)
            //this.value = this.options[0].value
            //this.getDeviceField(this.value)
            console.log("??" + this.value)
            /**
             *x 默认加载第一个设备的数据
             *vb ,
             */
            //this.getDeviceHistoryData()
        },
        data() {
            return {

                tip:"",
                month:"",
                userId:'',
                //默认显示近三天的数据
                time:3,
                //分页
                pageSize:8,
                //当前页
                currentPage:1,
                options: [],
                //当前选择设备检测数据
                value: '',
                tableHead:[],
                tableData: [],
                centerDialogVisible: false,
                //生产线选择器
                deviceLineValues:'',

                deviceLineOptions: [],
                //设备名字选择器
                deviceNameValues:'',
                deviceNameOptions: [],
                show:false
            }
        }
    }
</script>
<style scoped>

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

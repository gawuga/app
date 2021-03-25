<template>
<div >

  <div slot="header" class="clearfix"  >
    <div style="float: left; padding: 3px 0" >

      <el-button icon="el-icon-plus" @click="centerDialogTypeVisible = true" type="primary" >添加设备</el-button>

    </div>
    <el-select v-model="value" style="float: right; padding: 3px 0" placeholder="请选择设备类型"  @change="selectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <el-table
    :data="deviceData"
    border
    style="width: 100%;margin-top: 24px" >
    <af-table-column
      fixed
      prop="date"
      label="添加日期"
      >
    </af-table-column>
    <af-table-column
      prop="deviceType"
      label="设备类型"
      >
    </af-table-column>
    <af-table-column
      prop="deviceMac"
      label="设备mac"
      >
    </af-table-column>
    <af-table-column
      prop="deviceLine"
      label="生产线"
      >
    </af-table-column>
    <af-table-column
      prop="deviceName"
      label="设备名称"
      >
    </af-table-column>
    <af-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">

        <el-button @click="deleteMacClick(scope.row)" type="danger">删除</el-button>
        <el-button @click="editDeviceMac(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </af-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000" style="margin-top: 64px" @current-change="changePage"  :page-size="pageSize" :current-page="currentPage">
  </el-pagination>
  <el-dialog
    title="编辑设备信息"
    :visible.sync="centerDiaLogMac"
    width="30%"
    center>

    <el-col style="margin-top: 12px">设备生产线</el-col>
    <el-input
      v-model="deviceLine"
      placeholder="只能输入最多两位数字"
      oninput="value=value.replace(/[^\d.]/g,'')"
      maxlength="2"
      style="margin-top: 4px" >
    </el-input>
    <el-col style="margin-top: 12px">设备名称</el-col>
    <el-input
      v-model="deviceName"
      placeholder="只能输入名字"
      maxlength="4"
      style="margin-top: 4px" >
    </el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDiaLogMac = false">取 消</el-button>
    <el-button type="primary" @click="editDeviceMacConfirm">确 定</el-button>
  </span>
  </el-dialog>


  <el-dialog
    title="提示"
    :visible.sync="centerDialogTypeVisible"
    width="30%"
    center>
    <AddDeviceMac  :options="options" @passBtn="passBtn" @passSuccess = "passSuccess"> </AddDeviceMac>
  </el-dialog>
</div>
</template>

<script>
    import AddDeviceMac from "./AddDeviceMac";

    export default {
        name: "DeviceDetail",
        props: {
            'value':String,
            'options':Array,
            'isFreshData':Boolean,
        },
        data() {
            return {
                //value:'',
                isFinish:false,
                preValue :'',
                //options:[],
                //设备mac
                deviceLine:'',
                deviceName:'',
                deviceMac:"",
                deviceMacType:"",

                //deviceMacLine:"",
                //deviceMacName:"",

                activeName: 'second',

                userId:'',

                //设备模块的url
                subURl:"device/",

                currentPage:1,
                pageSize:8,
                //设备类型数据
                tableData: [],
                //设备id数据
                deviceData: [],
                centerDialogTypeVisible:false,
                currentDeviceMac:null,
                centerDiaLogMac : false
            }
        },
        components:{
            AddDeviceMac
        },
        methods:{
            editDeviceMac(e){
                this.currentDeviceMac = e
               // console.log(this.currentDeviceMac)
                this.deviceLine=this.currentDeviceMac.deviceLine
                this.deviceName =this.currentDeviceMac.deviceName
                this.centerDiaLogMac = true
            },
            //向后台修改设备信息请求
            editDeviceMacConfirm(){
                console.log(this.currentDeviceMac.deviceMac)
               //let  mac = this.currentDeviceMac.deviceMac
              //  let type =
               // let line = this.deviceLine===""?this.centerDiaLogMac.deviceLine.replace("生产线",""):this.deviceLine
               // let name = this.deviceName===""?this.centerDiaLogMac.deviceName:this.deviceName
                this.$addr({
                    method: 'post',
                    url: this.subURl+"updateDeviceMac",
                    data: {
                        userId:this.userId,
                        deviceType: this.currentDeviceMac.deviceType,
                        deviceMac:this.currentDeviceMac.deviceMac,
                        deviceLine:this.deviceLine,
                        deviceName:this.deviceName
                    }
                    , headers: {'Content-Type': 'application/json'}
                }).then((response)=> {
                    console.log(response);
                    console.log('以有该MAC地址,不可重复添加')
                    if (response.data === "success"){
                        this.centerDiaLogMac = false
                        this.currentDeviceMac.deviceLine = this.deviceLine
                        this.currentDeviceMac.deviceName = this.deviceName
                    }else {
                       console.log('以有该MAC地址,不可重复添加')
                    }
                    console.log('以有该MAC地址,不可重复添加')
                })
                    .catch(function (error) {
                        console.log(error);
                    });

                // 也可以通过 params 设置参数：
            },

            deleteMacClick(e){
                this.deleteDeviceMac(e)
            },
            passBtn(e){
                console.log("passBtn"+e)
                this.centerDialogTypeVisible = e

            },
            //收到添加成功 刷新数据
            passSuccess(e){

                this.getDeviceMacList(this.value)
            },
            //获取设备数据
            getDeviceMacList(deviceType){
                console.log("获取deviceMac中")
                this.$addr.get(this.subURl+"getDeviceMac/", {
                    params: {

                        deviceType: deviceType,
                        userId:this.userId,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize,

                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            this.deviceData = response.data
                            console.log(this.deviceData)
                        }else {
                            this.$message({
                                message: '获取设备数据失败',
                                type: 'warning'
                            });
                        }

                    });
            },

            //删除设备
            deleteDeviceMac(e){
                this.$addr.get(this.subURl+"deleteDeviceMac/", {
                    params: {
                        deviceType: e.deviceType,
                        userId:this.userId,
                        deviceMac:e.deviceMac

                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.data==="success"){
                            this.getDeviceMacList(this.value)
                        }else {
                            this.$message({
                                message: '不可重复添加',
                                type: 'warning'
                            });
                        }

                    });
            },

            //设备类型选择
            selectChange(){
                //this.preValue =this.value
                console.log("????")
                this.getDeviceMacList(this.value)
            },
            changePage(currentPage) {
                //换页
                this.currentPage = currentPage
                console.log(this.currentPage)
                this.getDeviceMacList(this.value)
            },
            monitoring(){
                this.$on('getDeviceMacList', (res) => {
                    console.log('方法1:触发监听事件监听成功')
                    console.log(res)
                })
            }

        },
        created(){
           // this.getDeviceMacList(this.value)
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
        },
        updated() {
            //该更新数据
           // console.log("更新数据"+this.isFreshData)
        //    this.isFintish = this.isFreshData

       //     if (this.isFreshData&&this.isFinish){
         //       console.log("更新数据")
           //     this.currentPage = 1
             //   this.getDeviceMacList(this.value)
           //     this.isFinish = false
            //    this.isFreshData = false
           // }

        },

        mounted() {
            this.monitoring() // 注册监听事件
        },


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
</style>

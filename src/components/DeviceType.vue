<template>
<div>
  <div slot="header" class="clearfix">
    <div style="float: left; padding: 3px 0" >

      <el-button icon="el-icon-plus" @click="centerDialogVisible = true" type="primary" >添加设备类型</el-button>
      <span style="margin-left: 32px">上传接口:</span>
      <el-link type="info" disabled> ws://localhost:8086/online/receive/{userId}/{deviceType}</el-link>
    </div>


  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top: 24px">
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
      prop="deviceCommonField"
      label="数据默认字段"
      >
    </af-table-column>
    <af-table-column
        prop="deviceExtraField"
        label="已添加字段"
        >
    </af-table-column>

    <af-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">

        <el-button @click="deleteClick(scope.row)" type="danger">删除</el-button>
        <el-button @click="editFields(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </af-table-column>
  </el-table>
  <el-dialog
    title="编辑添加字段"
    :visible.sync="centerDiaLogFields"
    width="30%"
    center>
    <edit-field :fields_1="fields_1" :fields_2="fields_2" :fields_3="fields_3"  @returnField_3="returnField_3"
                @returnField_2="returnField_2"  @returnField_1="returnField_1" ></edit-field>
    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDiaLogFields = false">取 消</el-button>
    <el-button type="primary" @click="editDialogConfirm">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <AddDevice  :table-data="tableData" @passTypeBtn="passTypeBtn" @passTypeSuccess="passTypeSuccess"></AddDevice>
  </el-dialog>
</div>
</template>

<script>
  import AddDevice from "./AddDevice";
  import EditField from "./EditField";
    export default {
        name: "DeviceType",
        /**
         * 页面初始化
         *
         */
        components:{
            AddDevice,
            EditField
        },
        created() {
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
            //页面创建时就获取数据
            this.getDeviceList();
        },
        data() {
            return {
                fields_1:'',
                fields_2:'',
                fields_3:'',
                options:[],
                currentDeviceType:null,

                //deviceMacLine:"",
                //deviceMacName:"",
                value:"",


                userId:'',

                //设备模块的url
                subURl:"device/",
                //当前添加设备的ID
                //当前设备类型
                currentAddDeviceType:"",
                //设备类型数据
                tableData: [],
                //设备id数据
                centerDialogVisible: false,
                //编辑添加字段对话框
                centerDiaLogFields:false

            }
        },
        methods:{

            editDialogConfirm(){
                this.$addr({
                    method: 'post',
                    url: this.subURl+"updateExtraFields",
                    data: {
                        userId:this.userId,
                        deviceExtraField: this.fields_1 +","+ this.fields_2 + ","+ this.fields_3,
                        deviceType:this.currentDeviceType.deviceType,
                        date:this.currentDeviceType.date,
                        deviceCommonField:this.currentDeviceType.deviceCommonField
                    }
                    , headers: {'Content-Type': 'application/json'}
                }).then((response)=> {
                    console.log(response);
                    if (response.data == "success"){
                        this.centerDiaLogFields = false
                        this.currentDeviceType.deviceExtraField = this.fields_1 +","+ this.fields_2 + ","+ this.fields_3
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            returnField_3(e){
                this.fields_3 = e
            },
            returnField_2(e){
                this.fields_2 = e
            },
            returnField_1(e){
                this.fields_1 = e
            },
            /**
             * 修改额外字段
             */
            editFields(row){
                this.centerDiaLogFields = true
                this.currentDeviceType = row
                let fields = row.deviceExtraField.split(" ")

                if(fields.length===1){
                    this.fields_1 = fields[0]

                }
                if(fields.length===2){
                    this.fields_1 = fields[0]
                    this.fields_2 = fields[1]

                }
                if(fields.length===3){
                    this.fields_1 = fields[0]
                    this.fields_2 = fields[1]
                    this.fields_3 = fields[2]
                }

            },




            passTypeBtn(e){
                console.log("passTypeBtn")
                this.centerDialogVisible = e
            },
            passTypeSuccess(){
                console.log("passTypeSuccess")
                this.getDeviceList()
            },


            passOptions(){
                console.log("passOptions")
                this.$emit("passOptions",this.options)
            },


            deleteClick(row) {
                console.log(row);
                this.deleteDevice(row)
            },


            /**
             * 删除设备
             * @param e
             */
            deleteDevice(e){
                // 也可以通过 params 设置参数：
                this.$addr.get(this.subURl+"deleteDeviceType", {
                    params: {
                        deviceType: e.deviceType,
                        userId:this.userId
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.data==="success"){
                            //删除了后为了让后面的后面的数据 只能重新获取页面数据了
                            this.getDeviceList()
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },



            /**
             * 获取分页器的条数
             *
             */
            getPaginationTotal(){

            },


            //获取设备类型数据
            getDeviceList(){
                this.$addr.get(this.subURl+"deviceType", {
                    params: {
                        userId:this.userId
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            this.tableData = response.data

                            //清空一下选择器
                            this.options = []
                            for (let i = 0; i< this.tableData.length;i++){
                                let obj = {}
                                obj.value =this.tableData[i].deviceType
                                obj.label = obj.value
                                if (i === 0) {
                                    this.value = obj.value
                                    //this.getDeviceMacList(this.value)
                                }
                                console.log(this.tableData)
                                //添加到选择器
                                this.options.push(obj)
                            }
                            //传值给另一个页面
                            this.passOptions()
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
</style>

<template>
    <div>

        <el-select v-model="value" placeholder="请选择设备类型" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" >
          </el-option>
        </el-select>
        <el-row style="margin-top: 24px;margin-left: 3px">
          <el-col >上传数据格式</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-input
          type="textarea"
          :rows="2"
          placeholder=""
          v-model="textarea" disabled="true" style="hegiht:200px">
        </el-input>

        <el-divider></el-divider>
        <edit-field :fields_1="fields_1" :fields_2="fields_2" :fields_3="fields_3"  @returnField_3="returnField_3"
                    @returnField_2="returnField_2"  @returnField_1="returnField_1" ></edit-field>


      <span slot="footer" class="dialog-footer"  style="margin-left: 100px">
    <el-button @click="addDeviceDialogCancelBtn">取 消</el-button>
    <el-button type="primary" @click="addDeviceDialogConfirmBtn">确 定</el-button>
  </span>
    </div>
</template>

<script>
  import EditField from "./EditField";

    export default {
        props: {
            'tableData':Array,
            'fields':Object,

        },
        components:{
            EditField
        },
        name: "AddDevice",
        data() {
            return {
                userId:'',
                fields_1:'',
                fields_2:'',
                fields_3:'',
                centerDialogVisible: false,
                //设备模块的url
                subURl:"device/",
                textarea: "数据格式加载中",

                options: [{
                    value: 'socket',
                    label: '插座'
                }, {
                    value: 'led',
                    label: 'led'
                }, {
                    value: 'label',
                    label: '标签'
                },
                    {
                        value: 'logo',
                        label: 'logo'
                    }, {
                        value: 'aoi',
                        label: 'aoi'
                    }, {
                        value: 'code',
                        label: '条形码'
                    }],
                value: '',
               deviceId:"",
                currentAddDeviceType:'',


            }
        },
        methods: {

            returnField_3(e){
                this.fields_3 = e
            },
            returnField_2(e){
                this.fields_2 = e
            },
            returnField_1(e){
                this.fields_1 = e
            },

            passDeviceType(){
                console.log("passDeviceType")
            //this.$emit("returnDeviceType",this.value)
            },

            passTypeBtn(){
                console.log("passDeviceType")
                this.$emit("passTypeBtn",this.centerDialogVisible)
            },
            passTypeSuccess(){
                this.$emit("passTypeSuccess",true)
            },

            selectChange(){
                this.currentAddDeviceType = this.value
                this.getDeviceFields()
                this.passDeviceType()
            },



            /**
             * 获取设备的检测数据字段
             */
            getDeviceFields(){
                this.$addr.get(this.subURl+"deviceFields", {
                    params: {

                        deviceType: this.value,
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){

                            /**
                             *    '        "num": "sddf",\n' +
                             '        "result": "true"\n' +
                             * @type {string}
                             */
                            const head = '{\n' +
                                '    "dataType":' + '"' + this.value +'"\n' +
                                '    "data": {\n'
                            var content = ""

                            for(let i = 0; i < response.data.length;i++){
                                content+='        "' +response.data[i] +'": "...",\n'
                            }

                            const rail =   '    }\n' +
                                '    \n' +
                                '}'

                            this.textarea = head + content + rail
                                console.log(this.textarea);
                        }else {
                            this.$message({
                                message: '获取设备字段失败',
                                type: 'warning'
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            /**
             * 添加设备对话框按钮确定后的业务
             */
            addDeviceDialogConfirmBtn(){
                if(window.sessionStorage.getItem("userId")){
                    this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
                }
                console.log(this.tableData)
                //还可以添加设备类型
                if (this.tableData.length <= 6){
                    console.log(this.currentAddDeviceType.length)
                    //&& (this.fields.filedName1.length>0 || this.fields.filedName2.length>0||this.fields.filedName3.length>0)
                    if (this.currentAddDeviceType.length > 0 ){
                        //向后台发送添加设备请求
                        if (!this.isContainDevice(this.currentAddDeviceType)) {
                            this.addDevice();
                        }else {
                            this.$message({
                                message: '已有该设备类型,不可重复添加',
                                type: 'warning'
                            });
                        }

                    }else {
                        this.$message({
                            message: '没有填写资料',
                            type: 'warning'
                        });
                    }
                }else{
                    this.$message({
                        message: '可添加设备类型数为0',
                        type: 'warning'
                    });
                }



            },

            /**
             * 添加设备对话框取消后后的逻辑
             */
            addDeviceDialogCancelBtn(){
                this.centerDialogVisible = false

                this.clearFields();
                this.passTypeBtn();
            },
            /**
             * 添加设备
             */
            addDevice(){

                this.$addr({
                    method: 'post',
                    url: this.subURl+"addDeviceType",
                    data: {
                        userId:this.userId,
                        deviceExtraField: this.fields_1 +","+ this.fields_2 + ","+ this.fields_3,
                        deviceType:this.currentAddDeviceType
                    }
                    , headers: {'Content-Type': 'application/json'}
                }).then((response)=> {
                    console.log(response);
                    if (response.data == "success"){
                        this.centerDialogVisible = false
                        this.clearFields();
                        this.passTypeBtn()
                        this.passTypeSuccess()
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });

                // 也可以通过 params 设置参数：

            },
            //清空设备字段
            clearFields() {
                this.fields_1 = ""
                this.fields_2 = ""
                this.fields_3 = ""
            },



            //是否已有包含了该设备类型
            isContainDevice(deviceType){
                for (let i = 0 ; i < this.tableData.length;i++){
                    if (this.tableData[i].deviceType === deviceType) return true
                }
                return false;
            },


        },

    }
</script>

<style scoped>

</style>

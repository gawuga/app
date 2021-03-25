<template>
    <div>
      <el-card>
        <el-select v-model="value" placeholder="请选择设备类型" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" >
          </el-option>
        </el-select>


        <el-divider></el-divider>
        <el-row style="margin-top: 8px;margin-left: 3px">
          <el-form ref="form" label-width="80px">
            <el-col style="margin-top: 12px">设备mac(格式:xx-xx-xx-xx-xx-xx)</el-col>
            <el-input
              v-model="device.deviceMac"
              placeholder="只能输入正确的mac"

              maxlength="20"
              @blur="inputChange" style="margin-top: 4px" >
            </el-input>
            <el-col style="margin-top: 12px">设备生产线</el-col>
            <el-input
              v-model="device.deviceLine"
              placeholder="只能输入最多两位数字"
              oninput="value=value.replace(/[^\d.]/g,'')"
              maxlength="2"
              style="margin-top: 4px" >
            </el-input>

            <el-col style="margin-top: 12px">设备名称</el-col>
            <el-input
              v-model="device.deviceName"
              placeholder="只能输入名字"
              maxlength="4"
             style="margin-top: 4px" >
            </el-input>

          </el-form>

        </el-row>
      </el-card>
      <span slot="footer" class="dialog-footer" style="margin-left: 100px">
    <el-button @click="addDeviceMacDialogCancelBtn">取 消</el-button>
    <el-button type="primary" @click="addDeviceMacDialogConfirmBtn">确 定</el-button>
      </span>
    </div>
</template>

<script>
    export default {
        props: {

            'options':Array,

        },
        name: "AddDevice",
        data() {
            return {
                userId:'',
                //设备模块的url
                subURl:"device/",
                value:"",
                deviceMacType: "",
                device:{
                    deviceMac:"",
                    deviceLine:"",
                    deviceName:""

                }


            }
        },
        methods: {
            inputChange(e){
                const temp = /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/;
                console.log(e.target.value)
                if (!temp.test(e.target.value)) {
                    this.$message({
                        message: '无效mac',
                        type: 'warning'
                    });
                }

            },


            passBtn(){
                console.log("centerDialogTypeVisible")
            this.$emit("passBtn",this.centerDialogTypeVisible)
            },
            passSuccess(){
                console.log("centerDialogTypeVisible")
                this.$emit("passSuccess",true)
            },


            selectChange(){
                this.deviceMacType = this.value
            },
            addDeviceMacDialogCancelBtn(){
                console.log("addDeviceMacDialogCancelBtn")
                this.device.deviceMac = ""
                this.device.deviceLine = ""
                this.device.deviceName  = ""
                this.centerDialogTypeVisible = false
                this.passBtn()
            },
            addDeviceMacDialogConfirmBtn(){
                if(window.sessionStorage.getItem("userId")){
                    this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
                }
                console.log("addDeviceMacDialogConfirmBtn")

                if (this.deviceMacType.length > 0 && this.device.deviceMac.length > 0 &&this.device.deviceLine.length > 0 && this.device.deviceName.length > 0 ){
                    this.addDeviceMac();
                   this.device.deviceMac = ""
                    this.device.deviceLine = ""
                    this.device.deviceName  = ""
                    this.centerDialogTypeVisible = false

                }else {
                    this.$message({
                        message: '没有填写资料',
                        type: 'warning'
                    });
                }
            },

//添加同一个类型下的设备
            addDeviceMac(){
                this.$addr({
                    method: 'post',
                    url: this.subURl+"addDeviceMac",
                    data: {
                        userId:this.userId,
                        deviceMac:this.device.deviceMac,
                        deviceType:this.deviceMacType,
                        deviceLine:this.device.deviceLine,
                        deviceName: this.device.deviceName

                    }
                    , headers: {'Content-Type': 'application/json'}
                }).then((response)=> {
                    console.log(response);
                    if (response.data == "success"){
                        this.passBtn()
                        //获取该类型下的设备数据
                        this.passSuccess()
                    }else {
                        this.$message({
                            message: 'MAC已存在,添加失败',
                            type: 'warning'
                        });
                    }

                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

        },

    }
</script>

<style scoped>

</style>

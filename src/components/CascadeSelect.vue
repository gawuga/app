<template>
    <div >
      <el-row>
        <el-select v-model="deviceLineValues" style="float: left; padding: 3px 0" placeholder="请选择生产线"  @change="selectLineChange">
          <el-option
            v-for="item in deviceLineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" style="float: left; padding: 3px 0" placeholder="请选择设备类型"  @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="deviceNameValues" style="float: left; padding: 3px 0" placeholder="请选择设备名称"  @change="selectDeviceNameChange">
          <el-option
            v-for="item in deviceNameOptions "
            :key="item.deviceMac"
            :label="item.deviceName"
            :value="`${item.deviceMac}|${item.deviceName}`">
          </el-option>

        </el-select>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "CascadeSelect",
        data() {
            return {
                userId:1000,
                value:'',
                deviceMac:'',
                options:[],
                //生产线选择器
                deviceLineValues:'',

                deviceLineOptions: [],
                //设备名字选择器
                deviceNameValues:'',
                deviceNameOptions: [],

                //currentDevice:null,

                name:''
            };
        },
        created() {
            //页面创建时就获取用户拥有的设备类型
            //this.getDeviceListByPage();
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
            this.getDeviceLine()
        },
        methods:{
            returnSel(){
                console.log("returnSel")
                let obj = {}
                obj.value = this.value
                 obj.deviceLine = this.deviceLineValues
                obj.deviceName = this.deviceNameValues.split('|')[1]
                obj.deviceMac = this.deviceNameValues.split('|')[0]
                this.$emit("returnSel",obj)
            },
            //设备类型选择器改变函数
            selectChange(){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值

                this.getDeviceName(this.value,this.deviceLineValues)
            },

            //设备生产线选择器改变函数
            selectLineChange(){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值

                //this.getDeviceField(this.value)
                this.getDeviceTypeByUserId()
            },

            //设备名字选择器改变函数
            selectDeviceNameChange(selVal){
                //选择了新的设备 那么 数据时间范围 和 页面 重置为初始值
                this.currentDevice = selVal
                //直接获取数据
                console.log("dfsdf")
                console.log(selVal)
                this.returnSel()
               // this.getDeviceHistoryData(this.value,this.deviceLineValues,this.deviceNameValues )
            },

            getDeviceTypeByUserId(){

                this.$addr.get("device/getDeviceTypeByLine", {
                    params: {

                        deviceLine: this.deviceLineValues,
                        userId:this.userId
                    }})
                    .then((response) =>{
                        console.log(response);
                        if (response.status===200){
                            this.value = ''
                            this.options=[]
                            for (let i = 0; i< response.data.length;i++){
                                let obj = {}
                                obj.value = response.data[i].deviceType
                                obj.label =  obj.value
                                if (i === 0) {
                                    this.value = obj.value

                                    this.getDeviceName(this.value,this.deviceLineValues)

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
             * 得到设备生产线数据
             */
            getDeviceLine(deviceType){
                this.$addr.get("device/getLine", {
                    params: {
                        userId:this.userId,
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
                                obj.value = response.data[i].deviceLine
                                obj.label = "生产线"+obj.value
                                if (i === 0) {
                                    this.deviceLineValues = obj.value
                                    //this.getDeviceField(this.value)
                                    this.getDeviceTypeByUserId()
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
                        userId:this.userId,
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
                               // obj.value = response.data[i].deviceMac

                                //obj.label = response.data[i].deviceName
                                if (i === 0) {
                                    console.log("sfsfsdfsf")
                                    this.deviceNameValues = response.data[i].deviceMac+'|'+response.data[i].deviceName
                                    this.currentDevice = response.data[i]
                                    this.returnSel()
                                }
                                //console.log(obj)
                                /**
                                 * 复制给选择器
                                 */

                            }
                            this.deviceNameOptions = response.data
                            console.log(this.deviceNameValues)
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
        }
    }
</script>

<style scoped>

</style>

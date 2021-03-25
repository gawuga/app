<template>

  <div style="background: white;height: 800px" >

    <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'">
      <el-tab-pane label="设备类型" name="first"><el-card class="box-card" style="width: 100%">
        <DeviceType @passOptions="passOptions"></DeviceType>
      </el-card></el-tab-pane>
      <el-tab-pane label="设备" name="second"><el-card><DeviceDetail :value="value"  :options="options" :is-fresh-data="update" ref='test'></DeviceDetail></el-card></el-tab-pane>

    </el-tabs>






  </div>
</template>

<script>
  import DeviceType from "./DeviceType";
  import DeviceDetail from "./DeviceDetail";
    export default {
        name: "Device",
        components:{
            DeviceType,
            DeviceDetail
        },
        methods: {

            passOptions(e){
                console.log("centerDialogTypeVisible")
                console.log(this.value)
                if (this.options.length!==e.length){
                    this.change = true
                    this.options = e
                    console.log("hello world ")
                }else {
                    this.update = false
                }
                this.preValue = this.value


            },
            handleClick(tab, event) {
                if (tab.name == "second"){

                        if (this.options.length ===0)  this.value=''
                        else this.value =this.options[0].value
                        // else
                        this.$refs.test.getDeviceMacList(this.value)
                        this.change = false

                }
                console.log(this.value)
            },

        },
        /**
         * 页面初始化
         *
         */
        created() {
            //页面创建时就获取数据
            //this.getDeviceList();
        },
        data() {
            return {
                change:false,
                preValue:'',
                value:'',
                options:[],


                activeName: 'first',


                userId:1000,
                update:false,
                //设备模块的url
                subURl:"device/",

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
</style>

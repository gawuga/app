<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <h3 style="float: left; padding: 3px 0;margin-left: 16px">实时数据</h3>
        </el-col>
        <el-col :span="12">
          <el-button style="float: right;margin-top: 16px" type="primary" @click="centerDialogVisible = true" >添加<i class="el-icon-upload el-icon--right" ></i></el-button>
        </el-col>
      </el-row>
      <el-row >

        <el-col :span="6" v-for="(value, key) in totalData" :key="key">
          <real-data-card style="margin:8px " :obj="value" :bg=bg[key] @passBtn="passBtn" :index="key"></real-data-card>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <h3 style="float: left; padding: 3px 0;margin-left: 16px">统计数据</h3>
        </el-col>
      </el-row>
      <el-row>
        <statis></statis>
      </el-row>
    </el-main>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="15%"
      center>
      <cascade-select @returnSel="returnSel"></cascade-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="btnConfirm">确 定</el-button>,
  </span>
    </el-dialog>
  </el-container>

</template>



<script>
    import CascadeSelect from "./CascadeSelect";
    import RealDataCard from "./RealDataCard";
    import Statis from "./Statis";
    export default {
        name: "WorkStation",

        components:{
            RealDataCard,
            CascadeSelect,
            Statis
        },
        data() {
            return {
                //为了标识socket链接的唯一性
                userNum:'',
                //后台socke
                path:"ws://localhost:8086/online/send/",
                socket:"",
                subURl:'device/',
                userId:1000,
                deviceMac:'',
                deviceType:'',
                deviceLine:'',
                deviceName:'',
                centerDialogVisible:false,
                bg:[
                    '#87CEFA',
                    '#E1FFFF',
                    '#90EE90',
                    '#FFFFE0',
                    '#F5DEB3',
                    '#F08080',
                    '#D3D3D3',
                    '#FFE4E1'
                ],
                example:{
                    mac:'',
                    line:'xxx',
                    type:'xxx',
                    name:'xx',
                    data:[
                        {
                            date:'xxx',
                            dataId:'xxx',
                            result:'xxx'
                        }

                    ]
                },
                totalData:[]
            };
        },
        methods:{           //----------------------------------------------socket----------------------------------------------
            init: function () {
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path  +this.userId + "/device")
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
                for (let i = 0; i< this.totalData.length;i++){
                    console.log(this.totalData[i])
                    let s = this.totalData[i].mac.replace(" ",'')
                    console.log(s)
                    console.log(data.deviceId)
                      if (data.deviceId === s){
                          console.log("是你了")
                          this.totalData[i].data.push(data)
                      }
                }
                console.log(data.pass)
            },

            close: function () {
                console.log("socket已经关闭")
            },
            //----------------------------------------------socket----------------------------------------------
            //删除该卡片
            passBtn(e){
                console.log("下标"+e)

                console.log("删除")
                this.delCard(e)
            },
            delCard(e){
                this.$addr.get(this.subURl+"delUserDisplayDevice/", {
                    params: {
                        userId:1000,
                        deviceMac:this.totalData[e].mac
                    }
                })
                    .then((response) =>{
                        console.log(response);
                        if (response.data==="success"){
                            //this.getDeviceMacList(this.value)
                            this.totalData.splice(e,1)
                            if (this.totalData.length==0){
                                this.totalData.push(this.example)
                            }
                        }else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                        }

                    });
            },
            returnSel(e){
                console.log("选择对象")
                console.log(e)
                console.log("fds")
                this.deviceMac = e.deviceMac
                this.deviceLine = e.deviceLine
               this.deviceType= e.value
               this.deviceName= e.deviceName
            },
            btnConfirm(){
                this.centerDialogVisible = false
                this.addCard()
            },

            addCardToServer(obj){
                this.$addr({
                    method: 'post',
                    url: this.subURl+"addUserDisplayDevice",
                    data: {
                        userId:this.userId,
                        deviceMac:this.deviceMac,
                        deviceType:this.deviceType,
                        deviceLine:this.deviceLine,
                        deviceName: this.deviceName
                    }
                    , headers: {'Content-Type': 'application/json'}
                }).then((response)=> {
                    console.log(response);
                    if (response.data == "success"){
                        this.totalData.push(obj)
                    }else {
                        this.$message({
                            message: '卡片已存在,添加失败',
                            type: 'warning'
                        });
                    }

                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //向后台请求添加现实卡片配置信息
            addCard(){
                let obj={}
                obj.line=this.deviceLine
                obj.type=this.deviceType
                obj.name=this.deviceName
                obj.mac = this.deviceMac
                obj.data = []
                if (this.isHashCard(obj)){
                    if (this.totalData[0].line=="xxx") {
                        this.totalData = []
                    }
                    this.addCardToServer(obj)
                }
            },
            /**
             * 查看是否已经有这卡片显示
             * @param obj
             * @returns {boolean}
             */
            isHashCard(obj){
                for (let i = 0; i <  this.totalData.length;i++){

                    if (this.totalData[i].mac===obj.mac){
                        console.log(this.totalData[i])
                        console.log(obj)
                        console.log("nice")
                        return false
                    }else continue

                }
                return true
            },


            getCardByUserId(){
                this.$addr.get("device/getCardByUserId/", {
                    params: {
                        userId:this.userId,
                    }})
                    .then((response) =>{
                        console.log(response);
                        if (response.data.length>0) this.totalData = []
                        if (response.status===200){

                            for (let i = 0; i< response.data.length;i++){
                                let obj={}
                                obj.line=response.data[i].deviceLine
                                obj.type=response.data[i].deviceType
                                obj.name=response.data[i].deviceName
                                obj.mac = response.data[i].deviceMac
                                obj.data = []
                                this.totalData.push(obj);
                            }
                        }else {
                            this.$message({
                                message: '获取设备类型数据失败',
                                type: 'warning'
                            });
                        }

                    })
                    .catch((error)=> {
                        console.log(error);
                        this.showMain = false
                        this.tip = "无法连接上服务器,"
                    });
            }
        },
        created(){
            if(window.sessionStorage.getItem("userId")){
                this.userId = JSON.parse(window.sessionStorage.getItem("userId"));
            }
            this.init()
            this.totalData.push(this.example)
            this.getCardByUserId()
        },
        mounted() {

        },
        destroyed() {

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

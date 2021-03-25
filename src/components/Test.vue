<template>
 <div>
   <el-menu
     :default-active="activeIndex"
     class="el-menu-demo"
     mode="horizontal"
     @select="handleSelect"
     background-color="#545c64"
     text-color="#fff"
     active-text-color="#ffd04b" style="margin-top: -60px" router>
     <el-menu-item index="/work" >工作台</el-menu-item>
     <el-menu-item index="/historydata" >历史数据</el-menu-item>
     <el-menu-item index="/device" >设备管理</el-menu-item>
     <el-menu-item index="/mine" >个人中心</el-menu-item>
     <el-menu-item  @click="returnPlatform">
       <i class="el-icon-cloudy"></i>
       <span slot="title">返回平台</span>
     </el-menu-item>
   </el-menu>

   <div class="content" style="background: #F5F5F5">

     ·<transition name="move" mode="out-in">

         <router-view ></router-view>

       </transition>
   </div>
 </div>
</template>

<script>

    export default {
        name: "Test",
        data() {
            return {
                activeIndex: '/work',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            returnPlatform:function () {

                    console.log("返回平台");

            },
            getCode () { // 非静默授权，第一次有弹框
                this.code = ''
                var local = window.location.href // 获取页面url
                var appid = 'wx65adcf075369****'
                this.code = this.getUrlCode().code // 截取code
                console.log(this.code)
                if (this.code == null || this.code === '') { // 如果没有code，则去请求
                    //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
               //如果用户直接调用这个地址进行访问 ，那么先看有没有缓存code，如果没有 说明用户没有授权直接进入的 那么需要到授权界面

                } else {
                    // 你自己的业务逻辑
                    sessionStorage.setItem('code',this.code);
                }
                sessionStorage.setItem('userId',1000);

            },
            getUrlCode() { // 截取url中的code方法
                var url = location.search
                this.winUrl = url
                var theRequest = new Object()
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1)
                    var strs = str.split("&")
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                    }
                }
                return theRequest
            },
            //获取token
            getToken(){

            }
        },

        mounted() {
           // window.location.href = 'https://www.baidu.com'
            this.getCode ()
            console.log("我来了！！！！！！！！！！！！！");
            this.$router.push('/work');
        }

    }
 // var code = getParameter("code")

</script>

<style scoped>

</style>

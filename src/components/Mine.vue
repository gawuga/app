<template>

 <el-container style="height: 800px;background: white">

  <div class="center">
    <el-col  :offset="13" :span="20">
      <div class="grid-content bg-purple" style="width: 100%">
        <el-card class="box-card" style="font-size: 18px" >
          <div slot="header" class="clearfix">
            <span style="float: left; padding: 3px 0">个人资料</span>

          </div>
          <el-row style="font-size: 16px">
            <el-col :span="3" style="text-align: right"><div>名称:</div></el-col>
            <el-col :span="6" style="text-align: left">陈飞</el-col>


          </el-row>
          <el-row style="margin-top: 24px;font-size: 16px">
            <el-col :span="3" style="text-align: right"><div>公司:</div></el-col>
            <el-col :span="6" style="text-align: left">阿里巴巴</el-col>
          </el-row>

        </el-card>
      </div></el-col>
  </div>


 </el-container>

</template>

<script>
    export default {
        name: "Mine",
        data () {
            return {
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
                sizeList: ["large", "medium", "small"],
                currentDate: new Date()
            }
        }

    }
</script>

<style scoped>
.center{
  text-align:center;
  margin-top: 64px;
  top:50%;
  left:50%;
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
    width: 640px;
    margin-left: 64px;
  }
.contain{
  margin-top: 64px;
}

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }



</style>

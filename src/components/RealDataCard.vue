<template>
    <div style="height: 250px;border-radius: 30px">
      <el-card style="height: 250px;border-radius: 30px;" :style="{background:bg}">
        <div slot="header" class="clearfix">
          <span>生产线:{{obj.line}}</span>
          <span>类型:{{obj.type}}</span>
          <span>名称:{{obj.name}}</span>
          <span style="float: right;" class="el-icon-close" v-on:click="passBtn"></span>
        </div>

        <el-row style="margin-top: -16px" >
          <el-col :span="8">日期</el-col>
          <el-col :span="12">被测物id</el-col>
          <el-col :span="4">结果</el-col>
        </el-row>
        <vue-seamless-scroll :data="obj.data" :class-option="optionHover" class="seamless-warp" style="height: 360px;" >

          <div v-for="item in obj.data" >
            <el-row >
              <el-col :span="8"><span v-text="item.date"></span></el-col>
              <el-col :span="12"><span v-text="item.dataId"></span></el-col>
              <el-col :span="4"><span  v-text="item.result"></span></el-col>
            </el-row>
          </div>

        </vue-seamless-scroll>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "RealDataCard",
        props: {
            'obj':Object,
            'bg':String,
            'index':String
        },
        methods:{
            passBtn(){
                console.log("centerDialogTypeVisible")
                this.$emit("passBtn",this.index)
            }
        },
        created(){
            console.log(this.obj)
        },
        computed: {
            optionHover () {
                return {
                    hoverStop: false
                }
            }
        },
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

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .seamless-warp {
    height: 229px;
    overflow: hidden;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

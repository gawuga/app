<template>
<div>
  <el-row style="margin-top: 8px;margin-left: 3px">
    <el-form ref="form" label-width="80px">
      <el-col style="margin-top: 12px">字段一</el-col>
      <el-input
        v-model="fields_1"
        placeholder="只能输入最多20位英文字母"
        oninput="value=value.replace(/[^a-zA-Z]/g,'')"
        maxlength="20"
        @blur="inputChange" style="margin-top: 4px" >
      </el-input>

      <el-col style="margin-top: 12px">字段二</el-col>
      <el-input
        v-model="fields_2"
        placeholder="只能输入最多20位英文字母"
        oninput="value=value.replace(/[^a-zA-Z]/g,'')"
        maxlength="20"
        @blur="inputChange2" style="margin-top: 4px" >
      </el-input>

      <el-col style="margin-top: 12px">字段三</el-col>
      <el-input
        v-model="fields_3"
        placeholder="只能输入最多20位英文字母"
        oninput="value=value.replace(/[^a-zA-Z]/g,'')"
        maxlength="20"
        @blur="inputChange3" style="margin-top: 4px" >
      </el-input>
    </el-form>

  </el-row>
</div>
</template>

<script>
    export default {
        name: "EditField",
        props: {
            'fields_1':String,
            'fields_2':String,
            'fields_3':String,
        },
        data() {
            return {
                e_fields_1:'',
                e_fields_2:'',
                e_fields_3:'',
            }
        },
        methods:{
            inputChange(e){
                //this.fields_1= e.target.value
                console.log(e.target.value)
                this.$emit("returnField_1",e.target.value)
            },
            inputChange2(e){
                console.log(e.target.value)
                this.$emit("returnField_2",e.target.value)
            },
            inputChange3(e){
               // this.fields_3= e.target.value
                //this.passDeviceId()
               // console.log(this.fields_3)
                this.$emit("returnField_3",e.target.value)
            },
        },

    }
</script>

<style scoped>

</style>f

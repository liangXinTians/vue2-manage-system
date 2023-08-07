<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style="padding-left: 15px">
          <i class="el-icon-s-order"></i>基本表单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px" size="medium">
        <el-form-item label="表单名称">
          <el-input v-model="form.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-col :span="5.5">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width:;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="5.5">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width:"></el-time-picker>
          </el-col>
          <el-col :span="12"></el-col>
        </el-form-item>
        <el-form-item label="选择开关">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="多选框">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框">
          <el-input type="textarea" v-model="form.desc" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
    }
  }
};
</script>

<style scoped>
.form{
  background-color: rgb(255,255,255);
  border-radius: 5px;
  margin: 15px;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
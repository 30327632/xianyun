<!--
 * @Author: your name
 * @Date: 2019-12-07 23:07:58
 * @LastEditTime: 2019-12-08 21:05:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\xianyun\components\user\registerForm.vue
 -->
<template>
  <el-form  ref="form"  class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" >
        <template slot="append">
          <el-button >发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" ></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" >注册</el-button>
  </el-form>
</template>

<script>

export default {
  data() {
    return{
      
    }
  
   
  },
  methods: {
   
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
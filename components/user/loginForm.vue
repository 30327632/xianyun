<!--
 * @Author: your name
 * @Date: 2019-12-07 22:52:27
 * @LastEditTime: 2019-12-09 16:12:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\xianyun\components\user\loginForm.vue
 -->
<template>
  <el-form class="form" :model="loginForm" :rules="rules" ref="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="login">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      //在发送之前  先对整个表单进行验证
      this.$refs.form.validate(res => {
        if (res) {
          // 第一种实现登录的方式
          // 如果整个表单都验证通过再登录
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "post",
          //   data: {
          //     username: this.loginForm.username,
          //     password: this.loginForm.password
          //   }
          // }).then(res => {
          //   //数据回来之后 把用户的信息先存到vuex  怎么操作仓库  去修改值呢  通过commit去操作mutations里面是函数
          //   this.$store.commit("user/setUserInfo",res.data)
          //   //登录成功后 把用户信息存到vuex
          //   if (res.status == 200) {
          //     this.$message({
          //       type: "success",
          //       message: "登录成功，正在跳转"
          //     });
          //     //跳转到主页
          //     setTimeout(() => {
          //       this.$router.replace("/");
          //     }, 1000);
          //   }
          // });
          
          //实现登录的第二种方式 第一个参数:"仓库文件名/action对应的login方法"  第二个参数:要从这个页面带过去的参数  
          //因为要在user.js中发送请求 发送请求需要的数据就要从这个参数中传过去
          this.$store.dispatch("user/login",this.loginForm).then(res=>{
            //成功提示
             this.$message({
                type: "success",
                message: "登录成功，正在跳转"
              });
              //跳转到首页 当用户返回的的时候 为了不再显示登录页  所以用this.$router.replace("/")  replace是代替当前页 返回的时候  只会看到登录到达上一个记录  而push是在当前登录页面之后添加一个记录 当用户想返回的时候是会回到登录页面的
              setTimeout(() => {
                 this.$router.replace("/")
              }, 1000);
             
          })
        }
      });
    }
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
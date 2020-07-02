<template>
  <div class="login-layout">
    <div class="login-content">
      <div class="logo-box">
        <div class="login-logo-item" ref="logContainer"></div>
        <p>后台管理系统</p>
      </div>
      <div class="form-box">
        <div class="login-box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item label prop="accountName">
              <div class="from-field">
                <img src="../../assets/images/user.png" alt />
                <input
                  placeholder="账户"
                  type="text"
                  class="inp-icon"
                  v-model="ruleForm.accountName"
                  ref="user"
                />
              </div>
            </el-form-item>
            <el-form-item label prop="accountPasswd">
              <div class="from-field">
                <img src="../../assets/images/lock.png" alt />
                <input
                  placeholder="密码"
                  type="password"
                  class="inp-icon"
                  v-model="ruleForm.accountPasswd"
                  @keypress.enter="login"
                />
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="login-btn" @click="login('ruleForm')">登 录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken, setCookie } from "@/utils/auth.js";
import { session } from "@/api/user";
import { Encryption } from "@/utils/AES.js";

export default {
  data() {
    return {
      ruleForm: {
        accountName: "",
        accountPasswd: ""
      },
      rules: {
        accountName: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        accountPasswd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    login(formName) {
      this.$router.replace("/home");
      return
      this.$refs[formName].validate(valid => {
        if (valid) {
          let password = Encryption(this.ruleForm.accountPasswd); // 密码加密
          session({
            accountName: this.ruleForm.accountName,
            accountPasswd: password
          })
            .then(res => {
              if (res.code == this.$code.success) {
                // 登录成功的话,保存token,如果有用户信息的话,保存用户信息
                setToken(res.result.data.accessToken);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.result.data)
                );
                return res.code;
              }
            })
            .then(code => {
              // 如果需要登陆成功请求某些接口,可以放到这里做处理,处理完后跳转到首页
              if (code == this.$code.success) {
                this.$router.replace("/home");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./login.less";
</style>
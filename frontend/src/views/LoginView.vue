<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input id="username" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input id="password" v-model="loginForm.password" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const loginFormRef = ref(null);
    const loginForm = ref({
      username: '',
      password: ''
    });
    const loginRules = ref({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    });

    const handleSubmit = () => {
      const form = loginFormRef.value;
      form.validate((valid) => {
        if (valid) {
          axios.post('/api/login', loginForm.value)
            .then(res => {
              console.log('login success:', res.data);
              // 登录成功，跳转到首页或其他页面
              // this.$router.push('/home');
            })
            .catch(error => {
              console.log('login failed:', error);
              // 登录失败，提示错误信息
              this.$message.error('用户名或密码错误');
            });
        } else {
          console.log('login failed');
          return false;
        }
      });
    }

    return {
      loginFormRef,
      loginForm,
      loginRules,
      handleSubmit
    }
  }
}
</script>

<style>
.login-container {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
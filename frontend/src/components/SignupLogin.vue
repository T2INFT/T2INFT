<template class="SignupLogin">
    <el-dialog title=" " :visible="signupVisible || loginVisible" :visible.sync="signupVisible || loginVisible" @close="$emit('update:loginVisible', false);$emit('update:signupVisible', false)" width="30%">
        <!-- <template v-slot:header>
            <img src="../assets/logo.png" alt="title-image">
        </template> -->
        <template v-slot:title class="title">
            <img src="../assets/logo4.png" alt="title-image" style="width: 35%;">
        </template>
        <template v-if="loginVisible" v-slot:default>
            <el-form ref="form" :model="loginForm" :rules="rules">
                <el-form-item
                label=""
                prop="email"
                >
                <el-input id="email" prefix-icon="el-icon-message" placeholder="Email" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item
                label=""
                prop="password"     
                >
                <el-input id="password" prefix-icon="el-icon-lock" placeholder="Password" type="password" v-model="loginForm.password"></el-input>
                </el-form-item>

            </el-form>
            <el-button type="primary" @click="loginSubmit" style="height: auto; width: 90%; margin: 0 5% 3% 5%;">Log in</el-button>
            <span>Don't have an account?
                <el-link type="primary" @click="$emit('update:loginVisible', false);$emit('update:signupVisible', true)">
                    Signup here
                </el-link>
            </span>
        </template>
        <template v-if="signupVisible" v-slot:default>
            <el-form ref="form" :model="registerForm" :rules="rules">
                <el-form-item
                    label=""
                    prop="email"
                    :rules="[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input id="email" prefix-icon="el-icon-message" placeholder="Email" v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="password"
                    :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
                    ]"
                >
                    <el-input id="password" prefix-icon="el-icon-lock" placeholder="Password" type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="confirmPassword"
                    :rules="[
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: validateConfirmPassword, trigger: 'blur' }
                    ]"
                >
                    <el-input id="confirmPassword" prefix-icon="el-icon-s-check" placeholder="Confirm password" type="password" v-model="registerForm.confirmPassword"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="signupSubmit" style="height: auto; width: 90%; margin: 0 5% 3% 5%;">Sign up</el-button>
            <span>Already have an account?
                <el-link type="primary" @click="$emit('update:loginVisible', true);$emit('update:signupVisible', false)">
                    Login here
                </el-link>
            </span>
        </template>
        <!-- <template v-slot:footer>

        </template> -->
    </el-dialog>
</template>
<script setup>
import { ref, defineComponent, createVNode, render, inject } from 'vue';
import axios from 'axios';
// import VueCookies from 'vue-cookies';
import { useStore } from 'vuex';
import sha256 from 'crypto-js/sha256';
import { Msgbox } from 'element3';
// import aes from "crypto-js/aes";
const store = useStore()
// var SHA256 = require("crypto-js/sha256");
const containerRef = ref(null)
// const privatekey = 'Hello from dynamic component!'
const wallet = ref({
    address: '',
    privatekey: ''
})
// inject('logstate')
defineProps({
    loginVisible: Boolean,
    signupVisible: Boolean
})
const emit = defineEmits(['update:loginVisible', 'update:signupVisible'])
// function handleLink(){
//     emit('update:loginVisible', false);
//     emit('update:signupVisible', true)
// }
// const dialogVisible =  computed(()=>props.loginVisible)
// console.log(props.loginVisible)
const registerForm = ref({
      email: '',
      password: '',
      confirmPassword: ''
    });
const loginForm = ref({
    email: '',
    password: '',
})
const loginFormRef = ref(null);
const loginRules = ref({
    email: [{ required: true, message: 'please input email', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});
function loginSubmit() {
    // privateKeyAlert(sha256(loginForm.value.password).toString())
    // saveAsTxtFile(sha256(loginForm.value.password).toString(), 'privateKey.txt')
    axios.post(store.state.url+'/auth/login', {
        'email': loginForm.value.email,
        'password': sha256(loginForm.value.password).toString()
    })
    .then(res => {
        console.log('login...')
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('userid', res.data.data.userid)

        store.state.logState = true
        store.state.token = res.data.data.token
        store.state.userid = res.data.data.userid

        emit('update:loginVisible', false);
        emit('update:signupVisible', false)
    })
    .catch( error => {
        console.error(error)
    })
    // console.log()
}

function signupSubmit() {
    // const valid = ref(true);
    // console.log(registerForm.value)
    // console.log('aabb')
    // console.log(sha256('aabb').toString())
    // console.log(localStorage.getItem('token')==null)
    // console.log(aes.encrypt('my message', 'secret key 123').toString())
    axios.post(store.state.url+'/auth/register', {
        "email": registerForm.value.email,
        "password": sha256(registerForm.value.password).toString()
    })
    .then(res => {
        console.log('signup...')
        console.log('login success:', res.data);
        // 登录成功，跳转到首页或其他页面
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('userid', res.data.data.userid)
        console.log(res.data.data.wallet)

        store.state.logState = true
        store.state.token = res.data.data.token
        store.state.userid = res.data.data.userid

        // VueCookies.set("userInfo",res.data,'7d');
        // createComponent();
        // console.log(VueCookies.userInfo)
        // this.$router.push('/home');
        emit('update:loginVisible', false);
        emit('update:signupVisible', false);
        privateKeyAlert(res.data.data.wallet.privateKey)
        saveAsTxtFile(res.data.data.wallet.privateKey, 'privateKey.txt')
    })
    .catch( error => {
        console.error(error)
    })
    .then(()=>{
        console.log('signup...')
        
    })
    // .catch(error => {
    //     console.log('login failed:', error);
    //     // 登录失败，提示错误信息
    //     this.$message.error('signup failure');
    // });
    // registerForm.value.validate((valid) => {
    // if (true) {
    //     console.log('aabb')
    //     axios.post('http://10.68.40.185:4000/auth/register', registerForm.value)
    //     .then(res => {
    //       console.log('login success:', res.data);
    //       // 登录成功，跳转到首页或其他页面
    //       // this.$router.push('/home');
    //     })
    //     .catch(error => {
    //       console.log('login failed:', error);
    //       // 登录失败，提示错误信息
    //       this.$message.error('用户名或密码错误');
    //     });
    // } else {
    //     console.log('error submit!!');
    //     return false;
    // }
    // });
}
function saveAsTxtFile(data, filename) {
  const blob = new Blob([data], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
function privateKeyAlert(privateKey) {
    Msgbox.alert(`<p style="color: red;font-weight: bold;">Remember your private key, you only have one chance!!!</p><p style="word-wrap:break-word;">${privateKey}</p>`,
    'Successful',
    {
        confirmButtonText: 'I remembered',
        dangerouslyUseHTMLString: true
    })
}
</script>

<style scoped>
.el-form{
    margin: 5%;
}
::v-deep .el-dialog__header {
  padding-bottom: 0 !important;
  padding-top: 30px !important;
}
::v-deep .el-dialog__body {
  padding-top: 0 !important
}
</style>
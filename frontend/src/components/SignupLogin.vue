<template class="SignupLogin">
    <el-dialog title=" " :visible="signupVisible || loginVisible" :visible.sync="signupVisible || loginVisible" @close="$emit('update:loginVisible', false);$emit('update:signupVisible', false)" width="30%">
        <!-- <template v-slot:header>
            <img src="../assets/logo.png" alt="title-image">
        </template> -->
        <template v-slot:title class="title">
            <img src="../assets/logo4.png" alt="title-image" style="width: 35%;">
        </template>
        <template v-if="loginVisible" v-slot:default>
            <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules"> -->
            <el-form :model="loginForm">

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
            <!-- <el-form ref="registerForm" :model="registerForm" :rules="registerRules"> -->
            <el-form :model="registerForm">

                <el-form-item
                    label=""
                    prop="email"
                >
                    <el-input id="email" prefix-icon="el-icon-message" placeholder="Email" v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="password"
                >
                    <el-input id="password" prefix-icon="el-icon-lock" placeholder="Password" type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="confirmPassword"
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
import { ref, onMounted, defineComponent, createVNode, render, inject } from 'vue';
import axios from 'axios';
// import VueCookies from 'vue-cookies';
import { useStore } from 'vuex';
import sha256 from 'crypto-js/sha256';
import { Msgbox, Message } from 'element3';
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

var validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password again'))
        } else if (value !== registerForm.password) {            
          callback(new Error('The passwords entered twice are inconsistent!'))
        } else {
          callback()
        }}
// const loginFormRef = ref(null);
const loginRules = ref({
    email: [{ required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please enter the correct email format', trigger: ['blur', 'change'] }],
    password: [{ required: true, message: 'please input password', trigger: 'blur' },
    { min: 4, max: 20, message: 'Password length between 4 and 20 characters', trigger: 'blur' }]
});
const registerRules = ref({
    email: [{ required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please enter the correct email format', trigger: ['blur', 'change'] }],
    password: [{ required: true, message: 'please input password', trigger: 'blur' },
    { min: 4, max: 20, message: 'Password length between 4 and 20 characters', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: 'Please confirm your password', trigger: 'blur' },
                    { validator: validateConfirmPassword, trigger: 'blur' }]
});
function loginSubmit() {
    // loginForm.value.validate((valid)=>{
    //     if (valid){
    //         console.log('valid')

    //     } else{
    //         console.log('not valid')
    //     }
    // })
    axios.post(store.state.url+'/auth/login', {
        'email': loginForm.value.email,
        'password': sha256(loginForm.value.password).toString()
    })
    .then(res => {
        // console.log('login...')
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('userid', res.data.data.userid)

        store.state.logState = true
        store.state.token = res.data.data.token
        store.state.userid = res.data.data.userid

        emit('update:loginVisible', false);
        emit('update:signupVisible', false)
        Message({
            message: 'Login success!',
            type: 'success'
          })
    })
    .catch( error => {
        Message({
            message: 'Login failure...',
            type: 'warning'
          })
        console.error(error)
    })
}

function signupSubmit() {
    // const valid = ref(true);
    // console.log(registerForm.value)
    // console.log('aabb')
    // console.log(sha256('aabb').toString())
    // console.log(localStorage.getItem('token')==null)
    // console.log(aes.encrypt('my message', 'secret key 123').toString())
    // registerForm.value.validateField('confirmPassword').then(res => {
    //     console.log(res)
    // }).catch(({errors, fields}) => {
    //     console.log('error:', errors)
    //     console.log('fields:', fields)
    // })
    // if (registerForm.confirmPassword !== registerForm.password) {
    //     callback(new Error('The passwords entered twice are inconsistent!'))
    //     // console.log
    // }
    // if (registerForm.value.validateField('confirmPassword')) {
    //     console.log('yes')
        
    // } else{
    //     console.log('no')
    //     // registerForm.resetFields('confirmPassword')
    //     console.log(a)

    // }
    axios.post(store.state.url+'/auth/register', {
        "email": registerForm.value.email,
        "password": sha256(registerForm.value.password).toString()
    })
    .then(res => {
        // console.log('signup...')
        // console.log('login success:', res.data);
        // 登录成功，跳转到首页或其他页面
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('userid', res.data.data.userid)
        // console.log(res.data.data.wallet)

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
        Message({
            message: 'Signup success!',
            type: 'success'
          })
    })
    .catch( error => {
        Message({
            message: 'Signup failure...',
            type: 'warning'
          })
        console.error(error)
    })
    .then(()=>{
        // console.log('signup...')
        
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
<template>
  <el-row align="middle" class="row-container">
    <el-col :span="2">
      <div class="logo-container">
        <img src="../assets/logo4.png" alt="Logo" @click="toWelcome">
      </div> 
      <!-- <el-image src="../assets/logo.svg" :fit="fit"></el-image> -->
      <!-- t2inft -->
    </el-col>
    <!-- <el-col :span="2" :offset="19">
      <div class="icon-container">
        <el-tooltip content="Go to wallet." placement="bottom" @click="test2">
          <i class="el-icon-wallet custom-icon"></i>
        </el-tooltip>
      </div>
    </el-col> -->
    <el-col :span="1" :offset="21">
      <!-- <el-popover placement="bottom-end" v-model="visible">
        <div v-if="logState" class="popover">
          <el-link icon="el-icon-food">Profile</el-link>
          <el-divider style="margin:5%;"></el-divider>
          <el-link icon="el-icon-burger">Log out</el-link>
        </div>
        <div v-else></div>
        <template #reference>
          <div class="avatar-container">
            <el-avatar el-avatar class="avatar" icon="el-icon-user-solid" ></el-avatar>
          </div>
        </template>

      </el-popover> -->
      <el-dropdown  v-if="store.state.logState" trigger="click">
        <div class="avatar-container">
            <!-- <el-avatar fit="contain" src="../assets/Avatar.jpg" ></el-avatar>
             -->
            <el-avatar el-avatar class="avatar" size="large" fit="fill" icon="el-icon-s-custom" style="background-color: white; color: #303133
;">
              <!-- <i class="el-icon-s-custom" ></i> -->
            </el-avatar>

        </div>
        <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item icon="el-icon-food" @click="toProfile">Profile</el-dropdown-item>
        <el-dropdown-item icon="el-icon-burger" @click="logout">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-else trigger="click">
        <div class="avatar-container">
            <!-- <el-avatar el-avatar class="avatar" icon="el-icon-user-solid" ></el-avatar> -->
            <el-avatar el-avatar class="avatar" size="large" fit="fill" icon="el-icon-s-custom" style="background-color: white; color: #909399;">
            </el-avatar>

        </div>
        <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item icon="el-icon-food" @click="loginVisible=true;">
          Log in 
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-burger" @click="signupVisible = true;">
          Sign up
        </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
  <el-divider style="margin: 0;"></el-divider>
  <!-- <Login v-model:loginVisible="loginVisible" v-model:signupVisible="signupVisible"/>
  <Signup v-model:signupVisible="signupVisible" v-model:loginVisible="loginVisible"/> -->
  <SignupLogin v-model:signupVisible="signupVisible" v-model:loginVisible="loginVisible"/>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
// console.log(store.state.logState)
// console.log(computed(()=>store.state.logState))
  // import Signup from './Signup.vue'
  // import Login from './Login.vue'
import SignupLogin from './SignupLogin.vue';
const logState = ref(false)
const signupVisible = ref(false)
const loginVisible = ref(false)
  // const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsI…DE1fQ.5cwLFpOtR-4fFsWAjUik5WVUp2Kp-iHIvOHevWgq6e4'

function toWelcome() {
  router.push('/')
}


function toProfile() {
  router.push('/profile')
}

function logout() {
  store.state.logState = false
}
</script>
<!-- <script>
  import { ref } from 'vue'
  import Signup from './Signup.vue'
  import Login from './Login.vue'
  export default {
    setup() {
      const visible = ref(false)
      const logState = ref(false)
      const dialogVisible = ref(false)
      const loginVisible = ref(false)
      return {
        visible,
        logState,
        dialogVisible,
        loginVisible
      }
    }
  }
</script> -->
<style scoped>
.custom-icon{
  font-size: 40px;
  color:  #909399;
}
.row-container,.logo-container,.icon-container,.avatar-container{
  display: flex;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  width: 100%;
  height: 100%;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.popover {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}
.el-popover {
  min-width: auto !important;
}
</style>
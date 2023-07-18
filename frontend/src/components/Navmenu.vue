<template>
  <Signup :signupVisible="signupVisible"/>

  <el-row align="middle" class="row-container">
    <el-col :span="2">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="Logo">
      </div> 
      <!-- <el-image src="../assets/logo.svg" :fit="fit"></el-image> -->
      <!-- t2inft -->
    </el-col>
    <el-col :span="2" :offset="19">
      <div class="icon-container">
        <el-tooltip content="Go to wallet." placement="bottom">
          <i class="el-icon-wallet custom-icon"></i>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="1">
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
      <el-dropdown  v-if="logState" trigger="click">
        <div class="avatar-container">
            <el-avatar el-avatar class="avatar" icon="el-icon-user-solid" ></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" >
          <RouterLink to='/profile'>
            <el-dropdown-item icon="el-icon-food">Profile</el-dropdown-item>
          </RouterLink>
        <el-dropdown-item icon="el-icon-burger" @click="logState=false;">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-else trigger="click">
        <div class="avatar-container">
            <el-avatar el-avatar class="avatar" icon="el-icon-user-solid" ></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item icon="el-icon-food" @click="logState=true;">
          Log in 
          <!-- <Login :loginVisible="loginVisible"/> -->
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-burger" @click="signupVisible = true;">
          Sign up
          
        </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
  <el-divider style="margin: 0;"></el-divider>
</template>

<script setup>
  import { ref } from 'vue'
  import Signup from './Signup.vue'
  import Login from './Login.vue'

  const logState = ref(true)
  const signupVisible = ref(false)
  const loginVisible = ref(false)
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
<style>
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
.el-link {
  display: block;
  /* width: 100%; */
}
</style>
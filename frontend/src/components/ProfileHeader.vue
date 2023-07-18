<!--<template>
  <el-tabs :tab-position="tabPosition" class="sidebar" style="height: 200px;">
    <el-tab-pane label="User Info"><UserInfo /></el-tab-pane>
    <el-tab-pane label="Gallery"><Gallery /></el-tab-pane>
  </el-tabs>  
</template>

<script>
  import { ref } from 'vue'
  import UserInfo from '../components/UserInfo.vue'
  import Gallery from '../components/Gallery.vue'

  export default {
    setup() {
      const tabPosition = ref('left')
      return { tabPosition }
    },
    components: {
      UserInfo,
      Gallery
    }
  }
</script>

<style>
.el-tabs__item {
  font-size: 20px;
}
.sidebar {
  min-height: 100vh;
}
</style> -->

<template>
  <el-container>
  <el-aside>
    <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="profile_menu"
      @open="handleOpen"
      @close="handleClose"
      :default-openeds="defaultOpeneds"
    >
      <el-menu-item index="1" @click="itemIndex=1;console.log(itemIndex)">
        <i class="el-icon-s-custom"></i>
        <template v-slot:title>
          <span>User Info</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template v-slot:title>
          <i class="el-icon-picture"></i>
          <span>Gallery</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="itemIndex=2.1;console.log(itemIndex)">Minted NFT</el-menu-item>
          <template>
          </template>
          <el-menu-item index="1-2" @click="itemIndex=2.2;console.log(itemIndex)">Unminted NFT</el-menu-item>
          <template>
          </template>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-menu-item index="3" @click="itemIndex=3;console.log(itemIndex)">
        <i class="el-icon-wallet"></i>
        <template v-slot:title>
          <span>Wallet</span>
        </template>
      </el-menu-item> -->
      <router-link :to="{name: 'home'}">
        <el-menu-item class="home-menu" index="4" @click="itemIndex=4;console.log(itemIndex)">
        <i class="el-icon-s-home"></i>
        <template v-slot:title>
          <span>Home</span>
        </template>
      </el-menu-item>
      </router-link>
    </el-menu>
    </el-col>
    </el-row>
  </el-aside>
  <el-main>
    <UserInfo v-if="itemIndex == 1" />
    <MintNFT v-if="itemIndex == 2.1"/>
    <UnmintNFT v-if="itemIndex == 2.2"/>
    <Wallet v-if="itemIndex == 3" />
  </el-main>
</el-container>

</template>

<script setup>
  import { ref } from 'vue'
  import MintNFT from './MintNFT.vue'
  import UnmintNFT from './UnmintNFT.vue'
  import UserInfo from '../components/UserInfo.vue'
  import Wallet from '../components/Wallet.vue'

  const itemIndex = ref(1)
  // export default {
  //   setup() {
  //     let defaultOpeneds = ref(['1', '1-2'])

  //     function handleOpen(key, keyPath) {
  //       console.log(key, keyPath)
  //     }
  //     function handleClose(key, keyPath) {
  //       console.log(key, keyPath)
  //     }

  //     return { defaultOpeneds, handleOpen, handleClose }
  //   },
  //   components: {
  //     MintNFT,
  //     UnmintNFT
  //   }
  // }
</script>

<style>
.profile_menu {
  min-height: 100vh;
  width: 300px;
}
.el-menu-item {
  text-align: left;
}
.el-submenu {
  text-align: left;
}
</style>
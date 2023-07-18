<template>
    <div class="container">
        <img src="../assets/logo4.png" alt="Logo" style="width: 30%; margin-bottom: 2%;">
        <h1 style="margin-bottom: 0;">An Image and NFT Generator</h1>
        <h3>Turn your words into art and NFTs.      
        </h3>
        <div class="button-group">
            <el-button round plain style="margin-right: 1.5vh;" @click="introVisible=true">
                Introduction
            </el-button>
            <router-link to="/home" style="margin-left: 1.5vh;">
                <el-button type="primary" round>
                    Try T2INFT
                </el-button>
            </router-link>
        </div>
        <!-- <el-button-group>

        </el-button-group> -->
        <Introduction v-model:introVisible="introVisible" />
    </div>

</template>
<script setup>
import Introduction from '../components/Introduction.vue'
import { ref } from 'vue'
const introVisible = ref(false);
</script>
<style scoped>
.container {
    height: 100vh;
    /* width: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    /* background-image: linear-gradient(circle at center, #DC5034, #459AD0, #D89A41, #50B18F) !important */
}
</style>
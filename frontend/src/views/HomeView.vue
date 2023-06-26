<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import Navmenu from '../components/Navmenu.vue';
import Aside from '../components/Aside.vue';
import Footer from '../components/footer.vue';

</script>

<template>
<el-container style="height: 100vh; width: 100vw;">
  <el-header style="height: 10%;"><Navmenu /></el-header>
  <el-container>
    <el-aside style="width: 40%;">
      <Aside />
    </el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer> 
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<style>
  .el-header{
    background-color: #ffff;
    text-align: center;
    /* line-height: 60px; */
  }
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    /* line-height: 60px; */
  }

  .el-aside {
    background-color: #ffff;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
</style>

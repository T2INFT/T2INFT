<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import Navmenu from '../components/Navmenu.vue';
import Aside from '../components/Aside.vue';
import Footer from '../components/Footer.vue';
import Main from '../components/Main.vue';
</script>

<template>
<el-container style="height: 100vh; width: 100vw;">
  <el-header style="height: 10vh;"><Navmenu /></el-header>
  <el-container>
    <el-aside style="width: 40%; height: 90vh;">
      <Aside />
    </el-aside>
    <el-container>
      <el-main class="main-content" style="height: 80vh;">
        <Main /> 
      </el-main>
      <el-footer style="height: 10vh;"> 
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<style scoped>
.el-header {
  background-color: #ffff;
  text-align: center;
  /* line-height: 60px; */
}
.el-footer {
  background-color: #ffff;
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
  background-color: #ffff;
  color: #333;
  text-align: center;
  /* padding: 0%; */
  /* margin: 0; */
  /* line-height: 160px; */
}
.el-container > .el-main {
  padding: 0;
}
</style>

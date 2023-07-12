<template>
    <el-row class="footer">
      <el-tooltip content="Rate for the picture." placement="top">
        <el-rate v-model="rate"></el-rate>

      </el-tooltip>
      <el-tooltip content="Download the picture." placement="top">
        <el-button icon="el-icon-download" circle class="footerbutton"></el-button>
      </el-tooltip>
      <el-tooltip content="Copy the link." placement="top">
        <el-button icon="el-icon-copy-document" circle class="footerbutton"></el-button> 
      </el-tooltip>
    </el-row>
    <!-- <div class="buttonGroup">

    </div> -->

</template>
<style scoped>
.footer{
  display: flex;
  align-items: center;/*垂直居中*/
  /* justify-content: center; */
  /*水平居中*/
  width: 100%;
  height: 100%;
  padding-left: 4%;
}
.footerbutton {
  width: 5%;
  /* height: 5%; */
}
</style>
<script setup>
import { ref } from 'vue'
const rate = ref(null)
</script>
<template>
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
      <div class="avatar-container">
        <el-avatar class="avatar" icon="el-icon-user-solid" ></el-avatar>
      </div>
    </el-col>
  </el-row>
  <el-divider style="margin: 0;"></el-divider>
</template>

<script>

</script>
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
</style>
<template>
    <el-row class="footer">
      <el-tooltip content="Rate for the picture." placement="top">
        <el-rate id="rate" v-model="store.state.rateValue" @change="rateImg" :disabled="store.state.isRateDisabled"></el-rate>

      </el-tooltip>
      <el-tooltip content="Download the picture." placement="top">
        <el-button icon="el-icon-download" circle class="footerbutton" @click="downloadImg"></el-button>
      </el-tooltip>
      <el-tooltip content="Copy the link." placement="top">
        <el-button icon="el-icon-copy-document" circle class="footerbutton" @click="copyUrl"></el-button> 
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
import { useStore } from 'vuex';
import { saveAs } from 'file-saver';
import axios from 'axios';

const store = useStore()
// const isRateDisabled = ref(false)

// const rateValue = ref(null)
function rateImg () {
  console.log(store.state.rateValue)
  // const el_rate = document.querySelector('#rate')
  // el_rate.disabled = false
  axios.post(store.state.url+'/model/generate', {
      'userid': store.state.userid,
      'imgid': store.state.imgid,
      'grade': store.state.rateValue
    }, {
  headers: {
    'Authorization': store.state.token
  }
})
    .then(res => {
        console.log(res)

    })
  store.state.isRateDisabled = true
}

function downloadImg() {
  saveAs(store.state.imgdata, 't2inft.jpg');
}

function copyUrl() {
  console.log(store.state.datahttp)
  navigator.clipboard.writeText(store.state.datahttp);
}
</script>
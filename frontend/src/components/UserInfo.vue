<template>
    <el-table class="table" :data="tableData">
      <el-table-column label="Email" prop="email" width="300px"></el-table-column>
      <el-table-column label="Wallet Address" prop="wallet_address"></el-table-column>
    </el-table>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from "vue";
  import { useStore } from 'vuex';
import axios from 'axios';
import app from '@/main';


const tableData = ref([
    {
      email: 'test@gmail.com',
      wallet_address: 'Public Key'
    }
  ]);
const store = useStore()
  onMounted(() => {
    app.config.globalProperties.$loading.showLoading()
    axios.post(store.state.url+'/users/profile', {
      'userid': store.state.userid,
    }, {
  headers: {
    'Authorization': store.state.token
  }
})
    .then(res => {
        // console.log(res.data.data)
        tableData.value[0].email = res.data.data.email
        tableData.value[0].wallet_address = res.data.data.wallet
        app.config.globalProperties.$loading.hideLoading()
    })
});

  </script>

<style>
.table {
 width: 100%;
 font-size: 18px;
}
</style>
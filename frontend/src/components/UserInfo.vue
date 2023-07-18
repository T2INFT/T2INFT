<template>
    <el-table class="table" :data="tableData">
      <el-table-column label="Email" prop="email" width="300px"></el-table-column>
      <el-table-column label="Wallet Address" prop="wallet_address"></el-table-column>
    </el-table>
  </template>
  
  <script setup>
  const tableData = [
    {
      email: 'test@gmail.com',
      wallet_address: 'Public Key'
    }
  ];
  </script>

<style>
.table {
 width: 100%;
 font-size: 18px;
}
</style>
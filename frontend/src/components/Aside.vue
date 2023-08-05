<template>
  <h1 style="font-size: 30px; font-weight: bold; text-align: left; margin: 2% 5% 2% 5%;">Input</h1>
  <el-collapse v-model="activeNames">
      <el-collapse-item title="Image generation form text" name="1">
          <el-form :model="formGeneration" label-width="15%" :label-position="labelPosition">
              <el-form-item label="Prompt">
                  <el-input v-model="formGeneration.prompt" type="textarea" :rows="3" placeholder="Describe what you want the AI draw"></el-input>
              </el-form-item>
              <el-form-item label="Model">
                  <el-select v-model="formGeneration.model" placeholder="Stable Diffusion v1-5" disabled>
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">  
                  </el-option></el-select>
              </el-form-item>    
              <el-form-item>
                  <el-button type="primary" @click="generate">Generate</el-button>
              </el-form-item>
          </el-form>
      </el-collapse-item>
      <el-collapse-item title="Image style transfer" name="2">
          <el-form :model="formTransfer" label-width="15%" :label-position="labelPosition">
              <el-form-item label="Strength">
                  <!-- <el-switch v-model="value1" disabled> </el-switch> -->
                  <el-slider v-model="formTransfer.strength" :step="10" show-stops disabled> </el-slider>
              </el-form-item>
              <el-form-item>
                  <el-button type="warning" @click="transfer">Transfer</el-button>
              </el-form-item>
          </el-form>
      </el-collapse-item>
      <el-collapse-item title="Image on-chain" name="3">
          <el-form :model="formOnchain" label-width="15%" :label-position="labelPosition">
              <el-form-item label="Key">
                  <el-input v-model="formOnchain.pkey"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="success" @click="onchain">On-chain</el-button>
              </el-form-item>
          </el-form>
      </el-collapse-item>
  </el-collapse>
  
  </template>
  <script setup>
  import { reactive, toRefs, ref } from 'vue'
  import { useStore } from 'vuex';
  import axios from 'axios';
import { Message } from 'element3';
import app from '@/main';
import aes from "crypto-js/aes";
const crypto = require('crypto');
  const store = useStore()
  // const imgid = ref(-1)
  const data = reactive({
    formGeneration: {
      name: '',
      region: '',
      type: '',
      value: ''
    },
    options: [
      {
        value: 'sd1_5',
        label: 'Stable Diffusion v1-5'
      },
    ],
    formTransfer: {
      strength: 100,
    },
    formOnchain: {
      pkey: '',
    },
    activeNames: ['1'],
    labelPosition: 'left'
  })
  const imageUrl = ref('../assets/defaultImg.png')
  const { formGeneration, options, formTransfer, formOnchain, activeNames, labelPosition } = toRefs(data)
  function generate() {
      // console.log(store.state.token)
      // console.log(store.state.userid)
      // console.log(data.formGeneration.prompt)
      app.config.globalProperties.$loading.showLoading()
      axios.post(store.state.url+'/model/generate', {
        'userid': store.state.userid,
        'prompt': data.formGeneration.prompt
      }, {
        headers: {
          'Authorization': store.state.token
        }
      })
      .then(res => {
          // console.log(res)
          // console.log(res.data.data.image.data)
          const uint8data = new Uint8Array(res.data.data.image.data)
          const blob = new Blob([uint8data], { type: 'image/jpeg' })
          // console.log(typeof(blob))
          // console.log(blob)
          const url = URL.createObjectURL(blob)
          const img = document.querySelector('#t2i')
          img.src = url
          // console.log(url)
  
          store.state.imgid = res.data.data.imgid
          store.state.imgdata = blob
          store.state.isRateDisabled = false
          store.state.rateValue = null
          Message({
            message: 'Generated success!',
            type: 'success'
          })
          app.config.globalProperties.$loading.hideLoading()
      })
      .catch( error => {
        Message({
            message: 'Generated failure...',
            type: 'warning'
          })
        console.error(error)
        app.config.globalProperties.$loading.hideLoading()
    })
  }
  
  function transfer() {
      app.config.globalProperties.$loading.showLoading()
      axios.post(store.state.url+'/model/mixer', {
        'userid': store.state.userid,
        'imgid': store.state.imgid 
      }, {
    headers: {
      'Authorization': store.state.token
    }
  })
      .then(res => {
          // console.log(res.data)
          const uint8data = new Uint8Array(res.data.data.image.data)
          // console.log(typeof(uint8data))
          // console.log(uint8data)
          
          const blob = new Blob([uint8data], { type: 'image/jpeg' })
          const url = URL.createObjectURL(blob)
          const img = document.querySelector('#t2i')
          // console.log(img)
          img.src = url
          store.state.imgid  = res.data.data.imgid
          store.state.imgdata = blob
          store.state.isRateDisabled = false
          store.state.rateValue = null
          Message({
            message: 'Transferred success!',
            type: 'success'
          })
          app.config.globalProperties.$loading.hideLoading()
      })
      .catch( error => {
        Message({
            message: 'Transferred failure...',
            type: 'warning'
          })
        console.error(error)
        app.config.globalProperties.$loading.hideLoading()
    })
  }
  
  function onchain() {
      // console.log({
      //   'userid': store.state.userid,
      //   'privateKey': data.formOnchain.pkey,
      //   'imgid': store.state.imgid 
      // })
      app.config.globalProperties.$loading.showLoading()
      axios.post(store.state.url+'/bc/mint', {
        'userid': store.state.userid,
        'privateKey': crypto.publicEncrypt(store.state.publicKey, data.formOnchain.pkey),
        'imgid': store.state.imgid
      }, {
    headers: {
      'Authorization': store.state.token
    }
  })
      .then(res => {
          store.state.datahttp = res.data.data.datahttp
          Message({
            message: 'On-chain success!',
            type: 'success'
          })
          // console.log(res)
          app.config.globalProperties.$loading.hideLoading()
      })
      .catch( error => {
        Message({
            message: 'On-chain failure...',
            type: 'warning'
          })
        console.error(error)
        app.config.globalProperties.$loading.hideLoading()
    })
  }
  </script>
  <!-- <script>
  import { reactive, toRefs, ref } from 'vue'
  export default {
      setup() {
      // const labelPosition = ref('left')
      const data = reactive({
          formGeneration: {
          name: '',
          region: '',
          type: '',
          value: ''
          },
          options: [
          {
          value: 'sd1_5',
          label: 'Stable Diffusion v1-5'
          },],
          formTransfer: {
              strength: 100,
          },
          formOnchain: {
              pkey: '',
          },
          activeNames: ['1'],
          labelPosition: 'left'
      })
      return {
      //   labelPosition,
          ...toRefs(data)
      }
      }
  }
  </script> -->
  <style scoped>
  .el-collapse{
      margin: 5%;
      margin-top: 0%;
  }
  .el-form{
      margin: 5%;
  }
  
  .el-button{
      width: 100%;
  }
  </style>
<template>
    <div>
      <el-row :gutter="0">
        <el-col v-for="(image, index) in imageList" :key="index" :span="5">
          <el-card class="image-card">
            <img :src="image.src" class="image" />
            <div class="image-description">{{ image.description }}</div>
            <div class="button-container">
                <el-col :span="12">
                    <el-button 
                    type="primary" 
                    size="mini" 
                    icon="el-icon-connection" @click="onchainBox(image.description)">
                        Mint
                    </el-button>
                    </el-col>
                    <el-col :span="12">
                    <el-button 
                    type="success" 
                    size="mini" 
                    icon="el-icon-copy-document"
                    @click="copyImage(image.src)">
                        Image
                    </el-button>
                </el-col>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted, reactive } from "vue";
  import { useStore } from 'vuex';
import axios from 'axios';
import { Msgbox, Message } from 'element3'
const imageList = ref([

  ])
const store = useStore()
  onMounted(() => {
    axios.post(store.state.url+'/users/unminted', {
      'userid': store.state.userid,
    }, {
  headers: {
    'Authorization': store.state.token
  }
})
    .then(res => {
        var rawList = res.data.data
        // console.log(rawList)
        for (var i=0; i<rawList.length; i++) {
          imageList.value.push({
            src: getUrlFromArray(rawList[i].image.data),
            description: rawList[i].imgid
          })
        }
        // for (var i=0; i<rawList.length; i++) {
        //   console.log(typeof(rawList[i].image.data))
        // }

    })
});
function getUrlFromArray(imageData) {
  const uint8data = new Uint8Array(imageData)
  const blob = new Blob([uint8data], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
  return url
}
function onchainBox (imgid){
  Msgbox
    .prompt('Please input your private key', 'Alert', {
      confirmButtonText: 'onchain',
      cancelButtonText: 'cancel',
      // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      // inputErrorMessage: '邮箱格式不正确'
    })
    .then(({ value }) => {
      onchain(imgid,value)
      Message({
        type: 'success',
        message: 'Onchain successfully '
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Cancel input'
      })
    })
}
function onchain(imgid,pkey) {
    axios.post(store.state.url+'/bc/mint', {
      'userid': store.state.userid,
      'privateKey': pkey,
      'imgid': imgid
    }, {
  headers: {
    'Authorization': store.state.token
  }
})
    .then(res => {
        // console.log('on chain successful')
    })
}
  async function writeToCanvas(src) {
    return new Promise((res) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = src;

        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                res(blob);
            }, 'image.png');
        }
    })
  }

  async function copyImage(src) {
    const blob = await writeToCanvas(src);
    try {
        const imageBlob = await fetch(src).then((res) => res.blob());
        await navigator.clipboard.write(
            [new ClipboardItem({
                [blob.type]: blob,
            })
        ])
        // console.log('success');
    } catch (e) {
        console.log(e);
    }
  }
  </script>
  
  <style scoped>
  .image-card {
    width: 200px;
    height: 260px;
    margin: 10px;
  }
  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .image-description {
    margin-top: 10px;
    text-align: center;
  }
  .button-container {
    display: flex;
    margin-top: 10px;
    text-align: center;
  }
  </style>
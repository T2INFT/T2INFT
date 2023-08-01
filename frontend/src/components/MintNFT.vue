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
                    class="btn"
                    type="primary" 
                    size="mini" 
                    icon="el-icon-copy-document"
                    @click="copyURL(image.dataurl)">
                        URL
                    </el-button>
                    </el-col>
                    <el-col :span="12">
                    <el-button 
                    class="btn"
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
import { Msgbox, Message } from 'element3';
import app from '@/main';
const imageList = ref([

  ])
const store = useStore()
  onMounted(() => {
    app.config.globalProperties.$loading.showLoading()
    axios.post(store.state.url+'/users/transactions', {
      'userid': store.state.userid,
    }, {
  headers: {
    'Authorization': store.state.token
  }
})
    .then(res => {
        var rawList = res.data.data
        // console.log(rawList[0])
        for (var i=0; i<rawList.length; i++) {
          imageList.value.push({
            src: getUrlFromArray(rawList[i].image.data),
            description: rawList[i].imgid,
            txid: rawList[i].txid,
            dataurl: rawList[i].dataurl
          })
        }
        // for (var i=0; i<rawList.length; i++) {
        //   console.log(typeof(rawList[i].image.data))
        // }
        app.config.globalProperties.$loading.hideLoading()

    })
});
function getUrlFromArray(imageData) {
  const uint8data = new Uint8Array(imageData)
  const blob = new Blob([uint8data], { type: 'image/jpeg' })
  const url = URL.createObjectURL(blob)
  return url
}


  const copyURL = (src) => {
    navigator.clipboard.writeText(src).then(() => {
      Message({
          type: 'success',
          message: 'URL Copied!'
        })
    }).catch((e) => {
      Message({
          type: 'warning',
          message: 'Copy Unsuccessful!'
        })
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
        Message({
          type: 'success',
          message: 'Image Copied!'
        })
    } catch (e) {
      Message({
          type: 'warning',
          message: 'Copy Unsuccessful!'
        })
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

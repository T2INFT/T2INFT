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
                    @click="copyURL(image.src)">
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
  import { ref } from 'vue'

  const imageList = ref([
    {
      src: "../src/assets/WechatIMG378.png",
      description: "NFT 1",
    },
    {
      src: "../src/assets/download.jpeg",
      description: "NFT 2",
    },
    {
      src: "../src/assets/download (1).jpeg",
      description: "NFT 3",
    }
  ]);

  const copyURL = (src) => {
    navigator.clipboard.writeText(src).then(() => {
        console.log('success');
    }).catch((e) => {
        console.error(e);
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
        console.log('success');
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

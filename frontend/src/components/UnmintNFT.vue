<template>
    <div>
      <el-row :gutter="0">
        <el-col v-for="(image, index) in imageList" :key="index" :span="8">
          <el-card class="image-card">
            <img :src="image.src" class="image" />
            <div class="image-description">{{ image.description }}</div>
            <div class="button-container">
                <el-col :span="12">
                    <el-button 
                    type="primary" 
                    style="width: 100%;" 
                    size="mini" 
                    icon="el-icon-connection">
                        Mint
                    </el-button>
                    </el-col>
                    <el-col :span="12">
                    <el-button 
                    type="success" 
                    style="width: 100%;" 
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
  const imageList = [
    {
      src: "../src/assets/defaultImg.png",
      description: "Image 1",
    },
    {
      src: "../src/assets/WechatIMG380.png",
      description: "Image 2",
    }
  ];

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
  
  <style>
  .image-card {
    width: 200px;
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
    margin-top: 10px;
    text-align: center;
  }
  </style>
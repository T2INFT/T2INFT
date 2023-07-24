<template>
    <el-dialog :visible="introVisible" :visible.sync="introVisible" @close="$emit('update:introVisible', false)" width="40%">
        <template v-slot:title>Introduction</template>
        <template v-slot:default>
            <p>Welcome to our BS application! Our application consists of three main features: text-to-image generation, image style transfer, and NFT generation.</p>
            <p>Firstly, our text-to-image generation feature allows users to input text and create high-quality images based on the text. Whether you need images for social media posts or marketing materials, our application can help you quickly and easily generate custom images.</p>
            <p>Secondly, our image style transfer feature enables users to transform their images into different styles, such as oil painting or watercolor. With a simple click, you can give your images a unique and artistic touch.</p>
            <p>Lastly, our NFT generation feature allows users to upload their transformed images and generate NFTs on-chain. This feature allows users to easily create and sell their own digital assets, which can be a great way to monetize their creative work.</p>
        </template>
    </el-dialog>
</template>

<script setup>
defineProps(['introVisible'])
defineEmits(['update:introVisible'])
</script>
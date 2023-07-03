<template>
    <h1>aabb{{ props.loginVisible }}</h1>
</template>
<script setup>
const props = defineProps(['loginVisible'])
console.log(props.loginVisible)
</script>
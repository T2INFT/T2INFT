<template>
  <el-form
    :label-position="top"
    :model="formLabelAlign"
  >
    <el-form-item label="Text prompt">
      <el-input v-model="formLabelAlign.prompt" type="textarea" :rows="3" placeholder="Describe what you want the AI draw"></el-input>
    </el-form-item>
    <!-- <el-form-item label="Private key">
      <el-input v-model="formLabelAlign.pkey"></el-input>
    </el-form-item> -->
    <el-form-item label="Model">
      <el-select v-model="formLabelAlign.value" placeholder="Stable Diffusion v1-5" disabled>
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">  
        </el-option></el-select>
    </el-form-item>    
    <el-form-item>
        <el-button type="primary">Generate</el-button>
    </el-form-item>
  </el-form>
  <el-form
    :label-position="top"
    :model="formLabelAlign"
  >
    <el-form-item label="Private key">
      <el-input v-model="formLabelAlign.pkey"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary">Generate</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
export default {
    setup() {
    // const labelPosition = ref('right')
    const data = reactive({
        formLabelAlign: {
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
    ]
    })
    return {
    //   labelPosition,
        ...toRefs(data)
    }
    }
}
</script>
<style>
.el-form{
    margin: 5%;
}

.el-button{
    width: 100%;
}
</style>
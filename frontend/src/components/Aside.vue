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
import { reactive, toRefs } from 'vue'

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
const { formGeneration, options, formTransfer, formOnchain, activeNames, labelPosition } = toRefs(data)
function generate() {

}
function transfer() {

}
function onchain() {
    
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
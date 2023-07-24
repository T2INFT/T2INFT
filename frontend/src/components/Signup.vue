<template>
    <div>
      <!-- <el-button type="primary" @click="dialogVisible = true">注册</el-button> -->
      <el-dialog
        title="注册"
        :visible.sync="props.signupVisible"
        :visible="props.signupVisible"
        :before-close="handleClose"
        width="30%"
      >
        <el-form ref="form" :model="formData" :rules="rules">
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input id="email" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
            ]"
          >
            <el-input id="password" type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirmPassword"
            :rules="[
              { required: true, message: '请确认密码', trigger: 'blur' },
              { validator: validateConfirmPassword, trigger: 'blur' }
            ]"
          >
            <el-input id="confirmPassword" type="password" v-model="formData.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="signupVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">注册</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
<script setup>
  import { defineComponent, ref } from 'vue';

  const props = defineProps(['signupVisible']);
    // {
    //     dialogVisible: {
    //         type: Boolean,
    //         required: true
    //     }
    // },
    console.log(props.signupVisible)
    const formData = ref({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const rules = ref({
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' },
      ],
    });

    function handleClose(done) {
      done();
    }

    function validateConfirmPassword(rule, value, callback) {
      if (value !== formData.value.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }

    function handleSubmit() {
      const valid = ref(false);
      const form = ref(null);

      form.value.validate((valid) => {
        if (valid) {
          // TODO: 提交表单数据到后端进行处理
          console.log(formData.value);
          // dialogVisible.value = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    // return {
    //   // dialogVisible,
    //   formData,
    //   rules,
    //   handleClose,
    //   validateConfirmPassword,
    //   handleSubmit,
    //   consol,
    // };
</script>
  <!-- <script>
  import { defineComponent, ref } from 'vue';
  import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element3';
  
  export default defineComponent({
    components: {
      ElButton,
      ElDialog,
      ElForm,
      ElFormItem,
      ElInput,
    },
    props: ['dialogVisible'],
    // {
    //     dialogVisible: {
    //         type: Boolean,
    //         required: true
    //     }
    // },
    setup(props) {
        consol.log(props.dialogVisible)
    //   const dialogVisible = ref(false);
      const formData = ref({
        email: '',
        password: '',
        confirmPassword: '',
      });
      const rules = ref({
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' },
        ],
      });
  
      function handleClose(done) {
        done();
      }
  
      function validateConfirmPassword(rule, value, callback) {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }
  
      function handleSubmit() {
        const valid = ref(false);
        const form = ref(null);
  
        form.value.validate((valid) => {
          if (valid) {
            // TODO: 提交表单数据到后端进行处理
            console.log(formData.value);
            // dialogVisible.value = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  
      return {
        // dialogVisible,
        formData,
        rules,
        handleClose,
        validateConfirmPassword,
        handleSubmit,
      };
    },
  });
  </script> -->
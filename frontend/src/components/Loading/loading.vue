<template>
  <div id="loading" v-show="visible">
    <div class="circle"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Loading",
  setup() {
    // 控制组件的状态
    let visible = ref(false);

    // 显示组件
    let showLoading = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false;
    };

    return { visible, showLoading, hideLoading };
  },
});
</script>
<style scoped>
#loading {
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(160deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 6px solid #222;
  border-left-color: #ccc;

  animation: loading 1s linear 1s infinite;
}
</style>



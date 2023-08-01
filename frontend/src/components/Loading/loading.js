import { createApp } from "vue"

// 导入写好的Loading.vue文件
import Loading from "./Loading.vue"

export default {
  loading: null,
  // 每当这个插件被添加到应用程序中时，如果它是一个对象，就会调用 install 方法。如果它是一个 function，则函数本身将被调用。在这两种情况下——它都会收到两个参数：由 Vue 的 createApp 生成的 app 对象和用户传入的选项。
  install(app) {
    if (this.loading) {
      // 防止多次载入
      app.config.globalProperties.$loading = this.loading
      return
    }
	// 创建Loading实例，用于挂载
    let instance = createApp(Loading)
    // 创建div元素装载Loading对象
    let div = document.createElement("div")
    let body = document.body
	// 导入body中
    body.appendChild(div)
    this.loading = instance.mount(div)
	// 挂载vue身上
    app.config.globalProperties.$loading = this.loading;
  }
}

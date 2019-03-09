<template>
  <div>
    <img
      :src="imgSrc"
      alt=""
    >
    <p>{{msg}}</p>
    <div
      class="custom"
      @click="addFile"
    >上传[自定义]</div>
    <div
      class="custom"
      @click="deleteFile"
    >取消上传[自定义]</div>
    <p>type="file"的按钮可以隐藏掉</p>
    <input
      type="file"
      ref="file"
      accept="image/png,image/jpeg"
      @change="fileChanged"
    >
    <button @click="confirm">确认上传</button>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'upLoad',
  data() {
    return {
      msg:"",
      maxSize: 2048,
      file: {
        name: '',
        size: 0
      },
      imgSrc: ''
    }
  },
  watch: {

  },
  methods: {
    addFile() {
      this.$refs.file.click();
    },
    deleteFile() {
      this.imgSrc = '';
      this.$refs.file.value = '';
      this.file = {
        name: '',
        size: 0
      };
    },
    fileChanged() {
      const newFile = this.$refs.file.files[0];
      if (
        newFile.type.indexOf('image/png') === -1 &&
        newFile.type.indexOf('image/jpeg') === -1
      ) {
        this.$refs.file.value = '';
        alert("只接受png和jpeg的图片")
        return;
      }
      if (newFile.size > this.maxSize * 1024) {
        alert(`上传图片最大不能超过${this.maxSize}kb`)
        this.$refs.file.value = '';
        return;
      }
      if (this.file.name !== newFile.name || this.file.size !== newFile.size) {
        // 将图片文件转成BASE64格式
        this.html5Reader(newFile);
      }
      this.$refs.file.value = '';
    },
    html5Reader(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result;
        let image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;
          if (width / height >= 1.8 && width / height <= 2.2) {
            this.file = file;
          } else {
            alert(`上传图片的宽/高比要求在1.8-2.2之间`)
            this.imgSrc = '';
            this.$refs.file.value = '';
          }
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    confirm() {
      let laboratory = {};
      laboratory['poster'] = this.imgSrc;
      // 创建from表单
      let formData = new FormData();
      formData.append('uploadFile', this.file);
      formData.append('data', JSON.stringify(laboratory));
      // 定义接口：需要代理
      const url = "/api/upload"
      // 定义header头
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      // 把请求时间加长
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.defaults.timeout = 20000;
      // 请求
      axios.post(url, formData, config).then((res) => {
        this.msg = `http://127.0.0.1:1112${res.data.message}`
      }, (err) => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  font-size: 30px;
}
</style>

<!--
axios上传图片(及vue上传图片到七牛)）
http://www.cnblogs.com/cjh1111/p/7017295.html
-->

<template>
  <div class="headimg-setting">
    <header-section :go-back="true" :head-title="headTitle">
      <section slot="headerBtn" class="header-btn right">
        <el-button type="success" @click="setHeadimg">使用</el-button>
      </section>
    </header-section>
    <main>
      <!--<el-upload
              class="avatar-uploader"
              :action="'/users/' + userinfo.id + '/headimg'"
              :show-file-list="false"
              :on-success="uploadImg"
              :before-upload="beforeImgUpload">
          <img v-if="userinfo.headimg" :src="userinfo.headimg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>-->

      <form :action="'/users/' + userinfo.id + '/headimg'" enctype="multipart/form-data"
            method="post"
      >
        <input class="avatar" type="file" name="imgUploader" multiple @change="uploadImg">
        <!--<input type="submit" name="submit" value="Upload" @click="uploadImg($e)"/>-->
      </form>

      <img v-if="userinfo.headimgurl" :src="userinfo.headimgurl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </main>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
import { uploadAvatar } from '@/api'
import { mapState, mapActions } from 'vuex'
import { localStorage } from '@/utils'

export default {
  name: 'Avatar',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '更改头像',
      file: null
    }
  },
  computed: {
    ...mapState([
      'userinfo'
    ])
  },
  mounted() {
    window.addEventListener('message', (event) => {
      console.log('触发了 message ！')
      const response = event.data
      if (response.result === 'success') {
        this.handleUploadSuccess(response, this.file)
      } else if (response.result === 'failed') {
        this.handleUploadError(response, this.file)
      }
    })
  },
  methods: {
    ...mapActions(['changeLoginInfo']),

    // form.addEventListener('submit', function(ev) {}

    async uploadImg(e) {
      e.preventDefault()

      /* if (res.status == 1) {
         // 修改 localStorage 保存的值！
         //   localStorage('userinfo', JSON.stringify(response.data.data))
         //   this.changeLoginInfo(true)
         } else {
            this.$message.error('上传图片失败！');
         }
         */

      const file = e.target.files[0]
      const param = new FormData() // 创建form对象

      param.append('file', file, file.name)// 通过append向form对象添加数据
      param.append('chunk', '0')// 添加form表单中其他数据

      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      /*
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头

        this.axios.post('http://upload.qiniu.com/', param, config)
            .then(response=>{
                console.log(response.data);
            })
        */

      const response = await uploadAvatar(this.userinfo.id, param)

      console.log(response.data)
    },
    handleUploadSuccess() {

    },
    handleUploadError() {

    },
    handleChange(ev) {
      const file = ev.target.value

      console.log('hahah--', file)

      if (file) {
        this.uploadImg(file)
      }
    },
    beforeImgUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    setHeadimg() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin.scss';

  .headimg-setting {
  @include page();
    z-index: 333;
  }

  .header-btn {
    margin: 1rem 1rem 0 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 1rem;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    text-align: center;
  }

  .avatar {
    width: 12rem;
    height: 12rem;
    display: block;
  }
</style>
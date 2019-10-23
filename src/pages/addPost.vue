<template>
  <div class="addPost">
    <!-- 面包屑 -- 路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin:26px 10px">
      <!-- 发布 -->
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="标题：">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容：" v-if="addForm.type === 1">
          <!-- 富文本 -->
          <VueEditor :config="config" ref="supertext"></VueEditor>
        </el-form-item>
        <el-form-item label="内容：" v-if="addForm.type === 2">
          <!-- 上传视频文件 -->
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :headers="getToken()"
            :on-success="videoSuccess"
          >
            <el-button size="small" type="primary">视频上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目：">
          <div style="border:1px solid #eee;padding-left:24px">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCate">
              <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="封面：">
          <el-upload action="http://127.0.0.1:3000/upload" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { getCateList } from '@/api/post.js'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      addForm: {
        title: '', // 当前文章的标题
        content: '', // 如果是文章，这个属性存储文章的内容，如果是视频，这个属性存储视频上传好的服务器端路径
        categories: [], // 存储当前用户所选择的栏目id
        cover: [], // 存储当前用户所上传成功的封面图片的id
        type: 1 // 当前文章的类型
      },
      cateList: [],
      checkedCate: [], // 将来被用户选择的复选框的value数组
      isIndeterminate: true, // isIndeterminate --- 不确定的
      checkAll: false,
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  mounted () {
    getCateList().then(res => {
      console.log(res)
      if (res.status === 200) {
        // 由于后台原因，需要将前面两个值（关注、头条）移除
        this.cateList = res.data.data.splice(2)
      }
    })
  },
  methods: {
    // 获取 token
    getToken () {
      return {
        Authorization: localStorage.getItem('heima_backstage_37_token')
      }
    },
    // :on-success="函数"   当视频上传成功之后触发的钩子函数
    videoSuccess (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      // 再次判断
      if (this.addForm.type === 2) {
        this.addForm.content = response.data.url
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>

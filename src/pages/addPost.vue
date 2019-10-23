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
        <el-form-item label="内容：">
          <VueEditor :config="config"></VueEditor>
        </el-form-item>
        <el-form-item label="栏目：">
          <div style="border:1px solid #eee">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCate" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="封面：">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
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
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        }
      }
    }
  },
  methods: {
    onSubmit () {

    }
  }
}
</script>
<style lang="less" scoped>
</style>

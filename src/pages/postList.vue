<template>
  <div class="postList">
    <!-- 面包屑 -- 路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格展示 -->
    <el-table :data="postList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="380"></el-table-column>
      <el-table-column prop="create_date" label="创建日期" width="180">
        <template slot-scope="scope">{{scope.row.create_date | timeFormat}}</template>
      </el-table-column>
      <el-table-column label="类型" width="80">
        <template slot-scope="scope">{{scope.row.type | typeTransfer}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="sizes"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getPostList } from '@/api/post.js'
export default {
  data () {
    return {
      postList: [],
      total: 0,
      sizes: [2, 4, 6, 8],
      //  页码
      pageIndex: 1,
      //  每页记录数
      pageSize: 2
    }
  },
  methods: {
    handleEdit (row) {
      console.log(row)
    },
    // 切换size下拉列表选项时触发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      //   val就是当前需要展示的数量
      //   修改全局数据
      this.pageSize = val
      //   再次发起数据请求
      this.init()
    },
    // 单击页码时触发
    handleCurrentChange (val) {
      // val就是当前用户所单击的页码
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    },
    init () {
      getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.postList = res.data.data
            // 获取总记录数
            this.total = res.data.total
          }
        })
    }
  },
  filters: {
    typeTransfer (type) {
      if (type === 1) {
        return '文章'
      } else {
        return '视频'
      }
    },
    timeFormat: (time, spe) => {
      spe = spe || '-'
      time = new Date(time)
      // 实现时间格式化
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let day = time.getDate()
      // 返回格式化的结果
      return year + spe + month + spe + day
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>

import axios from '@/utils/myaxios.js'

// 获取所有文章数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

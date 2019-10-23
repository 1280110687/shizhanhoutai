import axios from '@/utils/myaxios.js'

// 获取所有文章数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 获取所有栏目数据
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}

import request from '@/api';

export const getShopList = (params) => {
  return request({
    url: '/shop/list',
    method: 'get',
    params,
  })
}

export const getShopItem = (params) => {
  return request({
    url: '/shop/item',
    method: 'get',
    params
  })
}

// 获取留言列表
export const getShopMesgList = (params) => {
  return request({
    url: '/shop/get/message',
    method: 'get',
    params
  })
}

// 添加留言
export const addShopMesg = (data) => {
  return request({
    url: '/shop/add/message',
    method: 'post',
    data
  })
}

// 删除留言
export const deleteShopMesg = (data) => {
  return request({
    url: '/shop/delete/message',
    method: 'post',
    data
  })
}
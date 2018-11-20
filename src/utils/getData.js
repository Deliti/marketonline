import fetch from './fetch'

// user
export const login = params => fetch('post', '/merchant/app/user/login', params)
export const register = params => fetch('post', '/merchant/app/user/register', params)
export const resetPwd = params => fetch('post', '/merchant/app/user/resetPwd', params)
export const getUserInfo = params => fetch('post', '/merchant/app/user/info', params)
export const getLeaderList = params => fetch('post', '/merchant/app/agent/select', params)
export const getMyLeader = params => fetch('post', '/merchant/app/precedence/list', params)
export const getMyAddr = params => fetch('post', '/merchant/app/address/list', params)
export const addLeader = params => fetch('post', '/merchant/app/precedence/save', params)
export const deleteLeader = params => fetch('post', '/merchant/app/precedence/delete', params)
export const addAddr = params => fetch('post', '/merchant/app/address/save', params)
export const deleteAddr = params => fetch('post', '/merchant/app/address/delete', params)

// 商品详情
export const getBanner = params => fetch('post', '/merchant/app/user/banner', params)
export const prodType = params => fetch('post', '/merchant/app/product/category', params)
export const productList = params => fetch('post', '/merchant/app/product/list', params)
export const productInfo = params => fetch('post', '/merchant/app/product/info', params)

// 購物車
// 分页的
export const getCartList = params => fetch('post', '/merchant/app/cart/list', params)
// 全部的
export const getAllCartList = params => fetch('post', '/merchant/app/cart/myCart', params)

export const addCart = params => fetch('post', '/merchant/app/cart/addCart', params)
export const updateCart = params => fetch('post', '/merchant/app/cart/update', params)
export const playOrder = params => fetch('post', '/merchant/app/order/playOrder', params)

// 訂單
export const agentOrders = params => fetch('post', '/merchant/app/order/agentOrders', params)
export const getMyOrders = params => fetch('post', '/merchant/app/order/myOrders', params)
export const getOrderDetail = params => fetch('post', '/merchant/app/order/detail', params)

export const checkPickCode = params => fetch('post', '/merchant/app/order/checkPickCode', params)
export const agentComfirm = params => fetch('post', '/merchant/app/order/pickUp', params)

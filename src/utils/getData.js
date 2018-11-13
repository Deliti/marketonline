import fetch from './fetch'

export const login = params => fetch('post', '/merchant/app/user/login', params)
export const register = params => fetch('post', '/merchant/app/user/register', params)
export const resetPwd = params => fetch('post', '/merchant/app/user/resetPwd', params)
export const getLeaderList = params => fetch('post', '/merchant/app/agent/select', params)
export const getMyLeader = params => fetch('post', '/merchant/app/precedence/list', params)

import {request} from './request.js'

export function login(phone, password) {
  // console.log(params);
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password,
      // md5_password
    }
  })
}

// 获取用户歌单
export function userPlayList(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
}

// export function subcount() {
//   return request({
//     url: '/user/subcount'
//   })
// }

// 退出登录
export function logout() {
  return request({
    url: '/logout'
  })
}

// export function status() {
//   return request({
//     url: '/login/status'
//   })
// }


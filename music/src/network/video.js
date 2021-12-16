import { request } from './request.js'

export function videoGroupList() {
  return request({
    url: '/video/group/list'
  })
}
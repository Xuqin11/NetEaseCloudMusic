import {request} from './request.js'

// 轮播图
export function banner() {
  return request({
    url: '/banner?type=1'
  })
}

// 推荐歌单
export function personalized() {
  return request({
    url: '/personalized'
  })
}

// 独家放送
export function privatecontent() {
  return request({
    url: '/personalized/privatecontent'
  })
}

// 最新音乐
export function NewSong() {
  return request({
    url: '/personalized/newsong'
  })
}

// 推荐MV
export function PersonalizedMv() {
  return request({
    url: '/personalized/mv'
  })
}


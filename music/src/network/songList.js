import {request} from './request'

// 歌单详情
export function playListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 歌单评论
export function playListComment(id, limit, offset) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset
    }
  })
}

// 歌曲详情
export function songDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 歌单收藏者
export function playlistSubscribers(id, limit, offset) {
  return request({
    url: "playlist/subscribers",
    params: {
      id,
      limit,
      offset
    }
  })
}

// 获取歌曲Url
export function songUrl(id) {
  return request({
    url: "song/url",
    params: {
      id
    }
  })
} 
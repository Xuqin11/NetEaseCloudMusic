import { request } from "./request.js";

export function lyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}

export function simiSong(id) {
  return request({
    url: "/simi/song",
    params: {
      id,
    },
  });
}

// 热门评论
export function hotCommentsReq(id, type) {
  return request({
    url: "/comment/hot",
    params: {
      id,
      type
    }
  })
}

export function commentsMusic(id, limit, offset) {
  return request({
    url: "/comment/music",
    params: {
      id,
      limit,
      offset
    }
  })
}

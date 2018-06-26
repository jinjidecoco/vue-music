import axios from 'axios'
const urlPrefix = 'http://localhost:3000'

export function getSongMenu () {
  const url = urlPrefix + '/personalized'
  return url
}
// 获取最新音乐
export function getNewMusic () {
  const url = urlPrefix + '/personalized/newsong'
  return url
}
// 获取歌单详情
export function getMenuDetail (id) {
  const url = urlPrefix + `/playlist/detail?id=${id}`
  return axios.get(url)
}

// 获取歌曲链接
export function getSongLink (id) {
  const url = urlPrefix + `/music/url?id=${id}`
  return axios.get(url)
}

// 获取歌词
export function getSongLyric (id) {
  const url = urlPrefix + `/lyric?id=${id}`
  return axios.get(url)
}
// 获取排行榜
export function getRank (idx) {
  const url = urlPrefix + `/top/list?idx=${idx}`
  return axios.get(url)
}

// 获取歌手信息
export function getSinger () {
  const url = urlPrefix + '/toplist/artist'
  return axios.get(url)
}

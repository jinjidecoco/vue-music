export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, alia}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.alia = alia
  }
}
function singName (data) {
  let singer = []
  singer = data.map((item) => {
    return item.name
  })
  return singer.join('/') // 数组转为字符串
}
export function creatSongList (data) {
  return new Song({
    id: data.id,
    mid: data.mid,
    singer: singName(data.artists),
    name: data.name,
    album: data.album.name,
    duration: data.duration,
    image: data.album.picUrl
  })
}

export function creatSong (data) {
  return new Song({
    id: data.id,
    name: data.name,
    singer: singName(data.ar),
    album: data.al.name,
    image: data.al.picUrl,
    alia: data.alia[0]
  })
}

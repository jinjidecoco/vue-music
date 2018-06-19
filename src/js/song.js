export default class Song {
  constructor ({id, mid, singer, name, album, duration, image}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }
}
function singName (data) {
  let singer = []
  singer = data.map((item) => {
    return item.name
  })
  return singer.join('/')
}
export function creatSongList (data) {
  return new Song({
    id: data.id,
    mid: data.mid,
    singer: singName(data.artists),
    name: data.name,
    album: data.album,
    duration: data.duration,
    image: data.album.picUrl
  })
}

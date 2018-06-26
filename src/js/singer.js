import pinyin from 'pinyin'
export default class Singer {
  constructor ({id, name, avatar, aliaName, initial}) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.aliaName = aliaName
    this.initial = initial
  }
}
function sortInitial (data) {
  let toPingYin = pinyin(data.name[0], {
    style: pinyin.STYLE_FIRST_LETTER // 返回拼音的首字母部分
  })
  return toPingYin[0][0].toUpperCase()
}

// 头像（avatar） 和别名 (aliaName)
export function creatSinger (data) {
//   console.log(data)
  return new Singer({
    id: data.id,
    name: data.name,
    avatar: data.picUrl,
    aliaName: data.alias.join('/'),
    initial: sortInitial(data)
  })
}

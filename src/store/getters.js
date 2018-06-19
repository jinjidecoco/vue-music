
export const singMenu = state => state.singMenu // singMenu为首页推荐歌单数据
export const isNormal = state => state.isNormal // 是否是正常状态的播放器
export const playerShow = state => state.playerShow // 是否正在播放
export const playing = state => state.playing // 是否正在播放
export const playList = state => state.playList // 播放列表
export const squenceList = state => state.squenceList // 顺序列表
export const mode = state => state.mode // 播放模式
export const curIndex = state => state.curIndex // 播放的索引
export const curSong = (state) => {
  return state.playList[state.curIndex] || {}
}

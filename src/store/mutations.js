import * as types from './mutation-type'
const mutations = {
  [types.SET_SING_MENU] (state, singMenu) {
    state.singMenu = singMenu
  },
  [types.SET_IS_NORMAL] (state, flag) {
    state.isNormal = flag
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_SQUENCE_LIST] (state, squenceList) {
    state.squenceList = squenceList
  },
  [types.SET_CUR_INDEX] (state, curIndex) {
    state.curIndex = curIndex
  },
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}
export default mutations

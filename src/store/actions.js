// 如果多个函数对 state 做了同样的操作，应该把这些操作提取出来，放到 mutation 中，这些函数定义成 action.
// 我们如果在一个动作中多次去改变 mutation 那么往往会封装一个 action
import * as types from './mutation-type'
import { playMode } from '../js/config.js'
import { shuffle } from '../js/util.js'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectedPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_IS_NORMAL, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_CUR_INDEX, index)
}


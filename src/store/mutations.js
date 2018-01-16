const mutations = {
  changeCurChid (state, chid) {
    state.curChid = chid
  },
  changeChannelList (state, channelList) {
    state.channelList = [...state.channelList, ...channelList]
  },
  changevChannelList (state, vChannelList) {
    state.vChannelList = [...state.vChannelList, ...vChannelList]
  }
}
export default mutations

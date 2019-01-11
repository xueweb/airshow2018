import * as types from "./mutation-types"

const mutations = {
  [types.SET_USER](state, setuser) {
    state.setuser = setuser
  },
  [types.SET_STATE](state, setstate) {
    state.setstate = setstate
  },
  [types.SET_FLAG](state, setflag) {
    state.setflag = setflag
  },
  [types.GET_TICKET](state, getticket) {
    state.getticket = getticket
  },
  [types.GET_GITID](state, getid) {
    state.getid = getid
  },
  [types.FLAG](state, flag) {
    state.flag = flag
  },
  [types.set](state, set) {
    state.set = set
  },
  [types.SET_QUERY](state, setquery) {
    state.setquery = setquery
  },
  [types.searchflag](state, searchflag) {
    state.searchflag = searchflag
  },
  [types.SET_CURRENT_INDEX](state, currentindex) {
    state.currentindex = currentindex
  },
  [types.SET_BACK_INDEX](state, setbackindex) {
    state.setbackindex = setbackindex
  },
  [types.SET_ADDRESS](state, setaddress) {
    state.setaddress = setaddress
  },
  [types.SET_MAPADDRESS](state, setmapaddress) {
    state.setmapaddress = setmapaddress
  },
  [types.SETPOSITION](state, setposition) {
    state.setposition = setposition
  },
  [types.ENGFLAG](state, engflag) {
    state.engflag = engflag
  }


}

export default mutations

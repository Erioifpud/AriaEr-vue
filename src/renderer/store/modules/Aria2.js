const state = {
  addr: '127.0.0.1',
  port: 6800,
  secure: false,
  token: '',
  path: '/jsonrpc'
}

const mutations = {
  SET_ADDR (state, addr) {
    state.addr = addr
  },
  SET_PORT (state, port) {
    state.port = port
  },
  SET_SECURE (state, secure) {
    state.secure = secure
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_PATH (state, path) {
    state.path = path
  },
  SAVE_CONN (state) {
    window.storage.set({
      addr: state.addr,
      port: state.port,
      secure: state.secure,
      token: state.token,
      path: state.path
    })
  },
  INIT_CONN (state) {
    state.addr = window.storage.get('addr')
    state.port = window.storage.get('port')
    state.secure = window.storage.get('secure')
    state.token = window.storage.get('token')
    state.path = window.storage.get('path')
  }
}

const getters = {
  connObject: ({ addr, port, secure, token, path }) => {
    return {
      addr,
      port,
      secure,
      token,
      path
    }
  }
}

export default {
  state,
  mutations,
  getters,
  namespaced: true
}

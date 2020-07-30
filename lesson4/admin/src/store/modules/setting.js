export default {
  namespaced: true,
  state: {
    sidebarCollapse: false,
  },
  mutations: {
    toggleSidebarCollapse(state) {
      state.sidebarCollapse = !state.sidebarCollapse
    }
  },
  actions: {
  },
  getters: {
    sidebarCollapse: (state) => {
      return state.sidebarCollapse
    }
  }
}

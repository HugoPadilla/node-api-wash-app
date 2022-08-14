import {createStore} from "vuex";

const store = createStore({
  state() {
    return {
      currentUser: {
        id: -1,
        nombre: "",
        apellidos: "",
        email: "",
        roll: "",
        status: ""
      }
    }
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload.currentUser
    },
    updateRollOfUser(state, payload) {
      state.currentUser.status = payload.status
    },
    removeCurrentUser(state) {
      state.currentUser = {
        id: -1,
        nombre: "",
        apellidos: "",
        email: "",
        roll: "",
        status: ""
      }
    }
  },
  getters: {}
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store;
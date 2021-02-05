const Interface = {
  state: {
    Modal: {
      isActive: false
    },
    ModalSize: null,
    Basket: {
      isActive: false
    },
    ModalAdded : {
      isActive: false
    },
    ModalMobile : {
      isActive: false
    },
    ModalMobileAdded : {
      isActive : false
    },
    LabelActive: false,
  },
  mutations: {
    MODAL_DEACTIVATE(state){
      state.Modal.isActive = false
    },

    MODAL_ACTIVATE(state){
      state.Modal.isActive = true
    },

    SET_SIZE(state, size){
      state.ModalSize = size
    },

    OPEN_BASKET(state){
      state.Basket.isActive = true
    },

    CLOSE_BASKET(state){
      state.Basket.isActive = false
    },

    OPEN_MODAL_ADDED(state){
      state.ModalAdded.isActive = true
    },

    CLOSE_MODAL_ADDED(state){
      state.ModalAdded.isActive = false
    },

    OPEN_MODAL_MOBILE(state){
      state.ModalMobile.isActive = true
    },

    CLOSE_MODAL_MOBILE(state){
      state.ModalMobile.isActive = false
    },
    OPEN_ADDED_MODAL_MOBILE(state){
      state.ModalMobileAdded.isActive = true
    },

    CLOSE_ADDED_MODAL_MOBILE(state){
      state.ModalMobileAdded.isActive = false
    },

    // LABEL_ACTIVE(state){
    //   state.LabelActive = true
    // },

    // LABEL_PASSIVE(state){
    //   state.LabelActive = false
    // }

  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
}

export default Interface;
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

    AllCats: true,

    Category: [

    ],
    CategoryName : null
  },
  mutations: {

    SELECT_CATEGORY(state, category){
      state.Category = []
      state.Category.push(category)
      state.CategoryName = category[1]
    },

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

    ACTIVATE_ALL_CATS(state){
      state.AllCats = true
    },

    DEACTIVATE_ALL_CATS(state){
      state.AllCats = false
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
}

export default Interface;
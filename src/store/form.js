const Form = {
  state: {
    carrier: true,
    present: false,
    OrdererName: '',
    ReceiverName: '',
    OrdererPhone: '',
    ReceiverPhone: '',
    date: '',
    time: '',
    address: '',
    comment: ' ',
    addressOfPickUp: [
      'Рижская площадь, 9, стр. 1, 129272', 
    ],
    PickUpAdress : ''
    // validName: false,
    // // validReceiverName: true,
    // validPhone: false,
    // totalValidation: false
  },
  mutations: {
    CHOSE_CARRIER(state){
      state.carrier = true
    },
    CHOSE_PICKUP(state){
      state.carrier = false
    },
    ORDER_FOR_ME(state){
      state.present = false
    },
    ORDER_FOR_SOMEONE(state){
      state.present = true
    },

    ORDERER_NAME(state, name){
      state.OrdererName = name
    },

    RECEIVER_NAME(state, name){
      state.ReceiverName = name
    },

    ORDERER_PHONE(state, phone){
      state.OrdererPhone = phone
    },

    RECEIVER_PHONE(state, phone){
      state.ReceiverPhone = phone
    },

    SET_DATE(state, date){
      state.date = date
    },

    SET_TIME(state, time){
      state.time = time
    },

    GET_ADDRESS(state, address){
      state.address = address
    },

    GET_COMMENT(state, comment){
      state.comment = comment
    },

    SET_ADDRESS_OF_PICK_UP(state){
      state.PickUpAdress = state.addressOfPickUp[0]
    }

  },
  actions: {

  },
  getters: {
  },
  modules: {
  }
}

export default Form;
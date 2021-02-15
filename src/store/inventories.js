const Inventories = {
  state: {
    load: true,
    finalPrice: 0, 
    modalPrice: 0,
    basket: [],
    modal:{
      title: '',
      description: '',
      price: [],
      size: [],
      price_size:[],
      image: '#'
    },
    modalAdded: {
      title: '',
      img: '',
      price: ''
    },
    Ngoods: null
      ,
    goods: {
      'Категория':{
        'goods': [

        ]
      }
    },

    addedGoods: [  ]
  },
  mutations: {

    ACTIVATE_CAT(state, cat){
      for (let i in state.goods){
        state.goods[i].isActive=false
      }
      state.goods[cat].isActive = true
    },

    ACTIVATE_ALL(state){
      for (let i in state.goods){
        state.goods[i].isActive=true
      }
    },

    ADD_TO_MODAL(state, info){
      state.modal.price_size = []
      state.modal.title = info.title;
      state.modal.description = info.description;
      state.modal.image = info.image
      state.modalPrice = info.price[0];
      for (let i = 0; i < info.size.length; i++ ){
        let price_size = [];
        price_size.unshift(info.size[i])
        price_size.unshift(info.price[i])
        state.modal.price_size.unshift(price_size)
      }
    },

    SELECT_PRICE(state, price){
      state.modalPrice = price
    },

    ADD_TO_MODAL_ADDED(state, added){
      state.modalAdded.title = added.title,
      state.modalAdded.price = added.price,
      state.modalAdded.image = added.image
    },

    ADD_TO_BASKET(state, goods){
      state.basket.push(goods)
      state.finalPrice += goods[1]*goods[3]
    },

    ADD_TO_BASKET_ADDED(state, added){
      state.basket.push(added)
      state.finalPrice += added[1]*added[3]
    },

    REMOVE_FROM_BASKET(state,index){
      state.basket.splice(index,1)
    },

    REMOVE_PRICE(state, price){
      state.finalPrice -= price
    },

    // IN MODAL
    // ADD_ONE(state){

    // },
    // IN MODAL


    // IN BASKET
    PLUS_ONE(state, index){
      state.basket[index][3] += 1
      
    },

    MINUS_ONE(state, index){
      if (state.basket[index][3]>1){
        state.basket[index][3] -=1    
      }
    },
    // IN BASKET

    REMOVE_OLD_PRICE(state, oldPrice){
      state.finalPrice -= oldPrice
    },

    ADD_NEW_PRICE(state, newPrice){
      state.finalPrice += newPrice
    },
    
    UPDATE_ADDED_GOODS(state, goods) {
      state.addedGoods = goods
    },

    UPDATE_ALL_GOODS(state, goods){
      // let loader = function(){
      //   state.load = false 
      // }
      // state.goods = await goods
      async function fn(){
        state.goods = goods
      }
      // function img(){
      //   state.load = false
      // }
      // fn()
      

      fn().then(setTimeout( () => state.load = false , 1500))

      // await new Promise((resolve, reject) => setTimeout(loader(), 4500))
    },

    LOADER_OFF(state){
      state.load = false
    }




  },
  actions: {
    async fetchAddedGoods(ctx){
      const res = await fetch(
        'https://ulanbek.pythonanywhere.com/api/items/extra-goods/'
      )
      const addedGoods = await res.json();
      ctx.commit('UPDATE_ADDED_GOODS', addedGoods)
    },
    async fetchGoods(ctx){
      const res = await fetch(
        'https://ulanbek.pythonanywhere.com/api/items/flowers/?format=json'
      )
      const goods = await res.json()
      ctx.commit('UPDATE_ALL_GOODS', goods)
    },

  },
  getters: {
    allGoods(state){
      return state.goods
    },
    allAddedGoods(state){
      return state.addedGoods
    }
  },
  modules: {
  }
}

export default Inventories;
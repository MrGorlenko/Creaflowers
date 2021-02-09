const Inventories = {
  state: {
    finalPrice: 0, 
    modalPrice: 0,
    basket: [],
    modal:{
      title: '',
      description: '',
      price: [],
      size: [],
      price_size:[],
      img: '#'
    },
    modalAdded: {
      title: '',
      img: '',
      price: ''
    },
    Ngoods: null
      ,
    goods: {

      'category1' : {
        isActive: true,
        goods: [
          {
            id:1,
            title: "flowers1",
            description:"description1 description1 description1 description1",
            img: "#",
            size: [],
            price: [1000],
            oldPrice: 1200
          },
          {
            id:2,
            title: "flowers2",
            description:"description2 description2 description2 description2",
            img: "#",
            size: ["small",  "medium", "large" ],
            price: [1000, 1500, 2000],
            oldPrice: 1200
          },
          {
            id:3,
            title: "flowers3",
            description:"description3 description3 description3 description3",
            img: "#",
            size: [ 'small', "large"],
            price: [800, 1500],
          },
          {
            id:3,
            title: "flowers32",
            description:"description3 description3 description3 description3",
            img: "#",
            size: [],
            price: [800],
            oldPrice: 1200
          },
          {
            id:3,
            title: "flowers31",
            description:"description3 description3 description3 description3",
            img: "#",
            size: ["large"],
            price: [800, 1500],
            oldPrice: 1200
          },
        ]
    },
      'category2': {
        isActive: true, 
        goods: [
          {
            id:4,
            title: "flowers4",
            description:"description4 description4 description4 description4",
            img: "#",
            size: ["small","large"],
            price: [780, 1080],
          },
          {
            id:5,
            title: "flowers5",
            description:"description5 description5 description5 description5",
            img: "#",
            size: ["small", "medium", "large"],
            price: [500, 800, 1000],
            oldPrice: 700
          },
          {
            id:6,
            title: "flowers6",
            description:"description6 description6 description6 description6",
            img: "#",
            size: ['small', "large"],
            price: [45000, 67000],
            oldPrice: 80000
          }, 
          {
            id:4,
            title: "flowers4",
            description:"description4 description4 description4 description4",
            img: "#",
            size: ["small","large"],
            price: [780, 1080],
            oldPrice: 1000
          },
          {
            id:5,
            title: "flowers5",
            description:"description5 description5 description5 description5",
            img: "#",
            size: ["small", "medium", "large"],
            price: [500, 800, 1000],
            oldPrice: 700
          },
          {
            id:6,
            title: "flowers6",
            description:"description6 description6 description6 description6",
            img: "#",
            size: ['small', "large"],
            price: [45000, 67000],
            oldPrice: 80000
          },  
        ]
          
      },
      'category3': {
        isActive: true, 
        goods: [
          {
            id:7,
            title: "flowers7",
            description:"description7 description7 description7 description7",
            img: "#",
            size: ["small", "large"],
            price: [740, 1400],
            oldPrice: 1200
          },
          {
            id:8,
            title: "flowers8",
            description:"description8 description8 description8 description8",
            img: "#",
            size: ["small", "medium" ,"large"],
            price: [2500, 3000, 3500],
            oldPrice: 5000
          },
          {
            id:9,
            title: "flowers9",
            description:"description9 description9 description9 description9",
            img: "#",
            size: ['small', "large"],
            price: [7000, 9000],
            oldPrice: 10000
          },    
          {
            id:8,
            title: "flowers8",
            description:"description8 description8 description8 description8",
            img: "#",
            size: ["small", "medium" ,"large"],
            price: [2500, 3000, 3500],
            oldPrice: 5000
          },
          {
            id:8,
            title: "flowers8",
            description:"description8 description8 description8 description8",
            img: "#",
            size: ["small", "medium" ,"large"],
            price: [2500, 3000, 3500],
            oldPrice: 5000
          },
        ]
      },
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
      state.modal.img = info.img
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
      state.modalAdded.img = added.img
    },

    ADD_TO_BASKET(state, goods){
      state.basket.push(goods)
      state.finalPrice += goods[1]*goods[3]
    },

    ADD_TO_BASKET_ADDED(state, added){
      state.basket.push(added)
      state.finalPrice += added[1]
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
      state.goods = goods
    },

    PARCING(state){
      state.Ngoods = {}
      let put = function(key, value) {
        this.container[key] = value;
     }
      // for (i of state.goods){
      //   state.Ngoods.put(i)
      // }
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
      // ctx.commit('UPDATE_ALL_GOODS', goods)
      // ctx.commit('PARCING', goods)
    }
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
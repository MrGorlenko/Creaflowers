import { createStore } from 'vuex'
import Inventories from '@/store/inventories.js'
import Form from '@/store/form.js';
import Interface from '@/store/interface.js'
import Contacts from '@/store/contacts.js'

export default createStore({
  state: {
    goods: [],
    categories: [],
    modal: {
      title : '123'
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    Inventories,
    Form,
    Interface,
    Contacts
  }
})

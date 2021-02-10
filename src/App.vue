<template>
  <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  <!-- </div> -->
    <div class="home">
    <Navigation/>
    <Modal/>
    <BasketButton/>
    <Basket/>
    <ModalAdded/>
    <ModileMobileDark/>
    <ModalAddedMobile/>
    <ModalMobile/>
    <div v-if='BasketActive==false'  class="base">
      <router-view/>
      <Footer/>
    </div>
    
  </div>
  
  <!-- <router-view/> -->
</template>


<script>
import Navigation from '@/components/Navigation.vue'
import Goods from '@/components/Goods.vue'
import Modal from '@/components/Modal.vue'
import ModalAdded from '@/components/ModalAdded.vue'
import Basket from '@/components/Basket.vue'
import Footer from '@/components/Footer.vue'

import ModalMobile from '@/components/ModalMobile.vue'
import ModileMobileDark from '@/components/subcomponents/ModalMobileDark.vue'
import ModalAddedMobile from '@/components/ModalAddedMobile.vue'

import BasketButton from '@/components/subcomponents/BasketButton.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
    Navigation,
    Goods,
    Modal,
    Basket,
    ModalAdded,
    Footer,

    ModalMobile,
    ModileMobileDark,
    ModalAddedMobile,

    BasketButton
  },
    computed: {
    ...mapState({
      BasketActive: state => state.Interface.Basket.isActive
    }),
    ...mapGetters(['allGoods'])
  },
  async mounted(){
    this.fetchGoods();
  }, 
  methods: {
    ...mapActions(['fetchGoods']),
  }
  
}
</script>


<style lang="scss">
  @import '@/vendor/interface.scss';
  .base{
    padding-left: $sideBarWidth;
    min-height: 100vh;
  }

  @media (max-width: 992px){
    .base{
      padding-left: $sideBarWidthMobile;
    }
  }
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: Inter;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

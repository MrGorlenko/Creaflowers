<template>
  <div class="home">
    <Navigation/>
    <Modal/>
    <BasketButton/>
    <Basket/>
    <ModalAdded/>
    <div v-if='BasketActive==false'  class="base">
      <Goods/>
      <Footer/>
      <ModalMobile/>
      <ModileMobileDark/>
    </div>
  </div>
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

import BasketButton from '@/components/subcomponents/BasketButton.vue'
import {mapState} from 'vuex'
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

    BasketButton
  },
    computed: {
    ...mapState({
      BasketActive: state => state.Interface.Basket.isActive
    })
  }
}
</script>

<style lang="scss" scoped>
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
</style>

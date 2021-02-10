<template>
  <div class="home">
    <Goods/>
    <Footer/>
    <ModalMobile/>
  </div>
</template>

<script>
import Goods from '@/components/Goods.vue'
import Footer from '@/components/Footer.vue'

import ModalMobile from '@/components/ModalMobile.vue'
import ModileMobileDark from '@/components/subcomponents/ModalMobileDark.vue'
import ModalAddedMobile from '@/components/ModalAddedMobile.vue'

import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    Goods,
    Footer,

    ModalMobile,
    ModileMobileDark,
    ModalAddedMobile,

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

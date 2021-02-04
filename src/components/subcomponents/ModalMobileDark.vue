<template>
  <div @click='closeModalMobile()'
  :class="{'ModalMobileDark_active': MobileModalActive == true,
    'ModalMobileDark_passive': MobileModalActive == false &&  ModalAddedActive==false,
    'ModalMobileDark_activeBasket': ModalAddedActive==true}"
  class="ModalMobileDark">
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ModalMobileDark',
   computed: {
    ...mapState({
      MobileModalActive: state => state.Interface.ModalMobile.isActive,
      ModalAddedActive: state => state.Interface.ModalMobileAdded.isActive
    })
  },
  methods:{
    ...mapMutations(['CLOSE_MODAL_MOBILE', 'CLOSE_ADDED_MODAL_MOBILE']),
      closeModalMobile(){
        this.CLOSE_MODAL_MOBILE()
        this.CLOSE_ADDED_MODAL_MOBILE()
    }
  }
}
</script>

<style lang='scss'>
  .ModalMobileDark{
    position: fixed;
    top: 0;
    left:0;
    height: 100vh;
    width:100%;
    transition: background-color 1s ease;
    &_active{
      background-color: rgba(0,0,0,.5);
      z-index: 100;
    }
    &_activeBasket{
      background-color: rgba(0,0,0,.5);
      z-index: 150;
    }
    &_passive{
      background-color: rgba(0,0,0,.0);
      z-index: -1000;
    }
  }
</style>
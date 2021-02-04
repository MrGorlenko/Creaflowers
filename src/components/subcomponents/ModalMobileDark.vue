<template>
  <div @click='closeModalMobile()'
  :class="{'ModalMobileDark_active': MobileModalActive == true,
    'ModalMobileDark_passive': MobileModalActive == false}"
  class="ModalMobileDark">
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ModalMobileDark',
   computed: {
    ...mapState({
      MobileModalActive: state => state.Interface.ModalMobile.isActive
    })
  },
  methods:{
    ...mapMutations(['CLOSE_MODAL_MOBILE']),
      closeModalMobile(){
        this.CLOSE_MODAL_MOBILE()
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
      z-index: 97;
    }
    &_passive{
      background-color: rgba(0,0,0,.0);
      z-index: -1000;
    }
  }
</style>
<template>
  <div 
  :class="{'ModalAddedMobile_active': ModalAddedActive == true,
  'ModalAddedMobile_passive' : ModalAddedActive == false}"
  class="ModalAddedMobile">
    <!-- <div class="d-flex justify-content-center align-items-center
     ModalAddedMobile__close"
     @click='closeModalMobile()'>
      <div></div>
    </div> -->
    <div class="d-flex justify-content-start align-items-center
     ModalMobile__close"
     >
      <img @click='closeModalMobile()' src="@/assets/CloseBasket.svg" alt="">
    </div>
      <div class="ModalAddedMobile__img">
        <img
        src="https://ust-ilimsk.loveflowers.ru/wp-content/uploads/2018/04/rafaello-150.jpg" 
        alt="">
      </div>
      <div class="ModalAddedMobile__info">

      <h3 class='ModalAddedMobile__title'>{{modalAdded.title}}</h3>
      <!-- <p class='ModalAddedMobile__description'>Description</p> -->
      <button class='ModalAddedMobile__addToBasket'
      @click="closeModalMobile(); 
      addToBasket(modalAdded.title, modalAdded.price)"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ModalAddedMobile',
  computed: {
    ...mapState({
      ModalAddedActive: state => state.Interface.ModalMobileAdded.isActive,
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      modalPrice: state => state.Inventories.modalPrice,
      modalAdded: state=> state.Inventories.modalAdded,
      modalAddedActive: state => state.Interface.ModalAdded.isActive
      
    })
  },
  methods: {
    ...mapMutations(['CLOSE_ADDED_MODAL_MOBILE', 'ADD_TO_BASKET_ADDED']),
    addToBasket(item, price){
      let added = [item, price * this.amount ,null,  this.amount]
      this.ADD_TO_BASKET_ADDED(added)
    },
    closeModalMobile(){
        // this.CLOSE_MODAL_MOBILE()
      this.CLOSE_ADDED_MODAL_MOBILE()
    }
  },
  data() {
    return {
      amount: 1
    }
  }
}
</script>

<style lang='scss'>
  @import '@/vendor/interface.scss';
  .ModalAddedMobile{
    @include ModalMobile;
    z-index: 150;
    &_passive{
      bottom: -100vh;
    }
    &_active{
      bottom: -5vh;
    }
    &__close{
      @include ModalMobileClose;
    }
    &__img{
      @include ModalMobileImg;
    }
    &__title{
      font-weight: bold;
      font-size: 22px;
      line-height: 28px;
    }
    &__description{
      font-size: 14px;
      line-height: 20px;
      color: #000000;
    }
    &__info{
      padding: 0 16px;
    }
    &__addToBasket{
      width: 100%;
      margin-top: 25px;
      @include SubmitButton;
    }
  }
</style>
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
        :src="modalAdded.image" 
        alt="">
      </div>
      <div class="ModalAddedMobile__info">

      <h3 class='ModalAddedMobile__title'>{{modalAdded.title}}</h3>
      <!-- <p class='ModalAddedMobile__description'>Description</p> -->
      <button class='ModalAddedMobile__addToBasket'
      @click="closeModalMobile(); pixelBasket();
      addToBasket(modalAdded.title, modalAdded.price, modalAdded.image)"
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
  mounted() {


//     !function(f,b,e,v,n,t,s)
// {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// n.callMethod.apply(n,arguments):n.queue.push(arguments)};
// if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
// n.queue=[];t=b.createElement(e);t.async=!0;
// t.src=v;s=b.getElementsByTagName(e)[0];
// s.parentNode.insertBefore(t,s)}(window, document,'script',
// 'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '3739894582790910');
// fbq('track', 'PageView');


    // fbq('track', 'ViewContent', {
    //   value: this.modalPrice,
    //   currency: 'RUB',
    //   content_type: 'product',
    //   content_name: this.modal.title,
    // })
  
  },
  methods: {
    pixelBasket(){
      fbq('track', 'AddToCart', {
        value: this.modalAdded.price,
        currency: 'RUB',
        content_type: 'product',
        content_name: this.modalAdded.title,
      })
    },
    
    ...mapMutations(['CLOSE_ADDED_MODAL_MOBILE', 'ADD_TO_BASKET_ADDED']),
    addToBasket(title, price, img){
      let added = [title, price , img,  this.amount]
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
      bottom: -10vh;
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
<template>
  <div v-if='modalAddedActive == true' class="modalAdded__wrapper 
  d-flex justify-content-center align-items-center">
    <!-- Название Доп Товара {{modalAdded[0]}}
    Цена {{modalAdded[2]}} -->
    <div class="modalAdded">
      <img @click='closeModalAdded()' src="@/assets/Close.svg" alt="" class="modalAdded__close">
      <img class='modalAdded__img'
        :src="modalAdded.image" 
        alt="">
      <div>
        <p class='modalAdded__title'>{{modalAdded.title}}</p>
        <!-- <p>Цена: {{modalAdded.price}}</p> -->
        <div class='d-flex justify-content-between'>
        <p class='modalAdded__counter d-flex 
        flex-row justify-content-between align-items-center'>
          <button class='modalAdded__button' v-if="amount>1"
          @click='minusOne()'>-</button>
          <button class='modalAdded__button' v-else disabled>-</button>
          <!-- <button class='Modal__button' v-else disabled>-</button> -->
            <!-- {{amount}} -->
            {{amount}}
          <button class='modalAdded__button' @click='plusOne()'>+</button>
        </p>
    
        <div class="modalAdded__price d-flex align-items-center justify-content-end">         
          <!-- {{modalPrice*amount}} ₽ -->
          {{modalAdded.price*amount}}
        </div>
      </div>

        <button class='modalAdded__addToBasket'
          @click='addToBasket(modalAdded.title, modalAdded.price, modalAdded.image); 
          closeModalAdded(); pixelBasket()'>
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
// import Added from '@/components/subcomponents/Added.vue'
export default {
  name: "modalAdded",
  computed: {
    ...mapState({
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      modalPrice: state => state.Inventories.modalPrice,
      modalAdded: state=> state.Inventories.modalAdded,
      modalAddedActive: state => state.Interface.ModalAdded.isActive
    }),
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


  },
  methods: {
    pixelBasket(){
      fbq('track', 'AddToCart', {
        value: this.modalPrice,
        currency: 'RUB',
        content_type: 'product',
        content_name: this.modal.title,
      })
    },
    ...mapMutations(['ADD_TO_BASKET_ADDED', 'CLOSE_MODAL_ADDED']),
    addToBasket(title, price, img){
      // let item = [title, price, pic , this.amount, size]
      let added = [title, price , img,  this.amount]
      this.ADD_TO_BASKET_ADDED(added)
    },
    closeModalAdded(){
      this.CLOSE_MODAL_ADDED()
    },
    plusOne(){
      this.amount += 1
    },
    minusOne(){
      this.amount -= 1
    }
  },

  data(){
    return {
      amount: 1
    }
  }


}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
  .modalAdded{
    z-index: 155;
    @include ModalBase;
    @include ModalAdded;

    &__wrapper{
      @include ModalWrapper;
      z-index: 54;
    }
    &__close{
      @include ModalClose;
    }
    &__img{
      @include ModalImg;
    }
    &__title{
      @include ModalTitle;
    }
    &__counter, &__price{
      @include ModalCounterPrise;
    }
    &__counter{
      width: 40%;
    }
    &__price{
      width: 50%;
    }
    &__button{
      @include ModalButton;
    }
    &__addToBasket{
      width: 100%;
      margin-top: 25px;
      @include SubmitButton;
    }
  }
</style>
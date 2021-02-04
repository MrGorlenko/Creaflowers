<template>
  <div :class="{'d-lg-flex': modalActive==true, 'd-lg-none': modalActive==false}"
   class=" Modal__wrapper d-none justify-content-center align-items-center">
    <div class="Modal d-flex flex-column justify-content-between">
      <img @click='modalDeactivate()' src="@/assets/Close.svg" alt="" class="Modal__close">
      <!-- АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ 
        <img class='goods__img' :src="modal.img" alt=""> 
        АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->

      <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
      <img class='Modal__img' 
        src="https://floristcenter.ru/image/catalog/Newphoto/Buket-iz-101-krasnoy-roz.jpg"
        alt="">
      <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
      <div>
      <p class='Modal__title'>{{modal.title}}</p>
      <p class='Modal__description'>{{modal.description}}</p>
      
      <div v-if="modal.price_size.length > 1" 
        class="Modal__select">
        <p class='Modal__selectSize'>
          {{modalSize}}
        </p>

        <p class='Modal__selectPrice'>
          {{modalPrice}} ₽
        </p>
        <label class='Modal__label'>Выберите размер</label>
        <div class="Modal__white"></div>
        <select 
        v-model="modalPrice">
          <option 
          class='Modal__option'
          @click="togglePrice(size[0]); toggleSize(size[1])" 
          v-for="size in modal.price_size" 
          :key="size" :value="size[1]">
            {{size[1]}} 
          </option>
        </select>
      </div>

      <div class='d-flex'>
        <p class='Modal__counter d-flex 
        flex-row justify-content-between align-items-center'>
          <button class='Modal__button' v-if='amount>1' @click='minusOne()'>-</button>
          <button class='Modal__button' v-else disabled>-</button>
            {{amount}}
          <button class='Modal__button' @click='plusOne()'>+</button>
        </p>
    
        <div class="Modal__price d-flex align-items-center justify-content-end">         
          {{modalPrice*amount}} ₽
        </div>
      </div>

      <button class='Modal__addToBasket'
      @click="addToBasket(modal.title, modalPrice, modal.img, modalSize);modalDeactivate()"
      >
        Добавить в корзину
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import Added from '@/components/subcomponents/Added.vue'
export default {
  name: "modal",
  components: {
    Added
  },
  data(){
    return{
      amount: 1
    }
  },
  computed: {
    ...mapState({
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      modalPrice: state => state.Inventories.modalPrice,
      modalActive: state => state.Interface.Modal.isActive,
      modalSize: state => state.Interface.ModalSize
    }),
  },
  methods: {
    ...mapMutations(['SELECT_PRICE', 
    'FINAL_PRICE', 'ADD_TO_BASKET', 'MODAL_DEACTIVATE', 'SET_SIZE']),
    toggleSize(size){
      this.SET_SIZE(size)
    },
    togglePrice(price){
      this.SELECT_PRICE(price)
    },
    addToBasket(title, price, pic, size){
      let item = [title, price, pic , this.amount, size]
      this.ADD_TO_BASKET(item)
      alert('Спасибо! ' + title + ' добавлен в корзину в количестве ' + this.amount +' шт.')
    },
    plusOne(){
      this.amount++;
    },
    minusOne(){
      this.amount--;
    },
    modalDeactivate(){
      this.MODAL_DEACTIVATE()
    }
  },
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
  .Modal{
    z-index: 10;
    @include ModalBase;
    @include ModalMain;
    &__close{
      @include ModalClose;
    }
    &__title{
      @include ModalTitle;
      text-align: start;
    }
    &__description{
      text-align: start;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
    &__img{
      @include ModalImg;
    }
    &__label{
      @include SelectLabel;
      z-index: 12;
    }
    &__white{
      @include SelectWhite;
    }
    &__selectSize, &__selectPrice{
      @include SelectSizePrice;
      z-index: 12;
    }
    &__selectSize{
      left: 16px;
      bottom: 5px;
      margin-bottom: 0;
    }
    &__selectPrice{
      top: 18px;
      right: 44px;
    }
    &__size{
      text-align: start;
      font-size: 13px;
      color: #A4A4A4; 
      line-height: 20px;
      font-weight: normal;
      margin-bottom: 5px;
    }
    &__counter, &__price{
      @include ModalCounterPrise;
    }
    &__counter{
      width: 120px;
    }
    &__price{
      margin-left: 16px;
      width: calc(100% - 136px);
    }
    &__button{
      @include ModalButton;
    }
    &__addToBasket{
      width: 100%;
      margin-top: 25px;
      @include SubmitButton;
    }
    &__select{
      width: 100%;
      height: 56px;
      margin-bottom: 16px;
      position: relative;
      @include Select;
      // content: url('../assets/arrow.svg');
      &::after{
        content: url('../assets/arrow.svg');
      }
    
    }
    &__wrapper{
      z-index: 12;
      @include ModalWrapper;
    }
  }
</style>
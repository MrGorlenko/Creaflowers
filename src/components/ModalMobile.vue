<template>
  <div
   :class="{'ModalMobile_active': MobileModalActive == true,
    'ModalMobile_passive': MobileModalActive == false}"
   class="ModalMobile">
    <!-- <div class="ModalMobile__dark"></div> -->
    <div class="d-flex justify-content-center align-items-center
     ModalMobile__close"
     @click='closeModalMobile()'>
      <div></div>
    </div>
    <div class="ModalMobile__img">
      <img src="@/assets/goodExample.png" alt="">
    </div>

    <div class="ModalMobile__info">

      <h3 class='ModalMobile__title'>{{modal.title}}</h3>
      <p class='ModalMobile__description'>{{modal.description}}</p>
      <div v-if="modal.price_size.length > 1" 
        class="ModalMobile__select">
        <p class='ModalMobile__selectSize'>
          {{modalSize}}
        </p>

        <p class='ModalMobile__selectPrice'>
          {{modalPrice}} ₽
        </p>
        <label class='ModalMobile__label'>Выберите размер</label>
        <div class="ModalMobile__white"></div>
        <select 
        v-model="modalPrice">
          <option 
          class='ModalMobile__option'
          @click="togglePrice(size[0]); toggleSize(size[1])" 
          v-for="size in modal.price_size" 
          :key="size" :value="size[1]"
         >
            {{size[1]}} 
          </option>
        </select>
      </div>
      <button class='ModalMobile__addToBasket'
      @click="closeModalMobile(); 
      addToBasket(modal.title, modalPrice, modal.img, modalSize)"
      >
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "ModalMobile",
  components: {
  },
  computed: {
    ...mapState({
      MobileModalActive: state => state.Interface.ModalMobile.isActive,
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      modalPrice: state => state.Inventories.modalPrice,
      modalActive: state => state.Interface.Modal.isActive,
      modalSize: state => state.Interface.ModalSize
    })
  },
  methods: {
    ...mapMutations(['CLOSE_MODAL_MOBILE', 'SELECT_PRICE', 
    'FINAL_PRICE', 'ADD_TO_BASKET', 'MODAL_DEACTIVATE', 'SET_SIZE']),
    closeModalMobile(){
      this.CLOSE_MODAL_MOBILE()
    },
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
  },
  data(){
    return{
      amount: 1
    }
  },
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
  .ModalMobile{
    position: fixed;
    overflow-y: scroll;
    left:0;
    height: 100vh;
    width: 100%;
    background: linear-gradient(179.96deg, #E3D6D4 50%, #FAF1ED 99.96%);
    z-index: 100;
    border-radius: 16px 16px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 75px;
    transition: .5s ease;
    &_passive{
      bottom: -100vh;
    }
    &_active{
      bottom: -5vh;
    }
    &__close{
      height: 16px;
      z-index: 2;
      position: absolute;
      top: 0;
      left:0;
      width: 100%;
      div{
        width: 36px;
        height: 4px;
        background: #FFFFFF;
      }
    }
    &__img{
      width:100%;
      border-radius: 16px 16px 0px 0px;
      position: relative;
      img{
        width:100%;
      }
      &::after{
        position: absolute;
        bottom: 0;
        left:0;
        display: block;
        width: 100%;
        height: 50%;
        content: '';
        background: linear-gradient(180deg, rgba(228, 215, 215, 0) 66.12%, #E5D8D5 100%);
      }
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
  }
</style>
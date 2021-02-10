<template>
  <div
   :class="{'ModalMobile_active': MobileModalActive == true,
    'ModalMobile_passive': MobileModalActive == false}"
   class="ModalMobile">
    <!-- <div class="ModalMobile__dark"></div> -->
    <div class="d-flex justify-content-start align-items-center
     ModalMobile__close"
     >
      <img @click='closeModalMobile()' src="@/assets/CloseBasket.svg" alt="">
    </div>
    <div class="ModalMobile__img">
      <img :src="modal.image" alt="">
    </div>

    <div class="ModalMobile__info">

      <h3 class='ModalMobile__title'>{{modal.title}}</h3>
      <p class='ModalMobile__description'>{{modal.description}}</p>
      <div
      @click='activateSelect()'
       v-if="modal.price_size.length > 1" 
        class="ModalMobile__select">
        <p class='ModalMobile__selectSize'>
          {{modalSize}}
        </p>

        <p class='d-flex align-items-center ModalMobile__selectPrice'>
          {{modalPrice}} 
          <svg style='margin-left:2px;' width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#181725"/>
          </svg>
        </p>
        <label class='ModalMobile__label'>Выберите размер</label>
      </div>

      <button class=' ModalMobile__addToBasket'
      @click="closeModalMobile(); 
      addToBasket(modal.title, modalPrice, modal.image, modalSize)"
      >
        Добавить в корзину {{modalPrice}} 
        <svg width="12" height="13" viewBox="0 0 13 14" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#ffffff"/>
              </svg>
      </button>
    </div>
    <!-- MODAL -->
    <div 
    v-if='selectActive==true'
    class="Select d-flex justify-content-center align-items-center">
      <div class="Select__window">
        <h3 class="Select__title">Size</h3>
        <SelectItem
          v-for="size in modal.price_size" 
          :key="size"
          :value1='size[1]'
          :value2='size[0]'
          :value='size'
          :model='picked'
          :currency='"руб."'
           @click="togglePrice(size[0]); toggleSize(size[1]); deactivateSelect()"
            > </SelectItem>
      </div>
    </div>
    <!-- MODAL -->
  </div>
</template>

<script>
import SelectItem from '@/components/subcomponents/SelectItem.vue'
import Select from '@/components/Select.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: "ModalMobile",
  components: {
    Select,
    SelectItem
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
    addToBasket(title, price, img, size){
      let item = [title, price, img , this.amount, size]
      this.ADD_TO_BASKET(item)
      // alert('Спасибо! ' + title + ' добавлен в корзину в количестве ' + this.amount +' шт.')
    },
    activateSelect(){
      this.selectActive = true
    },
    deactivateSelect(){
      this.selectActive = false
    }
  },
  data(){
    return{
      amount: 1,
      picked: '',
      selectActive: false
    }
  },
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
 
  .ModalMobile{
    @include ModalMobile;
    z-index: 100;
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      @include Select;
      // content: url('../assets/arrow.svg');
      &::after{
        content: url('../assets/arrow.svg');
      }
    
    }
  }
</style>
<template>
  <div v-if='BasketActive==true' 
   class=" d-flex basket flex-column align-items-center">
    <img @click='closeBasket()' src="@/assets/CloseBasket.svg"
     alt="" class="basket__close d-lg-block d-none">
    <img @click='closeBasket()' src="@/assets/CloseBasketMobile.svg"
     alt="" class="basket__close d-lg-none">
    <p class='basket__basketTitle'>Корзина</p>

    <div  v-for="(good, index) in Goods" :key=good class="basket__item">
      <!-- <div  v-for="(good) in Goods" :key=good class="basket__item"> -->
      <!-- АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ 
        <img class='goods__img' :src="good[2]" alt=""> 
        АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->

      <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
      <img class='basket__img' 
        src="https://floristcenter.ru/image/catalog/Newphoto/Buket-iz-101-krasnoy-roz.jpg"
        alt="">
      <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
      <div class="basket__info d-flex flex-wrap">
        <img @click='removeFromBasket(index); removePriceFromBasket(good[1]*good[3])' src="@/assets/RemoveGood.svg" alt="" class="basket__removeItem">
        <p class='basket__title'>{{good[0]}}</p>
        <p v-if='good[4] != null' class="basket__size">({{good[4]}})</p>
        <div :class="{'basket__count_noSize':good[4]==null}" class="basket__count d-flex align-items-center">
          <button 
          v-if="good[3]>1"
          @click='minusOne(index); removeOldPrice(good[1])' 
          class="basket__button basket__button_active">-</button>
          <button 
          v-else
          disabled
          class="basket__button basket__button_passive">-</button>
          <p class='basket__amount'>{{good[3]}}</p>
          <button @click='plusOne(index); addNewPrice(good[1])' 
          class="basket__button basket__button_active">+</button>
        </div>
        <p class="basket__price justify-content-end align-items-end">
          {{good[1]}} <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#181725"/>
</svg>
        </p>
      </div>
    </div>
    <Added/>
    <Form/>
    <!-- <button>КУПИТЬ на сумму {{Result}} </button> -->
  </div>
</template>

<script>
import Added from '@/components/subcomponents/Added.vue'
import Form from '@/components/subcomponents/Form.vue'
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'basket',
  components: {
    Added,
    Form
  },
  computed: {
    ...mapState({
      Goods: state => state.Inventories.basket,
      Result: state => state.Inventories.finalPrice,
      BasketActive: state => state.Interface.Basket.isActive
    })
  },
  methods: {
    ...mapMutations(['REMOVE_FROM_BASKET', 
    'PLUS_ONE', 'MINUS_ONE', 'REMOVE_PRICE', 'REMOVE_OLD_PRICE', 
    'ADD_NEW_PRICE', 'CLOSE_BASKET']),
    removeFromBasket(index){
      this.REMOVE_FROM_BASKET(index)
    },
    removePriceFromBasket(price){
      this.REMOVE_PRICE(price)
    },
    plusOne(index){

      this.PLUS_ONE(index)
    },
    minusOne(index){
      this.MINUS_ONE(index)
    },

    removeOldPrice(oldPrice){
      this.REMOVE_OLD_PRICE(oldPrice)
    },

    addNewPrice(newPrice){
      this.ADD_NEW_PRICE(newPrice)
    },
    closeBasket(){
      this.CLOSE_BASKET()
    }
  }
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
.basket{
  z-index: 14;
  width: 100%;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  overflow-x:scroll;
  overflow-y:scroll;
  left: 0;
  &__wrapper{
    width:100%;
    height:100%;
    overflow-x:scroll;
    overflow-y:scroll;
  }
  &__info{
    position: relative;
    padding-bottom: 32px;
    width: 100%;
  }
  &__removeItem{
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .3s ease;
    cursor: pointer;
    &:hover{
      opacity: .6;
    }
  }
  &__basketTitle{
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    margin-top: 29px;
    width: 100%;
    color: #191919;
  }
  &__img{
    width: 110px;
    height: 108px;
    border-radius: 12px;
  }
  &__close{
    position: absolute;
    top:20px;
    right:20px;
    cursor: pointer;
    transition: box-shadow .3s ease;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    &:hover{
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    }
  }
  &__item{
    padding: 5px;
    width:calc( #{$innerBasketWidth} - 20px);
    padding:0;
    // padding: 0 10px 0 10px;
    border-bottom: 1px solid #EBEBEB;
    display: flex;
    margin-bottom: 32px;
  }
  &__count{
    width: 130px;
    margin-top: 16px;
    &_noSize{
      margin-top: 36px;
    }
  }
  &__amount{
    margin-bottom: 0;
    margin-right: 15px;
    margin-left: 15px;
  }
  &__title, &__size{
    text-align: start;
    width: 100%;
  }
  &__title{
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 0;
  }
  &__price{
    width: calc(100% - 130px);
    margin-bottom: 0;
    text-align: end;
    height: 22px;
    margin-top: 14px;
    font-weight: 600;
    font-size: 20px;
    color: #000000;

    svg{
      min-height: 30px;
      height: 30px;
    }
  }
  &__size{
    color: #7C7C7C;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
  }
  &__button{
    background: none;
    width: 45px;
    height: 45px;
    border-radius: 17px;
    font-size: bolder;
    font-size: 28px;
    &_active{
      border: 1px solid #E2E2E2;
      color: #6709DE;
    }
    &_passive{
      border: 1px solid #F0F0F0;
      color: #B3B3B3;
    }
  }
}
@media (max-width:992px){
  .basket{
    z-index: 110;
    padding: 0 24px;
    &__close{
      border-radius: 12px;
      width: 44px;
      height: 44px;
    }
    &__img{
      width: 82px;
      height: 97px;
      object-fit: cover;
    }
    &__info{
      width: calc(100% - 25px);
      margin-left: 25px;
    }
    &__button{
      width: 30px;
      height: 30px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__basketTitle{
      margin-bottom: 38px;
    }
    &__price{
      min-height: 45px;
      display: flex;
      // align-items: end;
      // justify-content: flex-end;
      align-items: center;
      margin-top: 36px;
    }
    &__item{
      position: relative;
      width:100%;
      min-height: 138px;

      margin-bottom: 32px;
    }
  }
}
</style>
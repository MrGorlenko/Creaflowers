<template>
  <div class="goods">
    <div
    v-for="(goods, category) in categories" :key="goods"
    >
    <div 
    class="goods__products align-items-center d-flex flex-wrap" 
    v-if='goods.isActive'
    >
      <p class="d-lg-none goods__category">{{category}}</p>
      <!-- <p>{{goods.isActive}}</p> -->
      <!-- Desctop -->
      <div @click="getInfo(item, item.size[0])"
       class='goods__item d-lg-block d-none'
        v-for='item in goods.goods' :key=item>
        <img @click='addToBasket(item.title, item.price[0], item.img, item.size[0])' src="@/assets/toBasket.svg" alt="" class="goods__toBasket">
        <img @click='modalActivate()' src="@/assets/toModal.svg" alt="" class="goods__toModal">

        <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
        <img class='goods__img' 
        src="https://floristcenter.ru/image/catalog/Newphoto/Buket-iz-101-krasnoy-roz.jpg"
        alt="">
        <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->

        <!-- АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ 
        <img class='goods__img' :src="item.img" alt=""> 
        АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
          <div class="goods__info">
            <p class='goods__title'>{{item.title}}</p>
            <div class="goods__cost ">
              <span class="goods__cost_current">{{item.price[0]}}₽</span>
              <span class="goods__cost_old">{{item.oldPrice}}₽</span>
            </div>
          </div>
          <!-- <button @click='addToBasket(item.title, item.price[0])' >В корзину</button> -->
        </div>
        <!-- Desctop -->

      <!-- Mobile -->
        <div @click="mobileModalActivate();getInfo(item, item.size[0])" 
        class="goods__itemM d-lg-none d-flex"
        v-for='item in goods.goods' :key=item>
        <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->
          <img class='goods__img' 
          src="@/assets/goodExample.png"
          alt="">
        <!-- ДЕАКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->

          <!-- АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ 
          <img class='goods__img' :src="item.img" alt=""> 
          АКТИВИРОВАТЬ КОГДА БУДУТ ЗАБИНЖЕНЫ КАРТИНКИ -->

          <!-- <div class="goods__info"> -->
            <p class="goods__title">{{item.title}}</p>
            <div class="goods__cost flex-start">
              <span class="goods__cost_current">{{item.price[0]}}₽</span>
              <span class="goods__cost_old">{{item.oldPrice}}₽</span>
            </div>
          <!-- </div> -->
        </div>  
      <!-- Mobile -->
      </div>
        <!--  -->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'goods',
  computed: {
    ...mapState({
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      catsView: state => state.Interface.categoryActivation
    }),
  },
  methods: {
    ...mapMutations(['ADD_TO_MODAL', 'ADD_TO_BASKET', 'MODAL_ACTIVATE',
     'SET_SIZE', 'OPEN_MODAL_MOBILE']),
    getInfo(info, size) {
      this.ADD_TO_MODAL(info)
      this.SET_SIZE(size)
    },
    addToBasket(title, price, pic, size){
      let item = [title, price, pic, 1, size]
      this.ADD_TO_BASKET(item)
    },
    modalActivate(){
      this.MODAL_ACTIVATE();
    },

    mobileModalActivate(){
      this.OPEN_MODAL_MOBILE()
    }

  }
}
</script>

<style lang='scss'>
  @import '@/vendor/interface.scss';

  .goods{
    width: calc(1580px - #{$sideBarWidth});
    margin: auto;
    &__category{
      width: 100%;
    }
    &__products{
      width: 100%;
      min-height: 100vh;
    }
    &__toBasket, &__toModal{
      width: 18.7;
      position: absolute;
      opacity: 0;
      transition: .3s ease;
      cursor: pointer;
      right: 5px;
      border-radius: 100px;
      &:hover{
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
      }
    }
    &__toBasket{
      top: 14px;
    }
    &__toModal{
      // top:
      top: calc(40px + 20px)
    }
    &__img{
      width: 100%;
      border-radius: 12px;
      height: 75%;
    }
    &__item{
      width: $goodsWidthDesctop;
      margin-right: calc((#{$width100} -( #{$goodsWidthDesctop}*4))/3);
      margin-bottom: 24px;
      border-radius: 12px;
      min-height: 45%;
      position: relative;
      &:nth-child(5n+5){
        margin-right: 0;
      }

      &:hover{
        box-shadow: 0px 20px 25px -10px rgba(206, 206, 206, 0.24);
        filter: drop-shadow(0px 0px 20px rgba(204, 204, 204, 0.25));
        .goods__info::after{
          top: -20px;
        }
        .goods__toBasket, .goods__toModal{
          opacity: 1;
          transition: .3s ease;

        }
      }
    }
    &__title{
      margin-bottom: 0;
      font-weight: 600;
      z-index: 2;
      position: relative;
    }
    &__info{
      background: #fff;
      border-radius: 0 0 12px 12px;
      position: relative;
      height: 25%;
      padding-bottom: 12px;
      &::after{
        position: absolute;
        border-radius: 0 0 12px 12px;
        display: block;
        width: 100%;
        height: 100%;
        content: '';
        top: 0;
        left: 0;
        background: #fff;
        transition: top .3s ease;
      }
    }
    &__cost{
      width: 100%;
      z-index: 2;
      position: relative;
      // &__current, &_
      &_current{
        margin-right: 8px;
        font-weight: 600;
      }
      &_old{
        text-decoration: line-through;
      }
    }
  }

  @media (max-width: 1600px){
    .goods{
      width: calc(1350px - #{$sideBarWidth});
    }
  }

  @media (max-width: 1352px){
    .goods{
      width: calc(1150px - #{$sideBarWidth});
      &__item{
        min-height: auto;
        height: 35%;
      }
    }
  }

  @media (max-width: 1152px){
    .goods{
      width: calc(991px - #{$sideBarWidth});
    }
  }


  @media (max-width: 992px){
    .goods{
      background: #f4f4f4;
      width:100%;
      padding:8px;
      &__category{
        color: #191919;
        font-size: 28px;
        line-height: 32px;
        font-weight: bold;
        text-align: start;
        margin-top: 24px;
      }
      &__itemM{
        width: 100%;
        margin-bottom: 24px;
        position: relative;
        border-radius: 25px;
        box-shadow: 0px 20px 30px -10px rgba(0, 0, 0, 0.1);
        &::after{
          position: absolute;
          width:100%;
          height: 45%;
          bottom:0;
          left:0;
          border-radius: 25px;
          background: none;
          display: block;
          content: '';
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 2.31%, rgba(0, 0, 0, 0.4) 100%);
        }
      }
      &__img{
        width:100%;
        
        border-radius: 25px;
      }
      &__cost, &__title{
        position: absolute;
        left: 16px;
      }
      &__cost{
        bottom: 40px;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        align-items: center;
        // justify-content: start;
        width:auto
      }
      &__title{
        
        bottom: 68px;
        font-weight: 600;
        font-size: 28px;
        line-height: 32px;
        color: #FFFFFF;

      }
    }
  }
</style>
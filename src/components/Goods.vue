<template>
  <div class="goods">
    <div class='goods__wrapper'
    v-for="(goods, category) in categories" :key="goods"
    >
    <h2 class=" goods__category">{{category}}</h2>
    <div 
    class="goods__products align-items-start d-lg-flex flex-wrap" 
    >
      <div @click="getInfo(item, item.size[0])"
       class='goods__item d-lg-block d-none'
        v-for='item in goods.goods' :key=item>
        <img @click='
        pixelBasket(item.title, item.price[0]);
        addToBasket(item.title, item.price[0], item.image, item.size[0])' 
        src="@/assets/toBasket.svg" alt="" class="goods__toBasket">
        <img @click='modalActivate();pixelModal(item.title, item.price[0])' 
        src="@/assets/toModal.svg" alt="" class="goods__toModal">


        <img  class='goods__img' :src="item.image" alt="FLOWER"> 
          <div class="goods__info">
            <p class='goods__title'>{{item.title}}</p>
            <div class="goods__cost ">
              <span class="goods__cost_current">{{item.price[0]}}₽</span>
              <span v-if='item.oldPrice != null' class="goods__cost_old">{{item.oldPrice}}₽</span>
            </div>
          </div>
     </div>
        <!-- Desctop -->

      <!-- Mobile -->

        <div @click="mobileModalActivate();getInfo(item, item.size[0]);pixelModal(item.title, item.price[0])" 
        class="goods__itemM d-lg-none d-flex"
        v-for='item in goods.goods' :key=item>

          <img v-on:load="loaderOff()" class='goods__img' :src="item.image" alt="FLOWER"> 

          <div class="goods__cost w-100 flex-row 
          align-items-start justify-content-around">
            <p class="goods__title d-flex">{{item.title}}</p>
              <p class="d-flex align-items-center goods__cost_current">{{item.price[0]}} 
              
              <svg style='margin-left:2px' width="13" height="14" viewBox="0 0 13 14" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#ffffff"/>
              </svg>
              </p>
              <span v-if='item.oldPrice != null' class="d-flex align-items-center goods__cost_old">
                {{item.oldPrice}}
                <svg width="13" height="14" viewBox="0 0 13 14" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#ffffff"/>
              </svg>
              </span>
            </div>
        </div>  
      <!-- Mobile -->
      </div>
    </div>
  </div>
   <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'goods',
  components: {
    Footer
  },
  computed: {
    ...mapState({
      categories: state => state.Inventories.goods,
      modal: state => state.Inventories.modal,
      catsView: state => state.Interface.categoryActivation
    }),
    ...mapGetters(['allGoods'])
  },
  async mounted(){
    this.fetchGoods();
  },
  methods: {
     ...mapActions(['fetchGoods']),
    ...mapMutations(['ADD_TO_MODAL', 'ADD_TO_BASKET', 'MODAL_ACTIVATE',
     'SET_SIZE', 'OPEN_MODAL_MOBILE', 'LOADER_OFF']),
    loaderOff(){
      // this.LOADER_OFF()
      console.log('aaa')
    },
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
    },
    pixelBasket(title, price){
      fbq('track', 'AddToCart', {
        value: price,
        currency: 'RUB',
        content_type: 'product',
        content_name: title,
      })
    },
    pixelModal(title, price){
      fbq('track', 'ViewContent', {
        value: price,
        currency: 'RUB',
        content_type: 'product',
        content_name: title
      })
    }

  }
}
</script>

<style lang='scss'>
  @import '@/vendor/interface.scss';

  .goods{
    width: 900px;
    margin: auto;
    &__wrapper{
      position: relative;
    }
    &__category{
      width: 100%;
      position: absolute;
      top:10px;
      left:0;
      text-align: start;
      font-weight: 500;
      color: #000;
    }
    &__products{
      width: 100%;
      // min-height: 100vh;
      position: relative;
      padding-top: 75px;
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
      margin-right: calc( 8% / 3 ) ;
      margin-bottom: 24px;
      border-radius: 12px;
      min-height: 45%;
      position: relative;
      &:nth-child(4n+4){
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
        // margin-bottom: 0;
      }
      &_old{
        text-decoration: line-through;
      }
    }
  }

  @media (max-width: 1600px){
    .goods{
      width: calc(1350px - #{$sideBarWidth} - 150px);
    }
  }

  @media (max-width: 1352px){
    .goods{
      width: calc(1150px - #{$sideBarWidth} - 150px);
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
      // &__cost, &__title{
      //   // position: absolute;
      //   line-height: 32px;

      // }
      &__cost{
        bottom: 0px;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        line-height: 20px;
        // justify-content: start;
        width:100%;
        left:0;
        position: absolute;
        bottom: 40px;
        // padding-bottom: 40px;
        &_current{
                  background: #6709DE;
border-radius: 100px;
padding: 10px 12px;
// width: 23%;
width: auto;
        }
      }
      &__title{
        text-align: start;
        // bottom: 68px;
        font-weight: 600;
        font-size: 22px;
        color: #FFFFFF;
        width: 65%;

      }
    }
  }
</style>
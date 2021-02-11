<template>
  <div class="addedGoods">
    <h3 class="added__title">Добавить к заказу?</h3>
<!-- :centeredSlides = true -->

    <swiper
    class='d-none d-lg-block'
    :slides-per-view="2.5
    "
    :space-between="16"
    @swiper="onSwiper"
    @slideChange="onSlideChange">

      <swiper-slide
      @click='addToModalAdded(added);openModalAdded()'
      v-for="(added) in addedGoods" :key='added'
      class="addedGoods__item"
      >
       <img  class='addedGoods__img'
       v-bind:src='added.image'
          alt="нет">

        <p class="addedGoods__title">{{added.title}}</p>
        <p class="addedGoods__price">
          <span class="addedGoods__price_current">{{added.price}}</span>
          <span v-if='added.oldPrice!=null' class="addedGoods__price_old">{{added.oldPrice}}</span>
        </p> 
      </swiper-slide>

    </swiper>

    <swiper
    class='d-lg-none'
    :slides-per-view="2.5
    "
    :space-between="16"
    @swiper="onSwiper"
    @slideChange="onSlideChange">

      <swiper-slide
      @click='addToModalAdded(added);openModalAddedMobile()'
      v-for="(added) in addedGoods" :key='added'
      class="addedGoods__item"
      >
       <img  class='addedGoods__img'
       v-bind:src='added.image'
          alt="нет">

        <p class="addedGoods__title">{{added.title}}</p>
        <p class="addedGoods__price justify-content-center">
          <span class="addedGoods__price_current justify-content-center flex-nowrap d-flex align-items-center flex-row">{{added.price}}  
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#181725"/>
</svg>
          </span>

          <span  v-if='added.oldPrice!=null' class="addedGoods__price_old justify-content-center flex-nowrap d-flex align-items-center flex-row">{{added.oldPrice}}
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5291 8.87355H0.772705V7.19883H7.50353C8.08307 7.19883 8.56248 7.10295 8.94174 6.91119C9.321 6.71517 9.60225 6.4467 9.78549 6.10579C9.96873 5.76062 10.0603 5.36431 10.0603 4.91687C10.0603 4.47369 9.96873 4.07738 9.78549 3.72795C9.60225 3.37852 9.32313 3.10366 8.94813 2.90338C8.57313 2.69883 8.10012 2.59656 7.5291 2.59656H4.74217V14H2.77342V0.909058H7.5291C8.522 0.909058 9.35083 1.08803 10.0156 1.44599C10.6846 1.80394 11.1853 2.28548 11.5177 2.89059C11.8544 3.49571 12.0227 4.169 12.0227 4.91048C12.0227 5.66048 11.8523 6.3359 11.5113 6.93676C11.1747 7.53335 10.6719 8.00636 10.0028 8.35579C9.33805 8.70096 8.51347 8.87355 7.5291 8.87355ZM7.62498 9.97298V11.6541H0.772705V9.97298H7.62498Z" fill="#b2b2b2"/>
</svg>
        
          </span>
        </p> 
      </swiper-slide>

    </swiper>

  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'AddedGoods',
  components:{
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState({
      addedGoods: state => state.Inventories.addedGoods,
      addedGoodsSelected: state => state.Inventories.addedGoodsSelected
    }),
    ...mapGetters(['allAddedGoods'])
  },
  async mounted(){
    this.fetchAddedGoods();
  },
  methods: {
    ...mapActions(['fetchAddedGoods']),
    ...mapMutations(['ADD_TO_MODAL_ADDED',
     'OPEN_MODAL_ADDED', 'OPEN_ADDED_MODAL_MOBILE']),
    addToModalAdded(added_item){
      this.ADD_TO_MODAL_ADDED(added_item)
    },
    openModalAdded(){
      this.OPEN_MODAL_ADDED()
    },

    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },

    openModalAddedMobile(){
      this.OPEN_ADDED_MODAL_MOBILE()
    }

  },
  data(){
    return {
      addGoods: []
    }
  }
}
</script>

<style lang="scss">
@import '@/vendor/interface.scss';
  .added{
    &__title{
      letter-spacing: 0.02em;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      text-align: start;
      color: #191919;
      width: 520px;
      margin-left: 20px;
    }
  }
  .addedGoods{
    margin-top: 56px;
    width: $innerBasketWidth;
    &__wrapper{
      display: none;
      // justify-content: space-around;
      // flex-wrap: wrap;
      flex-direction: row;
      // overflow-x: scroll;
    }
    &__title{
      text-align: center;
      color: #000000;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
      min-height: 65px;
      height: 65px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    &__img{
      width: 100%;
      // box-shadow: 0px 14px 34px -10px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      object-fit: cover;
      transition: box-shadow .3s ease;
      box-shadow: 10px 14px 35px -10px rgba(0, 0, 0, 0.15);
      // &:hover{
      //   box-shadow: 0px 14px 34px -10px rgba(0, 0, 0, 0.15);
      // }
    }
    &__price{
      line-height: 20px;
      font-size: 14px;
      &_current{
        color: #000;
        font-weight: 600;
      }
      &_old{
        color: #b2b2b2;
        text-decoration-line: line-through;
        margin-left: 8px;
      }
    }
    &__item{
      cursor: pointer;
      width: 146px;
      margin-right: 16px;
      padding:20px;
      // width: 48%;
      // height: auto;
      // border: 1px solid black;
      &_selected{
        background: red;
      }
      form{
        width: 100%;
        input{
          width: 95%;
        }
      }
    }
  }

  @media (max-width:992px){
    .added{
      &__title{
        width: 100%;
        margin-left: 0;
      }

    }
    .addedGoods{
      width: 100%;
      &__item{
        padding:0;
      }
      &__price{
        // width:50%;
        display: flex;
        
        &_old, &_current{
          width: 50%;
          font-size: 11px;
          svg{
            width:8px;
          }
        }
        &_old{
          margin-left: 0;
        }

      }
    }
  }
</style>
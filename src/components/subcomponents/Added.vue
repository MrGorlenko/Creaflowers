<template>
  <div class="addedGoods">
    <h3 class="added__title">Добавить к заказу?</h3>
<!-- :centeredSlides = true -->

    <swiper
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
        <img class='addedGoods__img'
        src="https://ust-ilimsk.loveflowers.ru/wp-content/uploads/2018/04/rafaello-150.jpg" 
        alt="">

        <p class="addedGoods__title">{{added.title}}</p>
        <p class="addedGoods__price">
          <span class="addedGoods__price_current">{{added.price}}</span>
          <span class="addedGoods__price_old">{{added.oldPrice}}</span>
        </p> 
      </swiper-slide>

    </swiper>

    <div class="addedGoods__wrapper">
      <div @click='addToModalAdded(added);' v-for="(added) in addedGoods" :key='added'
      class="addedGoods__item"
      > 
        <!-- <div :class="{addedGoods__item_selected: added.selected}"> -->
          <img class='addedGoods__img'
          src="https://ust-ilimsk.loveflowers.ru/wp-content/uploads/2018/04/rafaello-150.jpg" 
          alt="">

          <!-- 
          ВКЛЮЧИТЬ КОГДА БУДУТ КАРТИНКИ
          <img 
          :src="added.img" 
          alt="">
          ВКЛЮЧИТЬ КОГДА БУДУТ КАРТИНКИ
           -->
           <p  class="addedGoods__title">{{added.title}}</p>
           <p class="addedGoods__price">
             <span class="addedGoods__price_current">{{added.price}}</span>
             <span class="addedGoods__price_old">{{added.oldPrice}}</span>
             </p> 
          <button @click='openModalAdded()'>aaa</button>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import SwiperCore from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/swiper.scss';
// SwiperCore.use()
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
    })
  },
  methods: {
    ...mapMutations(['ADD_TO_MODAL_ADDED',
     'OPEN_MODAL_ADDED']),
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
    }
  }
</style>
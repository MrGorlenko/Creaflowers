<template>
  <div @click='openBasket()' class="BasketIcon d-lg-block">
    <div v-if="goodsCount>0" class="BasketIcon__count">
      {{goodsCount}}
    </div>
    <img src="@/assets/Basket.svg" alt="">
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Basket-icon',
  computed: {
    ...mapState({
      goodsCount: state => state.Inventories.basket.length
    })
  },
  methods: {
    ...mapMutations(['OPEN_BASKET']),
    openBasket(){
      if (this.goodsCount>0){
        this.OPEN_BASKET()
      } else {
        alert('Вы еще ничего не выбрали')
      }
    }
  }
}
</script>

<style lang='scss'>
  .BasketIcon{
    cursor: pointer;
    z-index: 9;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: #F0F0E6;
    border: 1px solid #EBEBE1;
    box-sizing: border-box;
    // box-shadow: 0px 8px 26px -3px rgba(107, 107, 107, 0.4);
    border-radius: 5000px;
    padding: 25px;
    transition: box-shadow .3s ease;
    &:hover{
      box-shadow: 0px 8px 26px -3px rgba(107, 107, 107, 0.4);
    }
    &__count{
      background: #FF1515;
      position: absolute;
      top: 15px;
      right: 12px;
      border-radius: 100px;
      width: 24px;
      height: 24px;
      font-weight: bold;
      font-size: 14px;
      // line-height: 16px;
      text-align: center;

      color: #FFFFFF;
    }
    img{
      width: 39px;
      height: 34px;
    }
  }

  @media (max-width:992px){
    .BasketIcon{
      position:fixed;
      top: 14px;
      right: 22px;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 6px 12px -3px rgba(221, 221, 221, 0.8);
      border-radius: 12px;
      z-index: 96;
      &__count{
        width: 18px;
        height: 18px;
        top: 5px;
        right: 5px;
        display:flex;
        justify-content: center;
        align-items: center;
      }
      img{
        width: 24px;
        height: 21px;
      }
    }
  }
</style>
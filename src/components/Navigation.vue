<template>
  <div class="navigation
   d-flex align-items-lg-center
   flex-column
   justify-content-between ">
   <div class="navigation__logo flex-lg-center flex-start">
     <img src="@/assets/logo.png" alt="">
    </div>
    <Categories/>
    <hr class='d-lg-block d-none'>

    <div class='navigation__icons d-lg-flex d-none justify-content-between'>
      <a v-for='link in Links' :key='link' :href="link.link">
        <img :src=link.icon alt="">
      </a>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Categories from '@/components/Categories.vue'
import BasketButton from '@/components/subcomponents/BasketButton.vue'
export default {
  components:{
    Categories,
    BasketButton
  },
  computed: {
    ...mapState({
      Links: state => state.Contacts.SocialSidebar
    })
  }
}
</script>

<style lang='scss'>
  @import '@/vendor/interface.scss';
  .navigation{
    width: $sideBarWidth;
    position: fixed;
    top:0;
    left: 0;
    height: 100vh;
    background: linear-gradient(252.85deg, #FCFAFF 0%, #FBF8FF 107.56%);
    padding: 45px 16px 16px 16px;
    &__icons{
      width: calc(32px*2 + 24px);
    }
  }

  @media (max-width: 992px){
    .navigation{
      position: relative;
      height: auto;
      background: none;
      width: 100%;
      padding:0;
      &__logo{
        width:100%;
        position: fixed;
        top:0;
        left:0;
        height: $mobileNavigatorHeight;
        z-index: 95;
        display: flex;
        // justify-content: start;
        padding: 11px 0;
        background: rgba(255, 255, 255, 1);
        backdrop-filter: blur(20px);
        // margin-bottom: 24px;
      }
    }
  }
</style>
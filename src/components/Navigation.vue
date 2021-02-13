<template>
  <div class="navigation
   d-flex align-items-lg-center
   flex-column
   justify-content-between ">

   <div class="navigation__logo d-flex flex-lg-center flex-start">
     <a 
     class='d-flex justify-content-center align-items-center 
     d-lg-none navigation__wazzup' 
     href="https://api.whatsapp.com/send?phone=79515677266">
       <img src="@/assets/WazzupHeader.svg" alt="">
      </a>
     <img class="navigation__logoPic" @click='scrollTop()' src="@/assets/logo.png" alt="">
    </div>
    <div class='w-100 d-flex flex-row flex-wrap align-items-center justify-content-around'>

      <router-link
      class='categories__category '
      to='/'>
        <p>Все</p>

      </router-link>

      <router-link
      class='categories__category '
      :to='/Category/+goods'
      v-for='(category, goods) in categories'
      :key='goods'>
         <p>{{goods}}</p>
      </router-link>
    
 
    <hr class='d-lg-block d-none'>

    <div class='w-100 d-none d-lg-flex flex-column align-items-center'>
    <router-link to='/about'
    class='categories__category ' >
        <p>О нас</p>
    </router-link >
    <router-link to='/contacts'
    class='categories__category ' >
        <p>Контакты</p>
    </router-link >
    </div>
    </div>
    

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
      Links: state => state.Contacts.SocialSidebar,
      categories: state => state.Inventories.goods,
    }),
    scrollTop() {
      var scroll = new SmoothScroll()
      scroll.animateScroll(0)

    }
  },
  data(){
    return {
      isAbout: false
    }
  }
}
</script>

<style lang='scss'>
  @import '@/vendor/interface.scss';
  .router-link-active{
         background: #6709DE;
       box-shadow: 0px 14px 26px -10px rgba(103, 9, 222, 0.2);
       border-radius: 6px 20px;

     p{
         color: #fff;
       }
}
.categories{
  &__category{
    width: 100%;
  }
}
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
    a{
      &:hover{
        text-decoration: none;
      }
    }
    hr{
      width: 100%;

    }
  }

  @media (max-width: 992px){
    .categories{
      &__category{
        width: 48%;
      }
    }
    .navigation{
      position: relative;
      height: auto;
      background: none;
      width: 100%;
      padding:0;
      padding-top: 100px;
      align-items: center;
      &__wazzup{
        position: fixed;
        width: 52px;
        height: 52px;
        background: #4AAE20;
        border: 1px solid #40A416;
        box-shadow: 0px 6px 12px -3px rgba(221, 221, 221, 0.8);
        border-radius: 12px;
        right: 86px;
      }
      &__logoPic{
          width:175px;
          height: 50px;
          display: block;
      }
      &__logo{
        width:100%;
        // height: 50px;
        position: fixed;
        top:0;
        left:0;
        height: $mobileNavigatorHeight;
        z-index: 95;
        display: flex;
        // justify-content: start;
        // padding: 11px 0;
        background: rgba(255, 255, 255, 1);
        backdrop-filter: blur(20px);
        // margin-bottom: 24px;
        display: flex;
        align-items: center;
        padding-left: 8px;
      }
    }
  }
</style>
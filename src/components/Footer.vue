<template>
  <div class="Footer d-lg-block">
    <div class="w-100 row ml-0 mr-0375">
      <div class="col-lg-5 col-12 d-flex flex-column justify-content-center">
        <h3 class='Footer__title d-lg-block d-none'>Contacts</h3>
        <div v-for='info in Contacts'
        :key=info
        class='Footer__contacts'>
          <p class='Footer__general'>{{info.general}}</p> 
          <p class="Footer__phone">{{info.phone}}</p>
        </div>
        <div class="Footer__links d-flex 
        align-items-center flex-wrap">
          <a class='Footer__link 
          d-flex align-items-center' v-for='link in Links' :key='link' :href="link.link">
            <img :src="link.icon" alt="icon">
            <p>{{link.title}}</p>
          </a>
        </div>
        <p class='Footer__copyright'>Copyright 2021 Creaflower</p>
      </div>
      <div class="pr-0 col-7 d-none d-lg-flex justify-content-end">
        <img src="@/assets/map.png" alt="" class="Footer__map">
      </div>
    </div>
    <div @click='scrollTop()' class="Footer__up d-lg-none 
    d-flex justify-content-center align-items-center">
      <img src="@/assets/up.svg" alt="">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Footer",
  computed:{
    ...mapState({
      Contacts: state => state.Contacts.Contacts,
      Links: state => state.Contacts.SocialFooter
    })
  },
  methods: {
    scrollTop(){
      setTimeout(window.scrollTo(0,0), 150)
      
    }
  }
}
</script>

<style lang='scss'>
 .Footer{
   padding: 0 0 0 40px;
   &__contacts{
     margin-bottom: 24px;
   }
   &__title{
     text-align: start;
   }
   &__general, &__phone{
     text-align: start;
     line-height: 24px;
     width: 100%;
    }
   &__phone{
     font-size: 16px;
     font-weight: 600;
   }
   &__general{
     font-size: 18px;
   }
   &__link{
     width: 143px;
     margin-right: 16px;
     margin-bottom: 16px;
     height: 48px;
     background: rgba(0, 0, 0, 0.05);
     border-radius: 12px;
     padding: 8px 12px;
     outline: none !important;
     &:hover{
       text-decoration: none;
     }
     p{
       margin-bottom: 0;
       color: #000;
       margin-left: 12px;
     }
   }
   &__map{
     object-fit: cover;
     width: 100%;
   }
   &__copyright{
     color:#000;
     text-align: start;
     margin-top: 24px;
   }
 }

 @media (max-width: 1200px){
   .Footer{
     &__phone, &__general{
       width: 75%;
     }
     &__phone{
       font-size: 14px;
     }
     &__general{
       font-size: 16px;
     }
   }
 }

  @media (max-width: 1000px){
   .Footer{
     &__phone, &__general{
       width: 75%;
     }
     &__phone{
       font-size: 12px;
     }
     &__general{
       font-size: 14px;
     }
   }
 }

 @media (max-width:992px){
   .Footer{
     position: relative;
     padding-top: 36px;
     background-color: #000;
     padding-left: 0;
     padding-bottom: 26px;
     
    &__phone, &__general{
     color: #fff;
    }
    &__link{
     background: rgba(255, 255, 255, 0.09);
     margin-right: 12%;
     width: 43%;

     &:nth-child(2n){
       margin-right: 0;
     }
     
     p{
       color:#fff;
     }
    }
    
    &__copyright{
     color:#fff;
     text-align: start;
     margin-top: 24px;
    }
    &__up{
      background: #6709DE;
      box-shadow: 0px 2px 16px 2px rgba(0, 102, 153, 0.24);
      border-radius: 10px;
      width: 44px;
      height: 44px;

      position: absolute;
      bottom: 32px;
      right: 16px;
    }
   }
 }
</style>
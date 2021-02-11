<template>
  <div class="Footer d-lg-block">
    <div class="w-100 row ml-0 mr-0375">
      <div class="col-lg-5 col-12 d-flex flex-column justify-content-center">
        <h3 class='Footer__title d-lg-block d-none'>Contacts</h3>
        <div v-for='info in Contacts'
        :key=info
        class='Footer__contacts'>
          <p class='Footer__general'>{{info.general}}</p> 
          <a :href="'tel:' + info.phone " class="Footer__phone d-block">{{info.phone}}</a>
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
      <div class="Footer__mapWrapper pr-0 col-7 d-none d-lg-flex justify-content-end">
        <!-- <img src="@/assets/map.png" alt="" class="Footer__map"> -->
        <iframe class="Footer__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructor" width="500" height="359" frameborder="0"></iframe>
      </div>
    </div>

    <!-- <go-top class="Footer__up d-lg-none 
    d-flex justify-content-center align-items-center">
    <img src="@/assets/up.svg" alt="">
    </go-top> -->
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
  components:{
  },
  computed:{

    ...mapState({
      Contacts: state => state.Contacts.Contacts,
      Links: state => state.Contacts.SocialFooter
    })
  },
  mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js')
      document.head.appendChild(recaptchaScript)

      let recaptchaScript2 = document.createElement('script')
      recaptchaScript2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/smooth-scroll@12.1.5')
      document.head.appendChild(recaptchaScript2)
  },
  methods: {
    scrollTop(){
      var scroll = new SmoothScroll()
      // setTimeout(window.scrollTo(0,0), 150)
      scroll.animateScroll(0)
      
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
   &__mapWrapper{
    
      border-radius: 12px;
    position: relative;
    &::after{
 background: linear-gradient(89.72deg, #FFFFFF 15.06%, rgba(255, 255, 255, 0) 40.12%);
 position: absolute;
 top: 0;
 left: 0;
 width: 30%;
 height: 100%;
 display: block;
 content: '';
 z-index: 5;
    }
   }
   &__map{
     object-fit: cover;
     width: 100%;
    //  z-index: -1;
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
     &__phone{
       text-decoration: underline;
      //  color: #b5e8ff;
     }
     
    &__phone, &__general{
     color: #fff;
     text-align: start;
     &:hover{
       color: #fff;
     }
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

      position: fixed;
      bottom: 32px;
      right: 16px;
    }
   }
 }
</style>
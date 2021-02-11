<template>
<div class="Contacts d-flex
justify-content-center align-items-center">

<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe>
<!-- <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe> -->
<!-- <a class='Contacts__map' href="https://yandex.ru/maps/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;width=600&amp;height=450&amp;lang=ru_RU" alt="" style="border: 0;" /></a> -->
  <div class="Contacts__info">

    <h2>Contact us</h2>
    <div v-for='info in Contacts'
        :key=info
        class='Footer__contacts'>
      <p class='Footer__general'>{{ info.general }}</p>
      <a :href="'tel:' + info.phone " class="Footer__phone d-block">{{ info.phone }}</a>
    </div>
    <div class='d-flex'>
    <a class='Footer__link 
      d-flex align-items-center' v-for='link in Links' :key='link' :href="link.link">
        <img :src="link.icon" alt="icon">
        <p>{{ link.title }}</p>
    </a>
    </div>



<svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 0H0V24L36 0Z" fill="white"/>
</svg>

  </div>

</div>

</template>

<script>

import {mapState} from 'vuex'
export default {
  computed:{

    ...mapState({
      Contacts: state => state.Contacts.Contacts,
      Links: state => state.Contacts.SocialFooter
    })
  }
}
</script>

<style lang='scss'>
.Contacts{
  position: relative;
  height: 100vh;
  &__info{
    width: 377px;
    // height: 309px;
    background: #fff;
    margin-top: -130px;
    margin-right: -285px;
    position: relative;
    padding: 24px;
    h2{
      color: #000;
      text-align: start;
    }
    svg{
      position: absolute;
      bottom: -20px;
      left: 0;
    }
  }
  &__map{
    width: 100%;
    height: 100vh;
    img{
      width: 100%;
      height: 100%;
    }
  }
  iframe{
    height: 100vh;
    z-index: -1;
    position: absolute;
    width: 100%;
    top:0;
    left:0;
  }

}

  .ymaps-2-1-74-placemark-overlay{
    position: relative;
    &::after{
      position: absolute;
      top:0;
      right:0;
      width: 100px;
      height: 100px;
      background: red;
      content: '';
      display: block;
    }
  }

</style>
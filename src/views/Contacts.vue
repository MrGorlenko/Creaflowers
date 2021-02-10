<template>
<div class="Contacts">

<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe>
<!-- <a class='Contacts__map' href="https://yandex.ru/maps/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Ae792fd065822555c97bfbd0576e0b12e270e7e702d31b248218857825ee63a71&amp;width=600&amp;height=450&amp;lang=ru_RU" alt="" style="border: 0;" /></a> -->
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
<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="about__base">
      <h2>About us</h2>
      <div>
        <p v-for="paragraph in Paragraphs"
        :key='paragraph'>
          {{paragraph}}
        </p>
      </div>
    </div>
  </div>
  <!-- <Footer/> -->
</template>

<script>
import {mapState} from 'vuex'
import Footer from '@/components/Footer.vue'
export default {
  name: 'About',
  computed:{

    ...mapState({
      Contacts: state => state.Contacts.Contacts,
      Links: state => state.Contacts.SocialFooter,
      Paragraphs: state => state.Contacts.AboutUs
    })
  },
  components: {
    Footer
  }
}
</script>

<style lang='scss'>
  .about{
    min-height: 100vh;
    background-image: url('../assets/about_bg.png');
    background-size: cover;
    &__base{
      padding-top: 48px;
      width: 609px;
      margin-left: 103px;
      text-align: start;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(20px);
      min-height: calc(100vh);
      h2{
        margin-bottom: 32px;
      }
    }
  }
</style>
<template>
  <div class='categories d-flex flex-lg-column 
  flex-row flex-lg'>
    <button 
     :class="{'categories__category_active': this.all==true}"
     @click='activateAll()' class="categories__category">
      <p>Все</p>
    </button>
    <!-- :class="{'categories__category_active': this.all==false && goods.isActive==true}"  -->
    <button
    :class="{'categories__category_active': this.all==false && goods.isActive==true}"
    @click='toggleCat(category)' class='categories__category' 
    v-for="(goods, category) in categories" :key="category">
      <p class=''>{{category}}</p>
    </button>
    

    <div>
      <!-- {{nCategories[0]}} -->
      <!-- {{parcing()}} -->
    </div>
    
  </div>
</template>

<script>
import {mapGetters,mapMutations, mapActions, mapState} from 'vuex'
export default {
  name: 'categories',
  computed: {
    ...mapState({
      categories: state => state.Inventories.goods,
      nCategories: state => state.Inventories.Ngoods
    })
  },
  methods: {
    ...mapMutations(['ACTIVATE_CAT', 'ACTIVATE_ALL', 'PARCING']),
    toggleCat(cat){
      this.ACTIVATE_CAT(cat)
      this.all = false
    },
    activateAll(){
      this.ACTIVATE_ALL()
      this.all = true
    },
    parcing(){
      this.PARCING()
    }
  },
  data(){
    return{
      all: true
    }
  }
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
 .categories{
   width: 90%;
   &__category{
     height: 40px;
     padding: 10px;
     background: none;  
     border: none;
     p{
       margin-bottom: 0;
       font-size: 14px;
       line-height: 20px;
       font-family: Inter;
       font-style: normal;
       font-weight: 600;
       text-align: center;
       color: #000000;
     }

     &_active{
       background: #6709DE;
       box-shadow: 0px 14px 26px -10px rgba(103, 9, 222, 0.2);
       border-radius: 6px 20px;

       p{
         color: #fff;
       }
     }
  }
 }

 @media (max-width:992px){
   .categories{
     width:100%;
     flex-wrap: wrap;
     padding: 8px;
     justify-content: space-between;
     background: #f4f4f4;
     padding-top: calc( #{$mobileNavigatorHeight} + 24px) ;
     &__category{
       width:48%;
       height: 40px;
       background: #EBEBF5;
        border-radius: 12px;
        margin-bottom: 8px;
        outline: none !important;
       &_active{
         background: #6709DE;
       }
     }
   }
 }
</style>
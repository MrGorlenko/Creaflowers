<template>
<!-- :class="{'categories__category_active': AllCats==true}" -->
  <div class='categories d-flex flex-lg-column 
  flex-row flex-lg'>
    <!-- <router-link class='w-100' to='/'
    :active="categories__category_active">
    <button  class="w-100 categories__category">
      <p>Все</p>
    </button>
    </router-link> -->
    <!-- :class="{'categories__category_active': this.all==false && goods.isActive==true}"
      -->

    <!-- <button
    :class="{'categories__category_active': AllCats==false && goods.isActive==true}"
    @click='toggleCat(category)' class='categories__category' 
    v-for="(goods, category) in categories" :key="category">
      <p class=''>{{category}}</p>
    </button> -->
    <!-- <router-link class='w-100'
    v-for="(goods, category) in categories" :key="category"
    :to="/Category/ + category"
    :active="categories__category_active"
     >
      <button
        :class="{'categories__category_active': AllCats==false && goods.isActive==true}"
        @click='toggleCat(category)' class='w-100 categories__category' 
        >
        <p class=''>{{category}}</p>
      </button>
    </router-link> -->
    

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
      nCategories: state => state.Inventories.Ngoods,
      AllCats: state => state.Interface.AllCats
    })
  },
  methods: {
    ...mapMutations(['ACTIVATE_CAT', 'ACTIVATE_ALL', 'PARCING',
    'ACTIVATE_ALL_CATS', 'DEACTIVATE_ALL_CATS', 'SELECT_CATEGORY']),
    selectCat(cat, catName){
      let arr = [cat, catName]
      this.SELECT_CATEGORY(arr)
      
    },
    toggleCat(cat){
      this.ACTIVATE_CAT(cat)
      this.all = false
    },
    activateAll(){
      this.ACTIVATE_ALL()
      this.all = true
      window.location.href = '/'
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
.router-link-active{
         background: #6709DE;
       box-shadow: 0px 14px 26px -10px rgba(103, 9, 222, 0.2);
       border-radius: 6px 20px;

    button   p{
         color: #fff;
       }
}
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
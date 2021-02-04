<template>
  <div 
    v-if='condition'
    class="Select d-flex justify-content-center align-items-center">
      <div class="Select__window">
        <h3 class="Select__title">{{title}}</h3>
        <!-- <div
        @click="functions"
         v-for="size in modal.price_size" 
          :key="size"
         class='d-flex justify-content-between align-items-center Select__item'>
          <p>{{size[1]}}</p> <p> {{size[0]}} руб.
             <input :value='size' v-model='picked' class='Select__radio' type="radio">
           </p> </div> -->
      </div>
    </div>
    <!-- "togglePrice(size[0]); toggleSize(size[1]); deactivateSelect()" -->
</template>

<script>
export default {
  name: 'Select',
  props: [
    'condition', 'title',
    'functions', 
  ]
}
</script>

<style lang='scss'>
  .Select{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1050;
    background-color: rgba(0,0,0,.4);
    &__window{
      background: #FFFFFF;
      box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.25);
      border-radius: 12px;  
      max-width: 342px;
      width:100%;
      height: auto;
      padding: 16px;
      
    }
    &__title{
      color: #000000;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
    }
  }

</style>
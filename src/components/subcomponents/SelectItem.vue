<template>
  <div
    @click="functions"
    class='d-flex justify-content-between align-items-center Select__item'>
      <p>{{value1}}</p> <p> {{value2}} {{currency}} 
        <input :value='value' v-model='model' class='Select__radio' type="radio">
      </p> 
  </div>
</template>

<script>
export default {
  name: 'SelectItem',
  props: [
    'functions', 'value1', 'value2' , 'value', 'model', 'currency'
  ]
}
</script>

<style lang='scss'>
  .Select{
    &__item{
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
      padding: 20px 0;
      p{
        margin-bottom: 0;
      }
    }
  }
</style>
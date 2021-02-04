<template>
  <form id='form' class="Form">
    <p class='Form__title'>Order</p>
    <!-- <select name="" id="">
      <option value="">Apple Pay</option>
    </select> -->
    <div class="Form__select">
      <select class='Form__input' name="" id="">
        <option @click='choseCarrier()' value="carrier">Доставка курьером</option>
        <option @click='chosePickup()' value="pickup">Самовывоз</option>
      </select>
    </div>
    <div class="Form__select">
      <select class='Form__input' name="" id="">
        <option @click='orderForMe()' value="">Заказ себе</option>
        <option @click='orderForSomeone()' value="">Заказ кому-то</option>
      </select>
    </div>

    <input class='Form__input '
     v-model='OrdererName' 
     type="text" 
     @input="getTheOrdererName(OrdererName);"
     placeholder="Ваше имя">

    

    <input class='Form__input'
    v-model='ReceiverName' 
    v-if='Present'  
    type="text"
    @input="getTheReceiverName(ReceiverName)"
    placeholder="Кому">



    <div class='phone Form__phone d-flex align-items-center'>
      <p class='Form__numberHolder'>+7</p>
    <input 
      placeholder="Введите ваш номер" 
      v-model="phone" type="phone"
      maxlength=14
      @input="acceptNumber(); getTheOrdererNumber(phone)">
    </div>

    


     <div v-if='Present && Carrier'
      class='Form__phone phone d-flex align-items-center'>
      <p class='Form__numberHolder'>+7</p>
      <input placeholder="Введите номер получателя" 
        v-model="receiverPhone" type="text" 
        @input="acceptReceiverNumber();
        getTheOrdererNumber(receiverPhone)">
    </div>

    <div class='d-flex justify-content-between'>
      <input 
      class='Form__date'
      @input='setTheDate(date)' 
      type="date" v-model='date'>
      <input 
      class='Form__time'
      @input='setTheTime(time)'  
      type="time" v-model='time'>
    </div>

     <div v-if='Carrier'>
      <input class='Form__input' v-if='unknownAdress == false' @input="getTheAddress(address)"
        v-model='address' type="text" placeholder=" Адрес">
      <div v-else>
        <input class='Form__input' disabled type="text" placeholder="Узнаем адрес у получателя">
      </div>
      <div class='d-flex align-items-center Form__unknownAdress'>
        <p v-if='Carrier && Present'>Узнать адрес у получателя</p>
        <input @click='callForAdress(address)' v-if='Carrier && Present'  type="checkbox">
      </div>
      
     </div>
     <div  v-else>
       <p style='text-align:start'>Выберите адрес самовывоза</p>
      <div class="Form__select">
      <select class='Form__input'
       placeholder=" Адрес"  v-model="address"  name="" id="">
       <!-- <option disabled>Выберите Адрес</option> -->
       <option @click='getTheAddress(address)' 
       v-for='address in AdressOfPickUp' 
       :key='address' :value='address'>
         {{address}}
       </option>
     </select>
     </div>
     </div>

     <!-- Адрес {{AddressOfDelivery}} -->
     
     <textarea class='Form__comments' placeholder="Комментарий" name="" id="" cols="30" rows="10"></textarea>

    <div class="Form__submitHolder d-flex justify-content-center
    align-items-center">
      <button class='Form__submit' @click="Final()" v-if='TotalValid==true'>
        Заказать на сумму {{Result}}
      </button>
      <button class='Form__submit Form__submit_passive' disabled v-else>
        Заказать на сумму {{Result}}
      </button>
    </div>

    <div style='display: none'>
      {{Validation()}}
    </div>
  </form>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'Form',
  el: '#form',
    computed: {
    ...mapState({
      Result: state => state.Inventories.finalPrice,
      Carrier: state => state.Form.carrier,
      Present: state => state.Form.present,
      OrdererNameState: state => state.Form.OrdererName,
      AdressOfPickUp: state => state.Form.addressOfPickUp,
      AddressOfDelivery: state => state.Form.address,
      Goods: state => state.Inventories.basket,
    }),
  },
  methods: {
    ...mapMutations(['CHOSE_CARRIER', 'CHOSE_PICKUP',
     'ORDER_FOR_ME', 'ORDER_FOR_SOMEONE', 'ORDERER_NAME',
      'RECEIVER_NAME', 'ORDERER_PHONE', 'RECEIVER_PHONE',
      'SET_DATE', 'SET_TIME', 'GET_ADDRESS', 'GET_COMMENT',
      'TOTAL_VALIDATION', 'RECEIVER_NON_SELECT', 'RECEIVER_SELECT']),
    choseCarrier(){
      this.CHOSE_CARRIER()
    },
    chosePickup(){
      this.CHOSE_PICKUP()
    },
    orderForMe(){
      this.ORDER_FOR_ME()
    },
    orderForSomeone(){
      this.ORDER_FOR_SOMEONE()
    },
    formatThePhone(e){
      var key = e.key
      if( !/^\d+/g.test(key)){
        e.PreventDefault()
      }
    },
    callForAdress(address){
      
      if (this.counter % 2 == 0){
        this.unknownAdress = true
        this.counter ++
        this.GET_ADDRESS('Узнать у получателя')
        this.unknownAdress = true

      } else {
        this.unknownAdress = false
        this.counter ++
        this.GET_ADDRESS(address)
      }
    },

    // ВОТ ЭТО ЛЕТИТ В STATE
    getTheOrdererName(name){
      this.ORDERER_NAME(name)
    },

    getTheReceiverName(name){
      this.RECEIVER_NAME(name)
    },

    getTheOrdererNumber(phone){
      this.ORDERER_PHONE(phone)
    },

    getTheReceiverNumber(phone){
      this.RECEIVER_PHONE(phone)
    },

    setTheDate(date){
      this.SET_DATE(date)
    },

    setTheTime(time){
      this.SET_TIME(time)
    },
    
    getTheAddress(address){
      this.GET_ADDRESS(address)
    },

    getTheComment(comment){
      this.GET_COMMENT(comment)
    },
    // ВОТ ЭТО ЛЕТИТ В STATE

    // ВАЛИДАЦИЯ

    Validation(){
      if (this.Carrier == true && this.Present == false) {
        if (this.OrdererName.length > 1 && this.phone.length == 14
            && this.date.length != 0 && this.time.length != 0 
            && this.address.length !=0 ) {
          return true,  this.TotalValid = true
        } else {
          return false,  this.TotalValid = false
        }
      }

      else if (this.Carrier == true && this.Present == true){
        if (this.OrdererName.length > 1 && this.ReceiverName.length > 2
            && this.phone.length == 14 && this.receiverPhone.length==14
            && this.date.length != 0 && this.time.length != 0 
            &&( this.address.length !=0  || this.unknownAdress == true)) {
              return true,  this.TotalValid = true
            } else {
              return false,  this.TotalValid = false
            }
      } 
      else if (this.Carrier == false && this.Present == true){
        if (this.OrdererName.length > 1 && this.ReceiverName.length > 2
            && this.phone.length == 14 
            && this.date.length != 0 && this.time.length != 0 
            && this.address.length !=0  ) {
              return true,  this.TotalValid = true
            } else {
              return false,  this.TotalValid = false
            }
      }       

      else if (this.Carrier == false && this.Present == false){
        if (this.OrdererName.length > 1 
            && this.phone.length == 14 
            && this.date.length != 0 && this.time.length != 0 
            && this.address.length !=0  ) {
              return true,  this.TotalValid = true
            } else {
              return false,  this.TotalValid = false
            }
      }
    },

    Final(){
      let result = [],
      mesne = {},
      customer = {}

      customer.present = this.Present
      customer.carrier = this.Carrier

      customer.name = this.OrdererName
      customer.name_of_receiver = this.ReceiverName
      customer.phone = this.phone
      customer.receiverPhone = this.receiverPhone

      customer.dateOfDelivery = this.date
      customer.timeOfDelivery = this.time
      customer.address = this.address

      result.push(customer)

      this.Goods.forEach(function(good){
        mesne.title = good[0]
        mesne.PricePerOne = good[1]
        mesne.Amount = good[3]
        mesne.Total = good[3] * good[1]
        result.push(mesne)
        mesne = {}
      })

      // ВОТ ГДЕ ТО ТУТ ДОЛЖНА ПРОИСХОДИТЬ ОПЛАТА ТОВАРА
      // ДЕНЬГАМИ И ПОТОМ ЗАПРОС УЛЕТАЕТ НА СЕРВЕР


      result.push({TOTAL: this.Result})
      console.log(result)
      alert('Спасибо! Покупка оформлена!')
    },

    // ВАЛИДАЦИЯ


    acceptNumber() {
    	var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone = !x[2] ? x[1] :  '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    acceptReceiverNumber() {
    	var x = this.receiverPhone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.receiverPhone = !x[2] ? x[1] :  '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
  },
  data(){
    return{
      OrdererName: '',
      ReceiverName: '',
      phone: '',
      receiverPhone: '',
      // value: '',
      date: '',
      time: '',
      address: '',
      unknownAdress: false, 
      OrdererNameValid: false,
      // TotalValid: false
      TotalValid: false,

      counter : 0
    }
  }
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';
  .phone {
    span{
      background: grey;
    }
  }
  .Form{
    width: calc(#{$innerBasketWidth} - 20px) ;
    input{
      outline: none !important;
    }
    position: relative;
    &__title{
      letter-spacing: 0.02em;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      text-align: start;
      color: #191919;
      width: 520px;
      margin-left: 20px;
    }
    &__date, &__time{
      height: 64px;
      border-radius: 6px;
      border: 1px solid #E1E1E1;
      margin-bottom: 16px;
    }
    &__date{
      width: 67%;
    }
    &__time{
      width: 30%;
    }
    &__submitHolder{
      position: fixed;
      bottom: 0;
      left:0;
      width: 100%;
      z-index: 100;
    }
    &__input{
      width: 100%;
      border: 1px solid #E1E1E1;
      border-radius: 6px;
      height: 64px;
      margin-bottom: 16px;
      color: #000;
    }
    &__unknownAdress{
      p{
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
    &__comments{
      width: 100%;
      border: 1px solid #E1E1E1;
      border-radius: 6px;
      margin-bottom: 52px;
      margin-top: 16px;
    }
    &__select{
      @include Select;
      height: 64px;
      margin-bottom: 16px;
      select{
        border: 1px solid #E1E1E1;
      }
      &::after{
        content: url('../../assets/arrow.svg');
      }
    }
    &__phone{
      height: 64px;
       margin-bottom: 16px;
      input{
        height: 64px;
        width: calc(100% - 25px);
        border: 1px solid #E1E1E1;
        border-radius: 0 6px 6px 0;
      }
    }
    &__numberHolder{
      display: flex;
      align-items: center;
      height: 64px;
      width: 25px;
      background: #BDBDBD;
      margin-bottom: 0;
      border-radius: 6px 0 0 6px;
    }
    &__submit{
      @include SubmitButton;
      width: calc(#{$innerBasketWidth}) ;
      margin-left: -17px;
      &_passive{
        background: #BDBDBD;
        &:hover{
          background: #BDBDBD;
        }
      }
    }
  }

  @media (max-width:992px){
    .Form{
      width:100%;
      &__title{
        margin-left: 0;
        width: 100%;
      }
      &__submitHolder{
        bottom: 25px;
      }
      &__comments{
        margin-bottom: 97px;
      }
      &__submit{
        width: calc(100% - 48px);
        margin-left: 0;
      }
      &__unknownAdress{
        height: 25px;
      }
    }
  }
</style>
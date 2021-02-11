<template>
  <form id='form' class="Form"  method="post">
    <p class='Form__title'>Order</p>
    <!-- <select name="" id="">
      <option value="">Apple Pay</option>
    </select> -->

    <!-- <custom-input></custom-input> -->
    <!-- <CustomInput/> -->


    <div
        @click='activateDeliveryModal()'
        class="Form__select  ModalMobile__select">
      <p class='ModalMobile__selectSize'>
        {{ ReceiveType }}
      </p>
      <label class='ModalMobile__label'>Выберите способ доставки</label>
    </div>

    <!-- Выбор доставки -->
    <div
        v-if='DeliveryModal==true'
        class="Select d-flex justify-content-center align-items-center">
      <div class="Select__window">
        <h3 class="Select__title">Способ доставки</h3>
        <SelectItem @click='choseCarrier(); 
        deactivateDelivaryModal()' value='carrier' value1='Доставка курьером'>
        </SelectItem>

        <SelectItem @click='chosePickup(); 
        deactivateDelivaryModal();setPickUpAddress()' value='pickup' value1='Самовывоз'>
        </SelectItem>
      </div>
    </div>
    <!-- Выбор доставки -->


    <!-- <div class="d-lg-block d-none Form__select">
      <select class='Form__input' name="" id="">
        <option @click='orderForMe()' value="">Заказ себе</option>
        <option @click='orderForSomeone()' value="">Заказ кому-то</option>
      </select>
    </div> -->


    <div
        @click='activateOrderModal()'
        class="Form__select ModalMobile__select">
      <p class='ModalMobile__selectSize'>
        {{ OrderType }}
      </p>
      <label class='ModalMobile__label'>Выберите, для кого заказ? </label>
    </div>


    <!-- КОМУ -->
    <div
        v-if='OrderModal==true'
        class="Select d-flex justify-content-center align-items-center">
      <div class="Select__window">
        <h3 class="Select__title">Получатель</h3>
        <SelectItem @click='orderForMe(); deactivateOrderModal()'
                    value='ForMe' value1='Заказ себе'>
        </SelectItem>
        <SelectItem @click='orderForSomeone(); deactivateOrderModal()'
                    value='ForSomeone' value1='Заказ кому-то'>
        </SelectItem>
      </div>
    </div>
    <!-- КОМУ -->


    <div class="Form__input CustomInput d-flex flex-column justify-content-end">
      <label
          :class="{'CustomInput__label_focused': nameInput==true,
   'CustomInput__label_blur': nameInput==false}"
          class='CustomInput__label' for="">Ваше имя</label>
      <input
          @focus='onFocusName'
          @blur="onBlurName"
          v-model='OrdererName'
          @input="getTheOrdererName(OrdererName);"
          class='CustomInput__input'
      >
    </div>


    <div v-if='Present'
         class="Form__input CustomInput d-flex flex-column justify-content-end">
      <label
          :class="{'CustomInput__label_focused': receiverInput==true,
   'CustomInput__label_blur': receiverInput==false}"
          class='CustomInput__label' for="">Имя получателя</label>
      <input
          @focus='onFocusReceiver'
          @blur="onBlurReceiver"
          v-model='ReceiverName'
          @input="getTheReceiverName(ReceiverName)"
          class='CustomInput__input'
      >
    </div>


    <div class='phone Form__input d-flex align-items-end'>
      <div class='Form__numberHolder d-flex justify-content-center
      align-items-center'>
        <span class='d-block'>+7</span>
      </div>


      <div class="CustomInput d-flex flex-column justify-content-end">
        <label
            :class="{'CustomInput__label_focused': phoneInput==true,
      'CustomInput__label_blur': phoneInput==false}"
            class='CustomInput__label' for="">Ваш номер телефона</label>
        <input
            @focus='onFocusPhone'
            @blur="onBlurPhone"
            v-model='phone'
            @input="acceptNumber(); getTheOrdererNumber(phone)"
            class='CustomInput__input'
            type='tel'
        >
      </div>

    </div>

    <div v-if='Present && Carrier'
         class='phone Form__input d-flex align-items-end'>
      <p class='Form__numberHolder'>+7</p>

      <div class="CustomInput d-flex flex-column justify-content-end">
        <label
            :class="{'CustomInput__label_focused': receiverPhoneInput==true,
      'CustomInput__label_blur': receiverPhoneInput==false}"
            class='CustomInput__label' for="">Номер телефона получателя</label>
        <input
            @focus='onFocusPhoneReceiver'
            @blur="onBlurPhoneReceiver"
            v-model='receiverPhone'
            @input="acceptReceiverNumber();getTheOrdererNumber(receiverPhone)"
            class='CustomInput__input'
            type='tel'
        >
      </div>

    </div>

    <div class='d-none d-lg-flex justify-content-between'>
      <input
          class='Form__date'
          @input='setTheDate(date)'
          type="date" v-model='date'
          placeholder="дата">
      <input
          class='Form__time'
          @input='setTheTime(time)'
          type="time" v-model='time'
          placeholder="Время">
    </div>

    <div class=' d-flex d-lg-none justify-content-between CustomInput__dateTime'>
      <div class=" CustomInput d-flex flex-column justify-content-end">
        <label
            :class="{'CustomInput__label_focused': dateInput==true,
        'CustomInput__label_blur': dateInput==false}"
            class='CustomInput__label' for="">Дата</label>
        <label class='CustomInput__date' v-if='date!=""' for="">{{ date }}</label>
        <input
        
            @focus='onFocusDate'
            @blur="onBlurDate"
            v-model='date'
            type="date"
            @input="setTheDate(date);"
            class='CustomInput__input CustomInput__input_date'
        >
      </div>

      <div class=" CustomInput d-flex flex-column justify-content-end">
        <label
            :class="{'CustomInput__label_focused': timeInput==true,
        'CustomInput__label_blur': timeInput==false}"
        class='CustomInput__label' for="">Время</label>
        <label class='CustomInput__date' v-if='time!=""' for="">{{time}}</label>
        <input 
          @focus='onFocusTime'
          @blur="onBlurTime"
          v-model='time' 
          type="time"
          @input="setTheTime(time);"
          class='CustomInput__input CustomInput__input_time'
          placeholder="Время"
        >
      </div>

    </div>

    <div v-if='Carrier'>

      <div
          v-if='unknownAdress == false'
          class="Form__input CustomInput d-flex flex-column justify-content-end">
        <label
            :class="{'CustomInput__label_focused': addressInput==true,
      'CustomInput__label_blur': addressInput==false}"
            class='CustomInput__label' for="">Адрес</label>
        <input
            @focus='onFocusAddress'
            @blur="onBlurAddress"
            v-model='address'
            @input="getTheAddress(address)"
            class='CustomInput__input'
            type='phone'
        >
      </div>

      <div
          v-else
          class="Form__input CustomInput d-flex flex-column justify-content-end">
        <label
            class='CustomInput__label CustomInput__label_blur' for="">Узнаем адрес у получателя</label>
        <input
            disabled
            class='CustomInput__input'
            type='phone'
        >
      </div>

      <!--
            <input class='Form__input' v-if='unknownAdress == false' @input="getTheAddress(address)"
              v-model='address' type="text" placeholder=" Адрес">
            <div v-else>
              <input class='Form__input' disabled type="text" placeholder="Узнаем адрес у получателя">
            </div> -->



      <div v-if='Carrier && Present' class='d-flex align-items-center Form__unknownAdress'>
        <p :class="{'d-none': !Carrier && !Present}" v-if='Carrier && Present'>Узнать адрес у получателя</p>
        <input :class="{'d-none': !Carrier && !Present}" @click='callForAdress(address)' v-if='Carrier && Present'  type="checkbox">
      </div>

    </div>
    <div v-else>

      <div
          @click='activatePickUpModal()'
          class="Form__select ModalMobile__select">
        <p class='ModalMobile__selectSize'>
          {{ PickUpAdress }}
        </p>
        <label class='ModalMobile__label'>Выберите адрес самовывоза</label>
      </div>

    </div>

    <div
        v-if='PickUpModal==true'
        class="Select d-flex justify-content-center align-items-center">
      <div class="Select__window">
        <h3 class="Select__title">Адрес самовывоза</h3>
        <SelectItem
            @click='getTheAddress(address);deactivatePickUpModal();selectTheAddress(address) '
            v-for='address in AdressOfPickUp'
            :key='address'
            :value='address'
            :value1='address'
        ></SelectItem>
      </div>
    </div>


    <textarea class='Form__comments' placeholder="Комментарий" name="" id="" cols="30" rows="10"></textarea>

    <div class="Form__submitHolder d-flex justify-content-center
    align-items-center">
      <button class='Form__submit' @click="Final(); addOrder()" v-if='TotalValid==true'>
        Заказать на сумму {{ Result }}
      </button>
      <button class='Form__submit Form__submit_passive' disabled v-else>
        Заказать на сумму {{ Result }}
      </button>
    </div>

    <div style='display: none'>
      {{ Validation() }}
    </div>
  </form>
</template>

<script>
import SelectItem from '@/components/subcomponents/SelectItem.vue'
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import axios from "axios";

export default {
  name: 'Form',
  el: '#form',
  components: {
    SelectItem,
  },
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
    selectTheAddress(address) {
      this.PickUpAdress = address
    },

    activatePickUpModal() {
      this.PickUpModal = true
    },

    deactivatePickUpModal() {
      this.PickUpModal = false
    },


    activateDeliveryModal() {
      this.DeliveryModal = true
    },

    deactivateDelivaryModal() {
      this.DeliveryModal = false
    },


    activateOrderModal() {
      this.OrderModal = true
    },

    deactivateOrderModal() {
      this.OrderModal = false
    },

    ...mapMutations(['CHOSE_CARRIER', 'CHOSE_PICKUP',
      'ORDER_FOR_ME', 'ORDER_FOR_SOMEONE', 'ORDERER_NAME',
      'RECEIVER_NAME', 'ORDERER_PHONE', 'RECEIVER_PHONE',
      'SET_DATE', 'SET_TIME', 'GET_ADDRESS', 'GET_COMMENT',
      'TOTAL_VALIDATION', 'RECEIVER_NON_SELECT', 'RECEIVER_SELECT',
      'SET_ADDRESS_OF_PICK_UP', 'LABEL_ACTIVE', 'LABEL_PASSIVE']),

    onFocusName() {

      this.nameInput = true
    },

    onBlurName() {
      if (this.OrdererName == '')
        this.nameInput = false
    },

    onFocusReceiver() {
      this.receiverInput = true
    },

    onBlurReceiver() {
      if (this.ReceiverName == '')
        this.receiverInput = false
    },

    onFocusPhone() {
      this.phoneInput = true
    },
    onBlurPhone() {
      if (this.phone == '')
        this.phoneInput = false
    },

    onFocusPhoneReceiver() {
      this.receiverPhoneInput = true
    },
    onBlurPhoneReceiver() {
      if (this.receiverPhone == '')
        this.receiverPhoneInput = false
    },

    onFocusAddress() {
      this.addressInput = true
    },


    onBlurAddress() {
      if (this.address == '')
        this.addressInput = false
    },

    onFocusDate() {
      this.dateInput = true
    },

    onBlurDate() {
      if (this.date == '')
        this.dateInput = false
    },

    onFocusTime() {
      this.timeInput = true
    },

    onBlurTime() {
      if (this.time == '')
        this.timeInput = false
    },

    choseCarrier() {
      this.CHOSE_CARRIER()
      this.ReceiveType = 'Курьером'
    },
    chosePickup() {
      this.CHOSE_PICKUP(),
          this.ReceiveType = 'Самовывоз'
    },
    setPickUpAddress() {
      // this.SET_ADDRESS_OF_PICK_UP()
      this.PickUpAdress = this.AdressOfPickUp[0]
    },
    orderForMe() {
      this.ORDER_FOR_ME()
      this.OrderType = 'Заказ себе'
    },
    orderForSomeone() {
      this.ORDER_FOR_SOMEONE()
      this.OrderType = 'Заказ кому-то'
    },
    formatThePhone(e) {
      var key = e.key
      if (!/^\d+/g.test(key)) {
        e.PreventDefault()
      }
    },
    callForAdress(address) {

      if (this.counter % 2 == 0) {
        this.unknownAdress = true
        this.counter++
        this.GET_ADDRESS('Узнать у получателя')
        this.unknownAdress = true

      } else {
        this.unknownAdress = false
        this.counter++
        this.GET_ADDRESS(address)
      }
    },

    // ВОТ ЭТО ЛЕТИТ В STATE
    getTheOrdererName(name) {
      this.ORDERER_NAME(name)
    },

    getTheReceiverName(name) {
      this.RECEIVER_NAME(name)
    },

    getTheOrdererNumber(phone) {
      this.ORDERER_PHONE(phone)
    },

    getTheReceiverNumber(phone) {
      this.RECEIVER_PHONE(phone)
    },

    setTheDate(date) {
      this.SET_DATE(date)
    },

    setTheTime(time) {
      this.SET_TIME(time)
    },

    getTheAddress(address) {
      this.GET_ADDRESS(address)
    },

    getTheComment(comment) {
      this.GET_COMMENT(comment)
    },
    // ВОТ ЭТО ЛЕТИТ В STATE


    // ВАЛИДАЦИЯ

    Validation() {
      if (this.Carrier == true && this.Present == false) {
        if (this.OrdererName.length > 1 && this.phone.length == 14
            && this.date.length != 0 && this.time.length != 0
            && this.address.length != 0) {
          return true, this.TotalValid = true
        } else {
          return false, this.TotalValid = false
        }
      } else if (this.Carrier == true && this.Present == true) {
        if (this.OrdererName.length > 1 && this.ReceiverName.length > 2
            && this.phone.length == 14 && this.receiverPhone.length == 14
            && this.date.length != 0 && this.time.length != 0
            && (this.address.length != 0 || this.unknownAdress == true)) {
          return true, this.TotalValid = true
        } else {
          return false, this.TotalValid = false
        }
      } else if (this.Carrier == false && this.Present == true) {
        if (this.OrdererName.length > 1 && this.ReceiverName.length > 2
            && this.phone.length == 14
            && this.date.length != 0 && this.time.length != 0
            && this.address.length != 0) {
          return true, this.TotalValid = true
        } else {
          return false, this.TotalValid = false
        }
      } else if (this.Carrier == false && this.Present == false) {
        if (this.OrdererName.length > 1
            && this.phone.length == 14
            && this.date.length != 0 && this.time.length != 0
            && this.address.length != 0) {
          return true, this.TotalValid = true
        } else {
          return false, this.TotalValid = false
        }
      }
    },

    Final() {
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

      this.Goods.forEach(function (good) {
        mesne.title = good[0]
        mesne.PricePerOne = good[1]
        mesne.Amount = good[3]
        mesne.Total = good[3] * good[1]
        result.push(mesne)
        mesne = {}
        console.log(good)
      })

      // ВОТ ГДЕ ТО ТУТ ДОЛЖНА ПРОИСХОДИТЬ ОПЛАТА ТОВАРА
      // ДЕНЬГАМИ И ПОТОМ ЗАПРОС УЛЕТАЕТ НА СЕРВЕР


      result.push({TOTAL: this.Result})
      console.log(result)
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/order/flowers/create/',
        data: {
          goods: result
        }
      })
          .then(res => console.log(res))
          .catch((error) => {
            console.log(error)
          })
      alert('Спасибо! Покупка оформлена!')
    },
    addOrder() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/orders/create/',
        data: {
          carrier: this.Carrier,
          present: this.Present,
          name: this.OrdererName,
          receiver_name: this.ReceiverName,
          phone: this.phone,
          receiver_phone: this.receiverPhone,
          date: this.date,
          time: this.time,
          address: this.address,
          comments: this.comments,
          confirm_address: this.confirm_address,
          total: this.Result,

        }
      })
          .then(res => console.log(res))
          .catch((error) => {
            console.log(error)
          })
    },


    // ВАЛИДАЦИЯ


    acceptNumber() {
      var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    acceptReceiverNumber() {
      var x = this.receiverPhone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.receiverPhone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }


  },
  data() {
    return {
      timeInput: false,
      dateInput: false,
      addressInput: false,
      phoneInput: false,
      receiverPhoneInput: false,
      receiverInput: false,
      nameInput: false,

      PickUpAdress: '',
      OrderType: 'Заказ себе',
      ReceiveType: 'Курьером',
      PickUpModal: false,
      OrderModal: false,
      DeliveryModal: false,
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

      counter: 0
    }
  }
}
</script>

<style lang='scss'>
@import '@/vendor/interface.scss';

.CustomInput__dateTime {
  .CustomInput:first-child {
    width: 70%;
  }

  .CustomInput:last-child {
    width: 20%;
  }
}

.CustomInput {
  position: relative;
  width: 100%;
  height: 56px;
  min-height: 56px;


  &__dateTime{
    input{
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      // background: #fff;
      color: #fff;
    }

    // label{
    //   z-index: -1;
    // }
  }

  &__date {
    position: absolute;
    transition: .2s ease;
    left: 16px;
    bottom: 5px;
    color: #000;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  }

  &__label {
    position: absolute;
    margin-bottom: 0;
    transition: .2s ease;
    left: 16px;

    &_blur {
      bottom: 5px;
      color: #000000;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    &_focused {
      bottom: 37px;
      color: #A4A4A4;
      font-size: 13px;
      line-height: 20px;
    }
  }

  &__input {
    width: 100%;
    border: none;
    padding-left: 16px;
    height: 100%;
    margin-top: 40%;
    // height: 64px;
    // border: 1px solid rgba(0, 0, 0, 0.5);
    // border-radius: 10px;
    // border-bottom: 1px solid rgba(0,0,0,.25);
    z-index: 10;
    background: none;
  }
}

.phone {
  span {
    background: none;
  }
  
  label {
    left: 25px;
    line-height: 17px;
  }

  input {
    padding-left: 25px;
  }
}

  .Form{
    width: calc(#{$innerBasketWidth} - 20px) ;
    input{
      outline: none !important;
      // border-radius: 0 !important;
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
      border-radius: 0px;
      // border: 1px solid #E1E1E1;
      margin-bottom: 16px;
      background: none;
    }
    &__date, &__time{
      border: none;
      border-bottom: 1px solid rgba(0,0,0,.25)
      // background: none;
      // display: flex;
      // justify-content: center;
      // align-items: center;
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
      // width: 100%;
      border: 1px solid #E1E1E1;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom: 16px;
      // color: #000;
    }
    &__unknownAdress{
      p{
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
  

  &__comments {
    width: 100%;
    border: 1px solid #E1E1E1;
    border-radius: 6px;
    margin-bottom: 52px;
    margin-top: 16px;
  }

  &__select {
    @include Select;
    height: 64px;
    margin-bottom: 16px;

    select {
      border: 1px solid #E1E1E1;
      border-radius: 6px;
      margin-bottom: 52px;
      margin-top: 0px;

    }

    &::after {
      content: url('../../assets/arrow.svg');
    }
  }

  &__phone {
    height: 64px;
    margin-bottom: 16px;

    input {
      height: 64px;
      width: calc(100% - 25px);
      border: 1px solid #E1E1E1;
      border-radius: 0 6px 6px 0;
    }
  }

  &__numberHolder {
    display: flex;
    align-items: end;
    // min-height: 48px;
    padding-bottom: 0px;
    position: absolute;
    width: 25px;
    min-height: 27px;
    // background: #BDBDBD;
    margin-bottom: 0;
    color: #000;
    font-weight: 600;
  }

  &__submit {
    @include SubmitButton;
    width: calc(#{$innerBasketWidth} - 20px);
    // margin-left: -17px;
    &_passive {
      background: #BDBDBD;

      &:hover {
        background: #BDBDBD;
      }
    }
  }
}

@media (max-width: 992px) {
  input[type="date"]:focus::before,
  input[type="date"]:valid::before {
    content: "";
  }
  .datetime-input-edit-wrapper {
    display: none !important;
  }
  input[type="date"], input[type="time"] {
    color: rgba(255, 255, 255, 0);
  }
  .CustomInput{
    &__dateTime{
      margin-bottom: 16px;
    }
    &__input{
      &_time, &_date{
        // margin-bottom: 16px;
        height: 56px;
        margin-top: 0;
      }
    }
  }
  .Form {
    width: 100%;

    &__title {
      margin-left: 0;
      width: 100%;
    }

    &__submitHolder {
      bottom: 25px;
    }

    &__comments {
      margin-bottom: 97px;
    }

    &__submit {
      width: calc(100% - 48px);
      margin-left: 0;
    }

    &__unknownAdress {
      height: 25px;
    }
    &__date, &__time{
      margin-bottom: 16px;
      height: 100%;
    }
    &__input{
      // width: 100%;
      border: 1px solid #E1E1E1;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom: 16px;
      // color: #000;
    }
  }
}
</style>
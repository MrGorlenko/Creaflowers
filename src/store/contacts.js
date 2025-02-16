const Contacts = {
  state: {
    Contacts:[
      {
        general: '110000, Москва, Адрес: Рижская площадь, 9, стр. 1',
        phone: '+7(951)-567-72-66'
      },
    ],
    SocialFooter: [
      {
        title: 'Telegram',
        icon: require('@/assets/telegram.svg'),
        link: 'tg://resolve?domain=creatumtg'
      },
      {
        title: 'Instagram',
        icon: require('@/assets/Instagram.svg'),
        link: 'http://instagram.com/creatum.flowers'
      }
    ],
    SocialSidebar: [
      {
        title: 'Wazzup',
        icon: require('@/assets/WazzupSide.svg'),
        link: 'https://api.whatsapp.com/send?phone=79515677266'
      },
      {
        title: 'Insta',
        icon: require('@/assets/InsraSide.svg'),
        link: 'http://instagram.com/creatum.flowers'
      }
    ],
    AboutUs: [
      'Однажды мы потратили на выбор и заказ цветов больше 5 минут, и поняли что за это время можно переделать большое количество задач.',
      'Так зародилась идея Creatum flowers  - сервиса, где время заказа занимает меньше минуты.',
      'Мы оставили всего 20 крутых позиций на разный вкус, чтобы вам было максимально просто и удобно.'
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
}

export default Contacts;
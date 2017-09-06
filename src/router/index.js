import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)



import myInfo from '../views/My/my-info'
import myPassword from '../views/My/my-password'
import myCenter from '../views/My/my-center'

import my from '../views/My/my'
// 资金管理
import order from "../views/Order/order"
import hahaMoney from "../views/Order/my_money"
import aliPay from "../views/Order/aliPay"
import handPay from "../views/Order/handPay"


import todayBuyColor from "../views/today/buy-color"
import todayWinning from "../views/today/winning"
// import regist from "../components/regist/regist"
import myHistroy from '../views/My/my-histroy'

import passwordZ from "../views/password/password-z"
import passwordD from "../views/password/password-d"
import myService from '../views/My/my-service'
import trend     from "../views/trend/trend"

export default new Router({
  routes: [
    {
      path: '/index',
      component: require('../views/Index/index.vue'),
      meta: {
        pageTitle: getTitle()
      }

    }, {
      path: '/game_55',
      component: require('../views/Games/game_55.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_40',
      component: require('../views/Games/game_40.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_35',
      component: require('../views/Games/game_35.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_30',
      component: require('../views/Games/game_30.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_25',
      component: require('../views/Games/game_25.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_20',
      component: require('../views/Games/game_20.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      path: '/game_15',
      component: require('../views/Games/game_15.vue'),
      meta: {
        pageTitle: getTitle()
      }
    },{
      path: '/my',
      component:my,
      meta: {
        pageTitle: getTitle()
      }
    },
    { path: '/myInfo',
    component: myInfo,
      meta: {
        pageTitle: getTitle()
      }
    },
    { path: '/myPassword',
    component: myPassword,
      meta: {
        pageTitle: getTitle()
      }
    },
    { path: '/myCenter',
    component: myCenter,
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      //历史走势
      path: '/pay:id',
      component: aliPay,
      meta: {
        pageTitle: getTitle()
      }
    },

    { path: '/handPay',
    component: handPay,
      meta: {
        pageTitle: getTitle()
      }
    },
  {
      path: '/login',
      component: require('../components/login/Login.vue'),
    meta: {
      pageTitle: getTitle()
    }
    },
    {
      path: '/regist',
      component: require('../components/regist/regist.vue'),
      meta: {
        pageTitle: getTitle()
      }

    }
    , { // 默认跳转到 '/index/recommend'
      path: '*',
      redirect: '/index',
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    { // 资金管理
      path: '/order',
      component: order,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //未结明细
      path: '/todayBuyColor',
      component: todayBuyColor,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //今日已结
      path: '/todayWinning',
      component: todayWinning,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,

    {
      //注册
      path: '/myHistroy',
      component: myHistroy,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //修改支付密码
      path: '/passwordZ',
      component: passwordZ,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //修改银行卡
      path: '/hahaMoney',
      component: hahaMoney,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //修改登录密码
      path: '/passwordD',
      component: passwordD,
      meta: {
        pageTitle: getTitle()
      }
    }
    ,
    {
      //客服
      path: '/myService',
      component: myService,
      meta: {
        pageTitle: getTitle()
      }
    },
    {
      //历史走势
      path: '/trend:id',
      component: trend,
      meta: {
        pageTitle: getTitle()
      }
    }
  ]
})

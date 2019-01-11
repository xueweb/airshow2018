import Vue from 'vue'
import Router from 'vue-router'

const index = (resolve) => {
  import('@/components/index/index').then((module) => {
    resolve(module)
  })
};
const tickdetail = (resolve) => {
  import('@/components/tickdetail/tickdetail').then((module) => {
    resolve(module)
  })
};
const bus = (resolve) => {
  import('@/components/bus/bus').then((module) => {
    resolve(module)
  })
};
const navigation = (resolve) => {
  import('@/components/navigation/navigation').then((module) => {
    resolve(module)
  })
};
const parking = (resolve) => {
  import('@/components/parking/parking').then((module) => {
    resolve(module)
  })
};
const phonedetail = (resolve) => {
  import('@/base/phonedetail/phonedetail').then((module) => {
    resolve(module)
  })
};
const answer = (resolve) => {
  import('@/components/answer/answer').then((module) => {
    resolve(module)
  })
};
const busTime = (resolve) => {
  import('@/components/bus-time/bus-time').then((module) => {
    resolve(module)
  })
};
const appointment = (resolve) => {
  import('@/components/appointment/appointment').then((module) => {
    resolve(module)
  })
};
const packingdetail = (resolve) => {
  import('@/components/packing-detail/packing-detail').then((module) => {
    resolve(module)
  })
};
const usermap = (resolve) => {
  import('@/components/map/map').then((module) => {
    resolve(module)
  })
}
const login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
};
const backIndex = (resolve) => {
  import('@/components/backIndex/backIndex').then((module) => {
    resolve(module)
  })
};
const backIndexSup = (resolve) => {
  import('@/components/backIndexSup/backIndexSup').then((module) => {
    resolve(module)
  })
};
const feedback = (resolve) => {
  import('@/components/feedback/feedback').then((module) => {
    resolve(module)
  })
};
const submitted = (resolve) => {
  import('@/components/submitted/submitted').then((module) => {
    resolve(module)
  })
};
const buslist = (resolve) => {
  import('@/components/buslist/buslist').then((module) => {
    resolve(module)
  })
};
const mapimg = (resolve) => {
  import('@/components/mapimg/mapimg').then((module) => {
    resolve(module)
  })
};
const visit = (resolve) => {
  import('@/copywriting/visit/visit').then((module) => {
    resolve(module)
  })
};
const question = (resolve) => {
  import('@/copywriting/question/question').then((module) => {
    resolve(module)
  })
};
const reservations = (resolve) => {
  import('@/copywriting/reservations/reservations').then((module) => {
    resolve(module)
  })
};
const program = (resolve) => {
  import('@/copywriting/program/program').then((module) => {
    resolve(module)
  })
};
const driveload = (resolve) => {
  import('@/copywriting/driveload/driveload').then((module) => {
    resolve(module)
  })
};
const parkingdescription = (resolve) => {
  import('@/copywriting/parkingdescription/parkingdescription').then((module) => {
    resolve(module)
  })
};

const workmsg = (resolve) => {
  import('@/components/workmsg/workmsg').then((module) => {
    resolve(module)
  })
};
const introduction = (resolve) => {
  import('@/copywriting/introduction/introduction').then((module) => {
    resolve(module)
  })
};
const parkingdec = (resolve) => {
  import('@/copywriting/parkingdec/parkingdec').then((module) => {
    resolve(module)
  })
};
const search = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
};
const searchstation = (resolve) => {
  import('@/components/searchstation/searchstation').then((module) => {
    resolve(module)
  })
};
const crosscity = (resolve) => {
  import('@/copywriting/crosscity/crosscity').then((module) => {
    resolve(module)
  })
};
const hotel = (resolve) => {
  import('@/copywriting/hotel/hotel').then((module) => {
    resolve(module)
  })
};
const trafficpolice = (resolve) => {
  import('@/copywriting/trafficpolice/trafficpolice').then((module) => {
    resolve(module)
  })
};
const airshow = (resolve) => {
  import('@/copywriting/airshow/airshow').then((module) => {
    resolve(module)
  })
};
const returnpoint = (resolve) => {
  import('@/components/returnpoint/returnpoint').then((module) => {
    resolve(module)
  })
};
const howto = (resolve) => {
  import('@/copywriting/howto/howto').then((module) => {
    resolve(module)
  })
};
const msgdetai = (resolve) => {
  import('@/components/msgdetai/msgdetai').then((module) => {
    resolve(module)
  })
};



Vue.use(Router);

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'index',
      component: index
    },
    //添加票详情页
    {
      path: '/tickdetail',
      name: 'tickdetail',
      component: tickdetail
    },
    //预约乘车点
    {
      path: '/bus',
      name: 'bus',
      component: bus
    },
    //返回停车
    {
      path: '/navigation',
      name: 'navigation',
      component: navigation
    },
    //停车定位
    {
      path: '/parking',
      name: 'parking',
      component: parking
    },
    //停车定位展馆图
    {
      path: '/mapimg',
      name: 'mapimg',
      component: mapimg
    },
    //返回定位
    {
      path: '/phonedetail',
      name: 'phonedetail',
      component: phonedetail
    },
    //返回定位
    {
      path: '/answer',
      name: 'answer',
      component: answer
    },
    //选择乘车时间和地点页面
    {
      path: '/busTime',
      name: 'bus-time',
      component: busTime
    },
    //预约详情
    {
      path: '/appointment',
      name: 'appointment',
      component: appointment
    },
    //停车详情
    {
      path: '/packingdetail',
      name: 'packing-detail',
      component: packingdetail
    },//航展地图
    {
      path: '/usermap',
      name: 'usermap',
      component: usermap
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //后台首页
    {
      path: '/backIndex',
      name: 'backIndex',
      component: backIndex
    },
    //后台首页-超管
    {
      path: '/backIndexSup',
      name: 'backIndexSup',
      component: backIndexSup
    },
    //后台问题反馈
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    //后台信息报送
    {
      path: '/submitted',
      name: 'submitted',
      component: submitted
    },
    //后台汽车发出列
    {
      path: '/buslist',
      name: 'buslist',
      component: buslist
    },
    //参观流程
    {
      path: '/visit',
      name: 'visit',
      component: visit
    },
    //预约乘车
    {
      path: '/reservations',
      name: 'reservations',
      component: reservations
    },
    //节目表
    {
      path: '/program',
      name: 'program',
      component: program
    },
    //自驾路线
    {
      path: '/driveload',
      name: 'driveload',
      component: driveload
    },
    //停车场说明
    {
      path: '/parkingdescription',
      name: 'parkingdescription',
      component: parkingdescription
    },
    //后台信息页
    {
      path: '/workmsg',
      name: 'workmsg',
      component: workmsg
    },
    //航展简介
    {
      path: '/introduction',
      name: 'introduction',
      component: introduction
    },
    //航展客服问问
    {
      path: '/question',
      name: 'question',
      component: question
    },
    //搜素
    {
      path: '/search',
      name: 'search',
      component: search
    },
    //停车场简介
    {
      path: '/parkingdec',
      name: 'parkingdec',
      component: parkingdec
    },
    // 乘车点详情
    {
      path: '/searchstation',
      name: 'searchstation',
      component: searchstation
    },
    // 跨市专线
    {
      path: '/crosscity',
      name: 'crosscity',
      component: crosscity
    },
    // 酒店专线
    {
      path: '/hotel',
      name: 'hotel',
      component: hotel
    },
    // 珠海交警公众号
    {
      path: '/trafficpolice',
      name: 'trafficpolice',
      component: trafficpolice
    },
    // 中国航展公众号
    {
      path: '/airshow',
      name: 'airshow',
      component: airshow
    },
    // 回停车点
    {
      path: '/returnpoint',
      name: 'returnpoint',
      component: returnpoint
    },
    // 如何凭票预约
    {
      path: '/howto',
      name: 'howto',
      component: howto
    },
    // 如何详细详情
    {
      path: '/msgdetai',
      name: 'msgdetai',
      component: msgdetai
    }
  ]
})

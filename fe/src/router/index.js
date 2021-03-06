import Vue from 'vue'
import Router from 'vue-router'

// 使用 require.ensure - 代码分割

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Help from '@/pages/Help/Index'
import NotFoundPage from '@/pages/NotFoundPage'

import Wechat from '@/pages/wechat/Index'
import Chatroom from '@/pages/wechat/Chatroom'
import ChatSetting from '@/pages/wechat/ChatSetting'

import Contacts from '@/pages/contacts/Index'
import UserProfile from '@/pages/contacts/UserProfile'
import NewFriends from '@/pages/contacts/NewFriends'
import AddFriend from '@/pages/contacts/AddFriend'
import AddSend from '@/pages/contacts/AddSend'

import Discover from '@/pages/discover/Index'
import Moments from '@/pages/discover/Moments'

import Myinfo from '@/pages/myinfo/Index'
import MyProfile from '@/pages/myinfo/MyProfile'

import Avatar from '@/pages/myinfo/edit/Avatar'
import Face from '@/pages/myinfo/edit/Face'
import MyCode from '@/pages/myinfo/edit/QRCode'
import MyAlias from '@/pages/myinfo/edit/MyAlias'
import MyWechatno from '@/pages/myinfo/edit/MyWechatno'
import More from '@/pages/myinfo/edit/More'

import Wallet from '@/pages/myinfo/Wallet'

Vue.use(Router)

// 这个就是源码，你知道为什么要这样写！而不是其他的！ts 的语法确实挺酷炫的！

// new Router({...RouterOptions}),

// RouterOptions 可以有 mode / routers 等参数
// 而，router 里面的格式呢？也要约定！因此里面还需要有  RouteConfig，定义每个对象可以设置的值：path / name / component / components / alias / children / beforeEnter 等等。。

const router = new Router({
  // 先使用默认的 hash 模式～
  // mode: 'history',
  routes: [{
    path: '*',
    component: NotFoundPage
  }, {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  }, {
    path: '/search/:type',
    component: Search,
    meta: {
      title: '搜索'
    }
  }, {
    path: '/wechat',
    component: Wechat,
    meta: {
      title: '微信'
    }
  }, {
    path: '/contacts',
    component: Contacts,
    meta: {
      title: '通讯录'
    },
    children: [{
      path: 'newFriends',
      component: NewFriends,
      meta: {
        title: '新的朋友'
      }
    }]
  }, {
    path: '/chatrooms/:contactid',
    component: Chatroom,
    meta: {
      title: '聊天室'
    },
    children: [{
      path: '/chatrooms/:contactid/chatsetting',
      component: ChatSetting,
      meta: {
        title: '聊天设置'
      }
    }]
  }, {
    path: '/discover',
    component: Discover,
    meta: {
      title: '发现'
    },
    children: [{
      path: 'moments',
      component: Moments,
      meta: {
        title: '朋友圈'
      }
    }]
  }, {
    path: '/myinfo',
    component: Myinfo,
    meta: {
      title: '我的'
    },
    children: [{
      path: 'profile',
      component: MyProfile,
      children: [{
        path: 'headimg',
        component: Avatar
      }, {
        path: 'face',
        component: Face
      }, {
        path: 'alias',
        component: MyAlias
      }, {
        path: 'wechatno',
        component: MyWechatno
      }, {
        path: 'code',
        component: MyCode
      }, {
        path: 'more',
        component: More
      }]
    }, {
      path: 'wallet',
      component: Wallet
    }]
  }, {
    path: '/userprofile/:contactid',
    component: UserProfile,
    meta: {
      title: '好友详情'
    }
  }, {
    path: '/addFriend',
    component: AddFriend,
    meta: {
      title: '添加好友'
    }
  }, {
    path: '/addsend/:fid',
    component: AddSend,
    meta: {
      title: '添加好友'
    }
  }, {
    path: '/help',
    component: Help,
    meta: {
      title: '帮助'
    },
    children: [{
      path: 'wallet',
      component: Wallet,
      meta: {
        title: '钱包'
      }
    }]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router

<!-- 用户的详情界面，展示 ……
    可能从 通讯录点击，或者朋友圈的头像和 昵称点击 进来～

    还可能没有好友关系，搜索进来的！
 -->
<template>
  <div class="userprofile-page">

    <header-section :go-back="true" :head-title="headTitle">
      <section slot="userOperate" class="head-operate right" @click="isShowOperate = !isShowOperate">
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="20" cy="12" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="20" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
          <circle cx="20" cy="28" r="2" stroke-width="1" fill="rgb(255,255,255)"/>
        </svg>
      </section>
    </header-section>

    <main class="profile-container">

      <section class="base-info placeholder">
        <span>
          <img :src="info.headimgurl" alt="avatar">
        </span>
        <div class="name-info">
          <p>{{ info.mobilephone }}</p><i/>
          <p>微信号：{{ info.wechatno }}</p>
          <p>昵称：{{ info.nickname }}</p>
        </div>
      </section>

      <section class="tag-section placeholder">
        <div v-if="!info.tags">
          <span>设置备注和标签</span>
        </div>
        <div v-else>
          <span>标签</span>
          <span>family</span>
        </div>
      </section>

      <section class="more-section placeholder">
        <span class="item">
          <span>地区</span>
          <span>{{ info.country }}</span>
        </span>
        <span class="item">
          <span>个人相册</span>
          <span class="album">
            <img src="../../assets/logo.png" alt="图片～">
          </span>
        </span>
        <span class="item">
          <span>更多</span>
        </span>
      </section>

      <section class="contact-section placeholder">
        <div v-if="isFriend">
          <el-button type="success" @click="goto('/chatrooms/' + contactid)">发送消息</el-button>
          <br>
          <el-button :plain="true" type="success">视频聊天</el-button>
        </div>
        <div v-else>
          <el-button type="success" @click="goto('/addSend/' + contactid)">添加到通讯录</el-button>
        </div>
        <!--<div>
            <el-button type="success">通过验证</el-button>
            <br/>
            <el-button :plain="true" type="success">加入黑名单</el-button>
        </div>-->
      </section>
    </main>

    <!-- 参考 better-scroll, picker 组件的设计 -->
    <section v-if="isShowOperate" class="picker" @click="isShowOperate = !isShowOperate">
      <transition name="picker-show">
        <ul class="picker-content">
          <!-- 需要拆开？因为每个操作功能都不一样！！？ -->
          <li v-for="item in operateList" :key="item.id">
            <img :src="item.icon" alt="icon">
            <span class="operate-text">
              {{ item.name }}
            </span>
          </li>
        </ul>
      </transition>
    </section>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {localStorage} from '@/utils'
import HeaderSection from '@/components/HeaderSection'

export default {
  name: 'UserProfile',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '详细资料',
      isFriend: false,
      contactid: '',
      info: {
        /* :
           id: 0,
           wechatno: 'sgchenjz',
           nickname: '钻',
           remark: 'hehe',
           gender: '男',
           country: '中国',
           headimgurl: '',
           tags: ''
           */
      },
      isShowOperate: false,
      operateList: [{
        'id': 0,
        'icon': 'static/image/operate/icon-setRemark.png',
        'name': '设置备注及标签'
      }, {
        'id': 1,
        'icon': 'static/image/operate/icon-starred.png',
        'name': '标为星标朋友'
      }, {
        'id': 2,
        'icon': 'static/image/operate/icon-moment.png',
        'name': '朋友圈设置'
      }, {
        'id': 3,
        'icon': 'static/image/operate/icon-shareContact.png',
        'name': '发送该名片'
      }, {
        'id': 4,
        'icon': 'static/image/operate/icon-report.png',
        'name': '投诉'
      }, {
        'id': 5,
        'icon': 'static/image/operate/icon-addToBlock.png',
        'name': '加入黑名单'
      }, {
        'id': 6,
        'icon': 'static/image/operate/icon-delete.png',
        'name': '删除'
      }, {
        'id': 7,
        'icon': 'static/image/operate/icon-addToDesk.png',
        'name': '添加到桌面'
      }]
    }
  },
  computed: {
    ...mapState(['userinfo', 'contacts'])
  },
  beforeMount() {
    // 放在 beforeCreate 里错了？这个之后才会执行 beforeMount，应该没有问题啊！
    // 但是 create之前，根本还没有获取 data!! —— 可以改成 created

    this.contactid = this.$route.params.contactid

    // let info = this.contacts[this.contactid]
    // if (!info) {
    //    info = this.initFuserinfo();        // 这个进程并不会 被阻塞！！
    // }
    // this.info = info;   // 首先执行！因此，第一次还是 空的！

    this.isFriend = !!this.contacts[this.contactid] || this.contactid === this.userinfo._id

    // 点击朋友或者自己的！
    this.info = this.contactid === this.userinfo._id
      ? this.userinfo
      : (this.isFriend
        ? this.contacts[this.contactid]
        : JSON.parse(localStorage(this.contactid)))
  },
  methods: {
    ...mapActions(['updateContact']),
    async initFuserinfo() {
      // 还是再取一次？应该是要再取一次的吧，其实也没有必要缓存～ 本来的，可以只获取 id 就够了，到这个界面之后再获取详情
      //  const response = await getFuserinfo()
      //  this.fuserinfo = response.data
    },
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .placeholder {
    margin-top: 1.2rem;
  }

  .userprofile-page {
    @include page();
  }

  .profile-container {
    overflow: auto;
    height: 100%;
    padding-bottom: 2rem
  }

  .head-operate {
    margin: 1rem 1rem 0;
  }

  .base-info, .tag-section {
    text-align: left;
    background-color: white;
    padding: 1rem 2rem;
  }

  .base-info {
    display: flex;
    align-items: center;

    span {
      margin: 0 2rem 0 0;
      flex: 0 1 0;
      img {
        height: 3.2rem;
      }
    }
    div {
      flex-grow: 1;
      p {
        padding: 5px 0;
      }
    }
  }

  .more-section {
    text-align: left;
    background-color: white;
    padding: 0 2rem;

    .item {
      padding: 1rem;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
    }
    .album {
      height: 5rem;
    }
  }

  .contact-section button {
    margin: 5px;
    width: 70%;
  }

  .picker {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(37, 38, 45, .4);

    /* 动态过渡的效果 */
    .picker-show-enter, .picker-show-leave-active {
      transform: translate3d(0, 273px, 0)
    }

    .picker-show-enter-active, .picker-show-leave-active {
      transition: all .5s ease-in-out
    }

    .picker-content {
      position: absolute;
      bottom: 0;
      z-index: 1000;
      text-align: left;
      background-color: white;
      width: 100%;
      height: 20rem;
      overflow: auto;
      border-top: 1px solid #e8e8e8;

      .operate-text {
        padding: 0 0 0 2rem;
        display: table-cell;
        vertical-align: middle;
      }
      img {
        height: 1.8rem;
        padding: 5px;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }

  img {
    height: 3.2rem;
    padding: 5px;
    display: table-cell;
    vertical-align: middle;
  }
</style>

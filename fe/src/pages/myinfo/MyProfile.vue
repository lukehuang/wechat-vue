<template>
  <div class="myprofile-page">
    <header-section :go-back="true" :head-title="headTitle"/>

    <div class="placeholder"/>

    <main>
      <section class="detail-section">

        <!-- 每一个都是 链接，可以跳转编辑！ router-link , 动态加载！-->
        <!-- 这样循环并不划算！不多，而且每项初始化的，还不如 直接分开写！ -->
        <!--<div v-for="item in detailInfo" :key="item.id">
            <router-link :to="'/myinfo/profile/' + item.type">
                <span>{{ item.name }}</span>
                <span>{{ info[item.type] }}</span>
            </router-link>
        </div>-->

        <router-link :to="'/myinfo/profile/headimg'">
          <span>头像</span>
          <span>
            <img :src="userinfo.headimgurl" alt="avatar">
          </span>
        </router-link>
        <router-link :to="'/myinfo/profile/face'">
          <span>百度AI</span>
          <span>{{ userinfo.face ? "可刷脸登录" : "未设置" }}</span>
        </router-link>
        <router-link :to="'/myinfo/profile/alias'">
          <span>昵称</span>
          <span>{{ userinfo.alias }}</span>
        </router-link>
        <router-link :to="'/myinfo/profile/wechatno'">
          <span>微信号</span>
          <span>{{ userinfo.wechatno || "未设置" }}</span>
        </router-link>
        <router-link :to="'/myinfo/profile/code'">
          <span>二维码名片</span>
          <span>
            <svg class="icon fa-18x" aria-hidden="true">
              <use xlink:href="#icon-qrcode"/>
            </svg>
          </span>
        </router-link>
        <router-link :to="'/myinfo/profile/more'">
          <span>更多</span>
        </router-link>

      </section>

      <section class="address-section">
        <router-link :to="'/myinfo/profile/address'">
          <span>我的地址</span>
        </router-link>
      </section>
    </main>

    <transition name="router-slid" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
import {mapState} from 'vuex'

export default {
  name: 'MyProfile',
  components: {
    HeaderSection
  },
  data() {
    return {
      headTitle: '个人信息'
    }
  },
  computed: {
    ...mapState(['userinfo'])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";

  .myprofile-page {
    @include page();
    z-index: 202;
  }

  .detail-section {
    background-color: white;
  }

  .detail-section a {
    height: auto;
    margin: 0 1rem;
    padding: 15px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;

    span {
      white-space: nowrap;
      flex: 0 1 0;
    }

    span:nth-child(2) {
      flex-grow: 1;
      text-align: right;
    }
  }

  .address-section {
    background-color: white;
    margin-top: 2rem;
    text-align: left;
    a {
      padding: 15px 25px;
      display: block;
      width: 100%;
    }
  }

  .placeholder {
    height: 1.2rem;
    width: auto;
  }

  img {
    width: 4rem;
  }

  .fa-18x {
    font-size: 1.8rem;
    color: #000000;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }

  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
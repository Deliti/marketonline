<template>
  <header class="pc-header">
    <div class="page-container">
      <div class="logo-box"><img src="../assets/images/logo.png" alt=""></div>
      <div class="menu-box">
        <div class="munu-item mr1" @click="linkJump('/home')">首頁</div>
        <div class="munu-item mr2" @click="linkJump('/aboutus')">關於我們</div>
        <div class="munu-item mr3">
          <div class="not-login-box" v-if="!userInfo">
            <div class="active" @click="linkJump('/login')">請登入</div>
            <div @click="linkJump('/register')">注册</div>
          </div>
          <div class="user-name">{{userInfo.username}}</div>
        </div>
        <div class="munu-item" @click="linkJump('/mine')">個人中心</div>
      </div>
      <router-link :to="{name: 'shopCart'}" class="cart-box">
        <i class="cart-icon"></i>
        <label>購物車</label>
        <i class="cart-num" v-show="goodCount !== 0">{{goodCount}}</i>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      userInfo: JSON.parse(localStorage['userInfo'] || false)
    }
  },
  computed: {
    ...mapGetters(['goodCount'])
  },
  methods: {
    hrefJump (href) {
      window.location.href = href
    },
    linkJump (href) {
      this.$router.push(href)
    }
  }
}
</script>

<style lang="scss" scoped>
.pc-header {
  width: 100%;
  height: 4.4rem;
  display: none;
  box-sizing: border-box;
  @extend .theme-color;
  @media screen and (min-width: $screenMid) {
    min-width: $screenWidth;
    display: block;
  }
  .page-container {
    width: $screenWidth;
    height: 100%;
    @extend .flex-box;
    margin: 0 auto;
    .logo-box {
      width: 13rem;
      height: 100%;
      text-align: center;
      line-height: 4.4rem;
      img {
        // width: 100%;
        height: 45%;
        vertical-align: middle;
        // display: block;
      }
    }
    .menu-box {
      // flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding: 0 2.5rem 0 2.8rem;
      @extend .flex-box;
      .munu-item {
        height: 100%;
        font-size: 1.4rem;
        color: #FFFFFF;
        line-height: 4.4rem;
        cursor: pointer;
        // &:hover {
        //   background: #ffffff;
        //   color: #0DC6B5;
        // }
      }
      .mr1 {
        margin-right: 3rem;
      }
      .mr2 {
        margin-right: 6rem;
      }
      .mr3 {
        width: 11rem;
        margin-right: 6rem;
      }
      .not-login-box {
        @extend .flex-box;
        width: 100%;
        height: 100%;
        .active {
          font-weight: bold;
        }
      }
      .user-name {

      }
    }
    .cart-box {
      width: 8rem;
      height: 100%;
      position: relative;
      @extend .flex-box;
      justify-content: flex-start;
      color: #ffffff;
      text-decoration: none;
      font-size: 1.4rem;
      .cart-icon {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: .5rem;
        @include backImg('../assets/images/cartfull.png');
      }
      .cart-num {
        width: 1.9rem;
        height: 1.9rem;
        position: absolute;
        border-radius: 50%;
        right: .9rem;top: .9rem;
        background: #ffffff;
        text-align: center;
        line-height: 1.9rem;
        font-size: 1.4rem;
        color: #0DC6B5;
        @media screen and (min-width: $screenMid) {
          top: 50%;
          transform: translateY(-50%);
          right: 0rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="page-wrap">
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon"></i>
      <h1>我的訂單</h1>
    </div>
    <div class="enter-wrap left-enter" @click="linkJump('orders')">
      <img src="../assets/images/mine-order.png" alt="" class="enter-icon">
      <h3 class="enter-title">我的訂單</h3>
    </div>
    <div class="enter-wrap right-enter" @click="linkJump('addressSetting')">
      <img src="../assets/images/mine-local.png" alt="" class="enter-icon">
      <h3 class="enter-title">地址管理</h3>
    </div>
    <footer class="common-footer">
      <div class="footer-wrap">
        <router-link to="home" class="enter-footer">
          首頁
        </router-link>
        <div class="enter-footer active-footer">
          個人中心
        </div>
      </div>
      <router-link to="shopCart" class="cart-wrap">
        <div class="cart-bg"></div>
        <i class="cart-num">1</i>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    linkJump (href) {
      this.$router.push(href)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #ffffff;
  position: relative;
  .top-bg {
    width: 100%;
    height: 31.7rem;
    @include backImg('../assets/images/ovalshed.png');
    position: absolute;
    left: 0;top: 0;
  }
  .page-title {
    position: relative;
    margin-bottom: 6.7rem;
  }
  .enter-wrap {
    position: relative;
    width: 100%;
    height: 14.6rem;
    margin-bottom: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .enter-icon {
      width: 9rem;
      height: 9rem;
      margin-right: 3rem;
    }
    .enter-title {
      font-size: 2rem;
      color: #4d4d4d;
    }
  }
  .left-enter {
    background: url('../assets/images/enter-left-bg.png') no-repeat left 0;
    background-size: 86% 100%;
  }
  .right-enter {
    background: url('../assets/images/enter-right-bg.png') no-repeat right 0;
    background-size: 86% 100%;
  }
  .common-footer {
    width: 100%;
    position: fixed;
    left: 0;bottom: 0;
    display: flex;
    align-items: flex-end;
    .footer-wrap {
      flex: 1;
      height: 5rem;
      display: flex;
      .enter-footer {
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: 5rem;
        font-size: 1.4rem;
        color: #444444;
        background: #FFFFFF;
      }
      .active-footer {
        background: #E5E5E5;
      }
    }
    .cart-wrap {
      width: 7.5rem;
      height: 7.5rem;
      position: relative;
      border-radius: 1.35rem 0px 0px 0px;
      @extend .theme-color;
      .cart-bg {
        width: 100%;
        height: 100%;
        @include backImg('../assets/images/cart.png');
        background-position: center center;
        background-size: 5rem 5rem;
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
      }
    }
  }
}
</style>

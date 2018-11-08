<template>
  <div class="page-wrap">
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon"></i>
      <h1>團長首頁</h1>
    </div>
    <div class="enter-wrap left-enter" @click="linkJump('orders')">
      <img src="../assets/images/mine-order.png" alt="" class="enter-icon">
      <h3 class="enter-title">我的訂單</h3>
    </div>
    <div class="enter-wrap right-enter" @click="linkJump('finance')">
      <img src="../assets/images/mine-local.png" alt="" class="enter-icon">
      <h3 class="enter-title">財務匯總</h3>
    </div>
    <div class="input-code-wrap">
      <div class="input-box">
        <input type="text" v-model="verifyCode" placeholder="輸入驗證碼">
      </div>
      <div class="submit-btn">
        <label>確認</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      verifyCode: ''
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
  width: 100%;
  height: 100%;
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
    margin-bottom: 2rem;
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
  .input-code-wrap {
    padding: 2rem 0 0;
    .input-box {
      width: 15.5rem;
      height: 4rem;
      margin: 0 auto 3rem;
      background: #FFFFFF;
      box-shadow: 0 .3rem 1rem 0 rgba(0,0,0,0.10);
      box-sizing: border-box;
      padding: .9rem 1.3rem;
      input {

      }
    }
    .submit-btn {
      display: block;
      width: 15.5rem;
      height: 4.1rem;
      margin: 0 auto 3rem;
      @extend .theme-color;
      border-radius: 1.25rem;
      text-align: center;
      line-height: 4.1rem;
      color: #ffffff;
      font-size: 1.8rem;
    }
  }
}
</style>

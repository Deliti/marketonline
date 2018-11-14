<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon"></i>
      <div class="about-us" @click="linkjump('aboutus')">關於我們</div>
    </div>
    <div class="page-content">
      <h1 class="program-title">品牌名字</h1>
      <h3 class="center-title">重置密碼</h3>
      <div class="input-wrap">
        <div class="input-box">
          <input type="text" class="input" placeholder="註冊時用的手機號碼" v-model="username">
        </div>
        <hr>
        <div class="input-box verify-box">
          <input type="text" class="input" placeholder="輸入驗證碼" v-model="verifycode">
          <time-down ref="timedown" class="verifybtn" @sendCode="sendCode"/>
        </div>
      </div>
      <div class="input-wrap">
        <div class="input-box">
          <input type="password" class="input" placeholder="重置密碼（6-12位）" v-model="password">
        </div>
        <hr>
        <div class="input-box">
          <input type="password" class="input" placeholder="再次確認密碼" v-model="passwordAgain">
        </div>
      </div>
    </div>
    <div class="bottom-setion">
      <div class="submit-btn" @click="submit"><label>確認</label></div>
    </div>
  </div>
</template>

<script>
import { validateInput } from 'utils/utils'
import { TimeDown } from 'components'
import { Toast } from 'mint-ui'
import { resetPwd } from 'utils/getData'
export default {
  data () {
    return {
      username: '',
      password: '',
      passwordAgain: '',
      verifycode: ''
    }
  },
  components: {
    TimeDown
  },
  beforeDestroy () {
    this.$refs.timedown.clearInterVal()
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    sendCode (countdown) {
      console.log('發送驗證碼')
      const verifyUsername = validateInput({
        value: this.username,
        emptyTxt: '請輸入手機號碼',
        length: 11,
        lengthTxt: '手機號碼長度不正確',
        regStr: /^1(3|4|5|7|8|9)\d{9}$/,
        novalidStr: '請輸入正確的手機號碼'
      })
      if (verifyUsername) {
        countdown()
      }
    },
    async submit () {
      if (!this.verifyFrom()) {
        return false
      }
      const params = {
        "phone": this.username,
        "password": this.password,
        "authCode": this.verifycode
      }
      const data = await resetPwd(params)
      if (data.code == 0) {
        Toast('修改密碼成功，請重新登錄')
        this.linkjump('login')
      }

    },
    verifyFrom () {
      const verifyUsername = validateInput({
        value: this.username,
        emptyTxt: '請輸入手機號碼',
        length: 11,
        lengthTxt: '手機號碼長度不正確',
        regStr: /^1(3|4|5|7|8|9)\d{9}$/,
        novalidStr: '請輸入正確的手機號碼'
      })
      if (!verifyUsername) {
        return false
      }
      const verifyVCode = validateInput({
        value: this.verifycode,
        emptyTxt: '請輸入驗證碼'
      })
      if (!verifyVCode) {
        return false
      }
      const verifyPwd = validateInput({
        value: this.password,
        emptyTxt: '請輸入重置密碼',
        minLen: 6,
        maxLen: 12,
        lengthTxt: '密碼長度不正確',
        // regStr: /^1(3|4|5|7|8|9)\d{9}$/,
        // novalidStr: '請輸入正確的手機號碼'
      })
      if (!verifyPwd) {
        return false
      }
      if (this.passwordAgain !== this.password) {
        Toast('兩次密碼不一致')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  @include backImg('../assets/images/rectangle.png');
  .page-title {
    background: none;
    .about-us {
      height: 3rem;
      padding-right: 1.8rem;
      position: absolute;
      right: 2.6rem;top: 2.2rem;
      line-height: 3rem;
      font-size: 1.7rem;
      color: #FFFFFF;
      @include backImg('../assets/images/link-arrow.png');
      background-size: .7rem 1.2rem;
      background-position: right center;
    }
  }
  .page-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 4.3rem;
    .program-title {
      width: 100%;
      font-size: 3.6rem;
      line-height: 5rem;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 2.3rem;
    }
    .center-title {
      font-size: 2.4rem;
      line-height: 3.4rem;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 1rem;
    }
    .input-wrap {
      width: 100%;
      margin-bottom: 1rem;
      .input-box {
        width: 100%;
        height: 4.4rem;
        background: #FFFFFF;
        box-sizing: border-box;
        border-radius: .2rem .2rem 0 0;
        padding: 0 1.5rem;
        @extend .flex-box;
        .input {
          height: 2rem;
          min-width: 30%;
          flex: 1;
        }
        .verifybtn {
          text-align: center;
          height: 3rem;
          line-height: 3rem;
          padding: 0 1rem;
          box-sizing: border-box;
          border: 1px solid #152935;
          border-radius: .2rem;
          font-size: 1.4rem;
          color: #444444;
          margin-left: 1rem;
        }
      }
      .verify-box {
        padding-right: 1.2rem;
      }
      hr {
        background:  #E5E5E5;
      }
    }
  }
  .bottom-setion {
    position: absolute;
    left: 0;bottom: 3.5rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4.3rem;
    .enter-text {
      font-size: 1.8rem;
      color: #FFFFFF;
      text-align: center;
      line-height: 2.5rem;
      margin-bottom: 1.1rem;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 50%;bottom: 0;
        transform: translateX(-50%);
        width: 9.2rem;
        height: .1rem;
        background: #FFFFFF;
      }
    }
    .submit-btn {
      width: 100%;
      height: 4.1rem;
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

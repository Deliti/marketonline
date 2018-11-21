<template>
  <div class="page-wrap">
    <div class="page-bg-bottom"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <div class="about-us" @click="linkjump('aboutus')">關於我們</div>
    </div>
    <div class="page-content">
      <h1 class="program-title">品牌名字</h1>
      <h3 class="center-title">登入</h3>
      <div class="input-wrap">
        <div class="input-box">
          <input type="text" class="input" placeholder="手機號碼" v-model="username">
        </div>
        <hr>
        <div class="input-box">
          <input type="password" class="input" placeholder="密碼" v-model="password">
        </div>
      </div>
      <div class="right-text">
        <label @click="linkjump('findpwd')">忘記密碼？</label>
      </div>
    </div>
    <div class="bottom-setion">
      <div class="enter-text"><label @click="linkjump('register')">註冊新帳戶</label></div>
      <div class="submit-btn" @click="login"><label>登錄</label></div>
    </div>
  </div>
</template>

<script>
import { validateInput } from 'utils/utils'
import { Toast } from 'mint-ui'
import { login, getUserInfo, getAllCartList } from 'utils/getData'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['userAgent'])
  },
  methods: {
    ...mapMutations(['UPDATECART']),
    linkjump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    async login () {
      if (!this.verifyFrom()) {
        return false
      }
      const params = {
        phone: this.username,
        password: this.password
      }
      const data = await login(params)
      if (data.code == 0) {
        Toast('登錄成功')
        localStorage['token'] = data.data.token
        localStorage['isAgent'] = data.data.isAgent
        this.getUserInfo()
        this.getAllCartList()
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
      const verifyPassword = validateInput({
        value: this.password,
        emptyTxt: '請輸入密碼'
      })
      return verifyUsername && verifyPassword
    },
    async getAllCartList () {
      const params = {}
      const data = await getAllCartList(params)
      if (data.code == 0) {
        this.UPDATECART(data.data)
      }
    },
    async getUserInfo () {
      const data = await getUserInfo()
      if (data.code == 0) {
        localStorage['userInfo'] = JSON.stringify(data.data)
        this.linkjump('home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-phone-wrap {
  width: 100%;
  height: 100%;
}
.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  @include backImg('../assets/images/rectangle.png');
  @media screen and (min-width: $screenMid) {
    background: none;
    padding-bottom: .43rem;
  }
  .page-bg-bottom {
    display: none;
    @media screen and (min-width: $screenMid) {
      display: block;
      position: absolute;
      left: 0;top: 0;
      width: 100%;
      min-width: 76.8rem;
      height: 100%;
      min-height: 10.24rem;
      @include backImg('../assets/images/pc-login-bg2.png');
    }
  }
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
    padding: 0 3.3rem;
    position: relative;
    @media screen and (min-width: $screenMid) {
      width: 61.4rem;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 5.3rem 7rem 3rem;
      @include backImg('../assets/images/pc-login-bg1.png');
      background-size: 100% 45rem;
    }
    .program-title {
      width: 100%;
      font-size: 3.6rem;
      line-height: 5rem;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 2.3rem;
      @media screen and (min-width: $screenMid) {
        line-height: 4.5rem;
        margin-bottom: 4.8rem;
      }
    }
    .center-title {
      font-size: 2.4rem;
      line-height: 3.4rem;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 1rem;
      @media screen and (min-width: $screenMid) {
        line-height: 4.5rem;
      }
    }
    .input-wrap {
      width: 100%;
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
          flex: 1;
        }
      }
      hr {
        background: #E5E5E5;
      }
    }
    .right-text {
      margin-top: .5rem;
      text-align: right;
      font-size: 1.4rem;
      line-height: 2rem;
      label {
        color: #FFFFFF;
        text-decoration: underline;
      }
    }
  }
  .bottom-setion {
    position: absolute;
    left: 0;bottom: 3.5rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4.3rem;
    @media screen and (min-width: $screenMid) {
      width: 61.4rem;
      padding: 0 7rem;
      left: 50%;
      transform: translateX(-50%);
    }
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

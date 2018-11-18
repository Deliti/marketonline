<template>
  <div :class="['page-wrap', userAgent == 'PHONE'?'page-phone-wrap':'page-pc-wrap']">
    <div class="page-phone" v-if="userAgent == 'PHONE'">
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
    <div class="page-pc" v-else>
      <h1 class="page-pc-title">品牌名字</h1>
      <div class="page-container">
        <div class="login-wrap">
          <div class="login-box">
            <h3 class="login-title">登入</h3>
            <div class="input-wrap">
              <div class="input-title">手機號碼</div>
              <input type="text" class="input" v-model="username">
            </div>
            <div class="input-wrap">
              <div class="input-title">密碼</div>
              <input type="password" class="input" v-model="password">
            </div>
            <div class="submit-btn"><label>登錄</label></div>
          </div>
          <div class="under-text">
            <label @click="linkjump('findpwd')">忘記密碼？</label>
          </div>
        </div>
        <div class="intro-wrap">
          <h3 class="intro-title">我們是誰？</h3>
          <p class="intro-desc">
            我們是一間提供至優質、<br>
            至抵買產品的社區團購平台。<br>
            每日嚴選10多款優質的生鮮蔬果<br>
            及日常用品畀街坊網上購買。
          </p>
          <div class="normal-btn"><label>註冊新帳戶</label></div>
        </div>
      </div>
      <section class="pc-login-footer">
        <div class="right-box">@2018 www.abcdefg.com. All rights reserved.</div>
        <div class="link-box">
          <span class="link-item">首頁</span>
          <span class="link-item">關於我們</span>
          <span class="link-item">反饋意見</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { validateInput } from 'utils/utils'
import { Toast } from 'mint-ui'
import { login } from 'utils/getData'
import { mapState } from 'vuex'
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
        this.linkjump('home')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page-phone-wrap {
  width: 100%;
  height: 100%;
}
.page-phone {
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
    padding: 0 3.3rem;
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
.page-pc-wrap {
  min-width: 7.68rem;
  width: 100%;
  min-height: 5.12rem;
  height: 100%;
  @extend .theme-color;
  position: relative;
}
.page-pc {
  padding-top: .68rem;
  .page-pc-title {
    font-size: .32rem;
    line-height: .45rem;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: .28rem;
  }
  .page-container {
    width: 5.95rem;
    height: 2.85rem;
    display: flex;
    margin: 0 auto;
    .login-wrap{
      width: 2.9rem;
      height: 100%;
      box-sizing: border-box;
      background: #F7F7F7;
      border: 1px solid #979797;
      padding: .45rem .58rem 0 .49rem;
      .login-box {
        width: 100%;
        height: 1.85rem;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
        border-radius: .04rem;
        padding: .17rem .15rem 0 .15rem;
        margin-bottom: .08rem;
        .login-title {
          font-size: .16rem;
          color: #757575;
          margin-bottom: .18rem;
        }
        .input-wrap {
          width: 100%;
          height: .37rem;
          position: relative;
          border-bottom: 1px solid #D4D4D4;
          box-sizing: border-box;
          margin-bottom: .15rem;
          &:last-child {
            margin-bottom: .1rem;
          }
          .input-title {
            font-size: .12rem;
            line-height: .12rem;
            color: #A1A1A1;
            margin-bottom: .02rem;
          }
          .input {
            height: .14rem;
            display: block;
          }
        }
        .submit-btn {
          width: .57rem;
          height: .21rem;
          float: right;
          background: #1CD0A3;
          border-radius: 2px;
          font-size: .14rem;
          color: #FFFFFF;
          line-height: .21rem;
          text-align: center;
        }
      }
      .under-text {
        font-size: .14rem;
        color: #C0C0C0;
        text-align: center;
      }
    }
    .intro-wrap {
      width: 3.05rem;
      height: 100%;
      box-sizing: border-box;
      padding: .65rem 0 0 .55rem;
      background-color: rgba(0,0,0,0.15);
      .intro-title {
        font-size: .16rem;
        color: #FFFFFF;
        line-height: .22rem;
        margin-bottom: .11rem;
      }
      .intro-desc {
        font-size: .12rem;
        color: #FFFFFF;
        line-height: .14rem;
        margin-bottom: .06rem;
      }
      .normal-btn {
        width: .83rem;
        height: .21rem;
        box-sizing: border-box;
        border: .01rem solid #FFFFFF;
        border-radius: .02rem;
        text-align: center;
        line-height: .19rem;
        font-size: .12rem;
        color: #FFFFFF;
      }
    }
  }
  .pc-login-footer {
    width: 100%;
    height: .16rem;
    position: absolute;
    left: 0;bottom: .20rem;
    box-sizing: border-box;
    padding: 0 .36rem;
    @extend .flex-box;
    .right-box {
      font-size: .12rem;
      color: #FFFFFF;
    }
    .link-box {
      display: flex;
      font-size: .12rem;
      color: #FFFFFF;
      .link-item {
        margin-right: .53rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

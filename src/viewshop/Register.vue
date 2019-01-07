<template>
  <div class="page-wrap">
    <div class="page-bg-bottom"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <div class="about-us" @click="linkjump('aboutus')">關於我們</div>
    </div>
    <div class="page-content">
      <div class="menu-box">
        <div class="munu-item" @click="linkjump('home')">首頁</div>
        <div class="munu-item" @click="linkjump('aboutus')">關於我們</div>
      </div>
      <h1 class="program-title">
        <img src="../assets/images/logo.png" alt="">
      </h1>
      <h3 class="center-title">註冊</h3>
      <div class="input-wrap">
        <div class="input-box">
          <input type="text" class="input" placeholder="手機號碼" v-model="username">
        </div>
        <hr>
        <div class="input-box verify-box">
          <input type="text" class="input" placeholder="輸入驗證碼" v-model="verifycode">
          <time-down ref="timedown" class="verifybtn" @sendCode="sendCode"/>
        </div>
      </div>
      <div class="input-wrap">
        <div class="input-box">
          <input type="password" class="input" placeholder="設置密碼（6-12位）" v-model="password">
        </div>
        <hr>
        <div class="input-box">
          <input type="password" class="input" placeholder="再次確認密碼" v-model="passwordAgain">
        </div>
      </div>
      <div class="leader-wrap">
        <div class="leader-no-selected"
            v-if="!leader.id"
            @click="toggleLeader">
          <i class="left-icon"></i>
          <i :class="['down-icon', leaderShow?'rotate-down':'']"></i>
          <b>選擇團長</b>
          <span>（即購買商品後的取貨地點）</span>
        </div>
        <div class="leader-seleted-box" v-else @click="toggleLeader">
          <i :class="['down-icon', leaderShow?'rotate-down':'']"></i>
          <div class="seleted-title">已選團長：</div>
          <div class="leader-info-wrap">
            <p class="seleted-text" v-if="leader.id">{{leader.address}}<br>團長：{{leader.name}}{{leader.phone}}</p>
            <div class="reset-btn">重置</div>
          </div>
        </div>
        <my-aside :show="leaderShow" @hide="hideLeader" class="aside-wrap-polify">
          <div class="option-seleted">
            <div class="seleted-title">已選團長：</div>
            <p class="seleted-text" v-if="leader.id">{{leader.address}}<br>團長：{{leader.name}}  {{leader.phone}}</p>
            <p class="no-seleted" v-else>—— 無 ——</p>
          </div>
          <div class="option-wrap">
            <collapse-item v-for="(childLeaders, districtKey) in leaders"
                            :key="districtKey">
              <div slot="title" class="option-title">{{districtKey}}</div>
              <div v-for="(item, index) in childLeaders"
                  :key="index"
                  class="option-item"
                  @click="chooseLeader(item)">
                <i :class="['radius-icon', leader.id == item.id?'radius-seleted':'']"></i>
                <div class="option-box">
                  <p class="option-text">{{item.address}}</p>
                  <p class="option-text">團長：{{item.name}}  {{item.phone}}</p>
                </div>
              </div>
            </collapse-item>
          </div>
        </my-aside>
      </div>
      <!-- <div class="tips-wrap">Tips: 部分貨品需送貨服務，請登記您的住址信息。</div> -->
      <div class="input-wrap">
        <div class="input-box">
          <input type="text" class="input" placeholder="填寫你的名字（請填寫你的真實名字）" v-model="realname">
        </div>
        <hr>
        <div class="input-box area-box">
          <textarea class="input-area"
                  placeholder="填寫個人收貨地址（即配送上門地址，因为有些商品保鲜理由，需即时送货到府上）"
                  v-model="addrText">
          </textarea>
        </div>
      </div>
      <div class="bottom-setion">
        <div class="enter-text"><label @click="linkjump('login')">已有帳號？點擊登入</label></div>
        <div class="submit-btn" @click="submit"><label>註冊新帳戶</label></div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox, MyAside, CollapseItem, TimeDown } from 'components/index.js'
import { validateInput } from 'utils/utils'
import { Toast } from 'mint-ui'
import { login, getAuthCode, getUserInfo, register, getLeaderList } from 'utils/getData'
export default {
  data () {
    return {
      username: '', // 註冊手機號碼
      password: '', // 密碼
      passwordAgain: '', // 確認密碼
      verifycode: '', // 驗證碼
      realname: '', // 真實姓名
      addrText: '', // 住址
      leaderShow: false,
      leaders: {},
      leader: {}
    }
  },
  components: {
    MyAside,
    CollapseItem,
    TimeDown
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.$refs.timedown.clearInterVal()
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    init () {
      this.getAllLeader()
    },
    async getAllLeader () {
      const data = await getLeaderList()
      if (data.code == 0) {
        console.log(data)
        this.leaders = data.data
      }
    },
    async sendCode (countdown) {
      console.log('發送驗證碼')
      const verifyUsername = validateInput({
        value: this.username,
        emptyTxt: '請輸入手機號碼',
        // length: 8,
        // lengthTxt: '手機號碼長度不正確',
        // regStr: /^(28[0-9]{2}|((6|8)[0-9]{3}))[-_－—\s]?[0-9]{4}$/,
        // novalidStr: '請輸入正確的手機號碼'
      })
      if (verifyUsername) {
        const params = {
          phone: this.username
        }
        const data = await getAuthCode(params)
        if (data.code == 0) {
          countdown()
        }
      }
    },
    async submit () {
      if (!this.verifyFrom()) {
        return false
      }
      const params = {
        "phone": this.username,
        "password": this.password,
        "authCode": this.verifycode,
        "agentId": this.leader.id,
        "name": this.realname,
        "address": this.addrText
      }
      const data = await register(params)
      if (data.code == 0) {
        const loginParams = {
          phone: this.username,
          password: this.password
        }
        const loginData = await login(loginParams)
        if (loginData.code == 0) {
          localStorage['token'] = loginData.data.token
          // localStorage['isAgent'] = loginData.data.isAgent
          this.getUserInfo()
        }
      }
    },
    async getUserInfo () {
      Toast('註冊成功，已為您自動登錄')
      const data = await getUserInfo()
      if (data.code == 0) {
        localStorage['userInfo'] = JSON.stringify(data.data)
        this.linkjump('home')
      }
    },
    verifyFrom () {
      const verifyUsername = validateInput({
        value: this.username,
        emptyTxt: '請輸入手機號碼',
        // length: 8,
        // lengthTxt: '手機號碼長度不正確',
        // regStr: /^(28[0-9]{2}|((6|8)[0-9]{3}))[-_－—\s]?[0-9]{4}$/,
        // novalidStr: '請輸入正確的手機號碼'
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
      if (!this.leader.id) {
        Toast('請選擇團長')
        return false
      }
      const verifyRealName = validateInput({
        value: this.realname,
        emptyTxt: '請填寫你的名字'
      })
      if (!verifyRealName) {
        return false
      }
      const verifyAddr = validateInput({
        value: this.addrText,
        emptyTxt: '請填寫收貨地址'
      })
      if (!verifyAddr) {
        return false
      }
      return true
    },
    showLeader () {
      this.leaderShow = true
    },
    hideLeader () {
      this.leaderShow = false
    },
    toggleLeader () {
      this.leaderShow = !this.leaderShow
    },
    chooseLeader (leader) {
      this.leader = leader
      this.leaderShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  min-height: 100%;
  padding-bottom: 4.3rem;
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
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 3.3rem;
    @media screen and (min-width: $screenMid) {
      width: 61.4rem;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 5.3rem 7rem 3rem;
      @include backImg('../assets/images/pc-login-bg1.png');
      background-size: 43rem 34rem;
      background-position: center 0;
    }
    .menu-box {
      display: none;
      @media screen and (min-width: $screenMid) {
        display: block;
        display: flex;
        justify-content: space-between;
        width: 8rem;
        height: 2rem;
        box-sizing: border-box;
        padding-left: .5rem;
        position: absolute;
        left: 0;top: 1.8rem;
        font-size: 1.4rem;
      }
      .munu-item {
        cursor: pointer;
      }
    }
    .program-title {
      width: 100%;
      font-size: 3.6rem;
      line-height: 5rem;
      color: #FFFFFF;
      text-align: center;
      margin-bottom: 2.3rem;
      img {
        width: 70%;
      }
      @media screen and (min-width: $screenMid) {
        line-height: 4.5rem;
        margin-bottom: 4.8rem;
        img {
          width: 50%;
        }
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
      margin-bottom: 1rem;
      @media screen and (min-width: $screenMid) {
        width: 29rem;
        margin-left: auto;
        margin-right: auto;
      }
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
          cursor: pointer;
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
      .area-box {
        height: 8rem;
        padding: 1rem 1.5rem;
        .input-area {
          flex: 1;
          height: 100%;
        }
      }
      .verify-box {
        padding-right: 1.2rem;
      }
      hr {
        background: #E5E5E5;
      }
    }
    .leader-wrap {
      margin: 2.2rem 0 1.8rem 0;
      width: 100%;
      @media screen and (min-width: $screenMid) {
        margin-bottom: 1.4rem;
        background: #444444;
        width: 29rem;
        margin-right: auto;
        margin-left: auto;
      }
      .leader-no-selected {
        height: 2.4rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        color: #FFFFFF;
        font-size: 1.4rem;
        position: relative;
        @media screen and (min-width: $screenMid) {
          height: 4rem;
          padding-left: 4rem;
          border-radius: 6px;
        }
        .left-icon {
          width: .7rem;
          height: 1.2rem;
          @include backImg('../assets/images/link-arrow.png');
          transform: rotate(180deg);
          margin-right: 1rem;
          @media screen and (min-width: $screenMid) {
            display: none;
          }
        }
        b {
          font-size: 1.8rem;
        }
      }
      .down-icon {
        display: none;
        width: 1.1rem;
        height: .6rem;
        position: absolute;
        left: 1.5rem;top: 1.7rem;
        @include backImg('../assets/images/pc-down-icon.png');
        transition: all .3s;
        @media screen and (min-width: $screenMid) {
          display: block;
        }
      }
      .rotate-down {
        transform: rotate(180deg);
      }
      .leader-seleted-box {
        position: relative;
        @media screen and (min-width: $screenMid) {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          padding-left: 4rem;
          border-radius: 6px;
          height: 6rem;
          .down-icon {
            top: 2.4rem;
          }
        }
        .seleted-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: .6rem;
        }
        .leader-info-wrap {
          @extend .flex-box;
          @media screen and (min-width: $screenMid) {
            flex: 1;
          }
          .seleted-text {
            max-width: 80%;
            font-size: 1.7rem;
            font-weight: bold;
            color: #ffffff;
            @media screen and (min-width: $screenMid) {
              max-width: 100%;
            }
          }
          .reset-btn {
            height: 2.4rem;
            padding-right: 1.8rem;
            line-height: 2.4rem;
            font-size: 1.7rem;
            color: #FFFFFF;
            @include backImg('../assets/images/link-arrow.png');
            background-size: .7rem 1.2rem;
            background-position: right center;
            text-decoration: underline;
            @media screen and (min-width: $screenMid) {
              display: none;
            }
          }
        }
      }
    }
    .tips-wrap {
      margin-bottom: 1rem;
      color: #ffffff;
      @media screen and (min-width: $screenMid) {
        width: 29rem;
        margin-right: auto;
        margin-left: auto;
      }
    }
    .bottom-setion {
      width: 100%;
      padding-top: .8rem;
       @media screen and (min-width: $screenMid) {
        width: 29rem;
        margin-right: auto;
        margin-left: auto;
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
}
.aside-wrap-polify {
  @media screen and (min-width: $screenMid) {
    padding-left: 4rem;
  }
}
.option-seleted {
  @media screen and (min-width: $screenMid) {
    display: none;
  }
  .seleted-title {
    font-size: 1.4rem;
    color: #444444;
  }
  .seleted-text {
    font-size: 1.4rem;
    color: #000000;
    margin-bottom: 2rem;
  }
  .no-seleted {
    font-size: 1.8rem;
    color: #000000;
  }
}
.option-wrap {
  .option-title {
    font-size: 1.8rem;
    @media screen and (min-width: $screenMid) {
      color: #ffffff;
    }
  }
  .option-item {
    padding-top: 1rem;
    display: flex;
    .radius-icon{
      width: 1.4rem;
      height: 1.4rem;
      margin: .3rem .9rem 0 0;
      @include backImg('../assets/images/radius-item.png');
    }
    .radius-disable {
      @include backImg('../assets/images/radius-item-disabled.png');
    }
    .radius-seleted {
      @include backImg('../assets/images/radius-seleted.png');
    }
    .option-box {
      font-size: 1.6rem;
      @media screen and (min-width: $screenMid) {
        color: #ffffff;
      }
    }
  }
  .option-item-disable {
    .radius-icon {
      @include backImg('../assets/images/radius-item-disabled.png');
    }
    .option-box {
      color: #A4A4A4;
    }
  }
}
</style>

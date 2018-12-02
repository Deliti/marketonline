<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>團長首頁</h1>
    </div>
    <div class="page-content">
      <div class="input-code-wrap">
        <div class="input-box">
          <input type="text" v-model="pickCode" placeholder="輸入驗證碼">
        </div>
        <div class="submit-btn" @click="handleVerify">
          <label>確認</label>
        </div>
      </div>
      <div class="enter-wrap left-enter" @click="linkJump('/agentOrders')">
        <img src="../assets/images/mine-order.png" alt="" class="enter-icon">
        <h3 class="enter-title">我的訂單</h3>
      </div>
      <div class="enter-wrap right-enter" @click="linkJump('/agentFinance')">
        <img src="../assets/images/payment_illustration.png" alt="" class="enter-icon">
        <h3 class="enter-title">財務匯總</h3>
      </div>
      <div :class="['change-submit', isOpenStatus == 1 ? 'grey': '']" @click="changeOpenStatus">
        <i :class="['flag-icon', isOpenStatus == 2?'start-icon':(isOpenStatus == 0?'pause-icon':'')]"></i>
        <label>{{statusText}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { CommonHeader } from 'components'
import { getUserInfo, checkPickCode, resumeOrder, stopOrder } from 'utils/getData'

export default {
  data () {
    return {
      pickCode: '',
      isOpenStatus: 0 // 0 接单 1 暂停中 2. 停业中
    }
  },
  computed: {
    statusText () {
      if (this.isOpenStatus == 0) {
        return '暫停接單'
      } else if (this.isOpenStatus == 1) {
        return '已設暫停接單'
      } else {
        return '立即接單'
      }
    }
  },
  components: {
    CommonHeader
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    linkJump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    async getUserInfo (cb) {
      const data = await getUserInfo()
      if (data.code == 0) {
        if (data.agent && data.agent.isAgent == 1) {
          const userInfo = Object.assign({}, data.agent, data.data)
          if (data.agent.closeTime) {
            const nowTime = new Date().getTime()
            const closeTime = new Date(data.agent.closeTime).getTime()
            if (nowTime >= closeTime) {
              this.isOpenStatus = 2
            } else if (nowTime > closeTime-2*24*3600*1000) {
              this.isOpenStatus = 1
            } else {
              this.isOpenStatus = 0
            }
          }
          cb instanceof Function && cb(userInfo.closeTime)
          localStorage['userInfo'] = JSON.stringify(userInfo)
        } else {
          this.$router.replace('/home')
        }
      }
    },
    async handleVerify () {
      if (this.pickCode === '') {
        Toast('請輸入驗證碼')
        return false
      }
      const params = {
        pickCode: this.pickCode
      }
      const data = await checkPickCode(params)
      if (data.code == 0) {
        this.$router.push(`agentOrderDetail/${data.orderId}?pickCode=${this.pickCode}`)
      }
    },
    changeOpenStatus () {
      if (this.isOpenStatus == 1) {
        const closeTime = JSON.parse(localStorage['userInfo']).closeTime
        Toast(`您可在 ${closeTime} 後開啟接單`)
        return false
      } else if (this.isOpenStatus == 0) {
        this.stopOrder()
      } else {
        this.resumeOrder()
      }
    },
    async stopOrder () {
      const data = await stopOrder()
      if (data.code == 0) {
        this.getUserInfo((closeTime) => {
          Toast(`已為您在 ${closeTime} 後暫停接單`)
        })
      }
    },
    async resumeOrder () {
      const data = await resumeOrder()
      if (data.code == 0) {
        this.getUserInfo(() => {
          Toast(`已為您恢復接單`)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #ffffff;
}
.page-wrap {
  width: 100%;
  position: relative;
  .top-bg {
    width: 100%;
    height: 31.7rem;
    @include backImg('../assets/images/ovalshed.png');
    position: absolute;
    left: 0;top: 0;
    @media screen and (min-width: $screenMid) {
      display: none;
    }
  }
  .page-title {
    background: none;
    position: relative;
    margin-bottom: 2rem;
  }
  .page-content {
    position: relative;
    padding-bottom: 3rem;
    @media screen and (min-width: $screenMid) {
      width: 40rem;
      margin: 0 auto;
      padding-top: 6rem;
    }
  }
  .input-code-wrap {
    padding: .7rem 0 4rem;
    position: relative;
    @media screen and (min-width: $screenMid) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-box {
      width: 15.25rem;
      height: 4rem;
      margin: 0 auto 2rem;
      background: #FFFFFF;
      box-shadow: 0 .3rem 1rem 0 rgba(0,0,0,0.10);
      box-sizing: border-box;
      padding: .9rem 1.3rem;
      @media screen and (min-width: $screenMid) {
        margin: 0;
      }
      input {
        width: 100%;
        height: 100%;
      }
    }
    .submit-btn {
      display: block;
      width: 15.25rem;
      height: 4.1rem;
      box-sizing: border-box;
      border: 1px solid #ffffff;
      margin: 0 auto;
      border-radius: 1.25rem;
      text-align: center;
      line-height: 4.1rem;
      color: #ffffff;
      font-size: 1.8rem;
      @media screen and (min-width: $screenMid) {
        background: linear-gradient(-135deg, #0AC4BA 0%, #2BDA8E 100%);
        margin: 0;
      }
    }
  }
  .enter-wrap {
    position: relative;
    width: 100%;
    height: 14.6rem;
    margin-bottom: 3rem;
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
    @media screen and (min-width: $screenMid) {
      background: url('../assets/images/pc-enter-bg.png') no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
  .right-enter {
    background: url('../assets/images/enter-right-bg.png') no-repeat right 0;
    background-size: 86% 100%;
    @media screen and (min-width: $screenMid) {
      background: url('../assets/images/pc-enter-bg.png') no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
  .change-submit {
    width: 17.9rem;
    height: 3rem;
    box-sizing: border-box;
    margin: 4.7rem auto 0;
    border: 1px solid #152935;
    border-radius: .2rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.4rem;
    color: #000000;
    .flag-icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 1rem;
    }
    .start-icon {
      width: 1rem;
      height: 1.5rem;
      @include backImg('../assets/images/icons-start.png');
    }
    .pause-icon {
      width: 1rem;
      height: 1.7rem;
      @include backImg('../assets/images/icons-pause.png');
    }
  }
  .grey {
    background: grey;
  }
}
</style>

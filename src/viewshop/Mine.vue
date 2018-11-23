<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>我的訂單</h1>
    </div>
    <div class="page-content">
      <div class="enter-wrap left-enter" @click="linkJump('orders')">
        <img src="../assets/images/mine-order.png" alt="" class="enter-icon">
        <h3 class="enter-title">我的訂單</h3>
      </div>
      <div class="enter-wrap right-enter" @click="linkJump('addressSetting')">
        <img src="../assets/images/mine-local.png" alt="" class="enter-icon">
        <h3 class="enter-title">地址管理</h3>
      </div>
      <div class="exit-box" @click="logout">
        <i class="exit-icon"></i>
        <span>退出登錄</span>
      </div>
    </div>
    <common-footer :activeTab="'mine'"></common-footer>
  </div>
</template>

<script>
import { CommonHeader, CommonFooter } from 'components'
import { Toast } from 'mint-ui'
import { getUserInfo } from 'utils/getData'

export default {
  data () {
    return {

    }
  },
  components: {
    CommonHeader,
    CommonFooter
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
        } 
      } else {
        Toast('請登錄')
        this.$router.replace('/login')
      }
    },
    logout () {
      localStorage.clear()
      this.linkJump('/login')
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
    @media screen and (min-width: $screenMid) {
      display: none;
    }
  }
  .page-title {
    position: relative;
    background: none;
    margin-bottom: 6.7rem;
  }
  .page-content {
    position: relative;
    padding-bottom: 7rem;
    @media screen and (min-width: $screenMid) {
      width: 40rem;
      margin: 0 auto;
      padding-top: 6rem;
    }
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
  .exit-box {
    margin-top: 5rem;
    box-sizing: border-box;
    padding-left: 3.5rem;
    text-align: left;
    line-height: 2.2rem;
    font-size: 1.4rem;
    color: #444444;
    @media screen and (min-width: $screenMid) {
      padding: 0;
      text-align: center;
    }
    .exit-icon {
      display: inline-block;
      vertical-align: middle;
      width: 2.2rem;
      height: 2.2rem;
      @include backImg('../assets/images/exit.png');
      margin-right: .5rem;
    }
  }
}
</style>

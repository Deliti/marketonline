<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>關於我們</h1>
    </div>
     <div class="page-content">關懷我們</div>
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
    CommonHeader
  },
  methods: {
    linkJump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
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
      padding-top: 4rem;
    }
  }
}
</style>

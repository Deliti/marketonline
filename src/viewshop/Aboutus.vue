<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
    </div>
    <h1 class="about-title">關於我們</h1>
    <div class="page-content">
      <div class="html-wrap" v-html="html"></div>
      <!-- <p>熱情果，又叫百香果，係熱情果科熱情果屬嘅爬藤草本植物，亦係種生果，原產南美洲熱帶地區，通常用嚟整果汁</p>
      <p>熱情果，又叫百香果，係熱情果科熱情果屬嘅爬藤草本植物，亦係種生果，原產南美洲熱帶地區，通常用嚟整果汁</p>
      <p>熱情果，又叫百香果，係熱情果科熱情果屬嘅爬藤草本植物，亦係種生果，原產南美洲熱帶地區，通常用嚟整果汁</p> -->
      <div class="submit-btn" @click="linkJump('/home')"><label>去落單</label></div>
    </div>
  </div>
</template>

<script>
import { CommonHeader, CommonFooter } from 'components'
import { Toast } from 'mint-ui'
import { getAbout } from 'utils/getData'
export default {
  data () {
    return {
      html: ''
    }
  },
  components: {
    CommonHeader
  },
  mounted () {
    this.getHtml()
  },
  methods: {
    linkJump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    async getHtml () {
      const data = await getAbout()
      if (data.code == 0) {
        this.html = data.data
      }
    }
  }
}
</script>

<style lang="scss">
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
    margin-bottom: 0;
    
  }
  .about-title {
    position: relative;
    font-size: 3.6rem;
    color: #FFFFFF;
    line-height: 5rem;
    margin-bottom: 3.5rem;
    text-align: center;
  }
  .page-content {
    position: relative;
    box-sizing: border-box;
    padding: 0 4rem;
    padding-bottom: 7rem;
    @media screen and (min-width: $screenMid) {
      width: 40rem;
      margin: 0 auto;
      padding-top: 4rem;
    }
    .html-wrap {
      img {
        width: 100%;
        margin-bottom: 1.5rem;
      }
      p {
        font-size: 1.4rem;
        color: #444444;
        line-height: 2rem;
        margin-bottom: 1rem;
      }
    }
    
    .submit-btn {
      margin-top: 3rem;
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

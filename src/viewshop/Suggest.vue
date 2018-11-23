<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>反饋意見</h1>
    </div>
    <div class="page-content">
      <div class="suggest-wrap">
        <textarea class="suggest-input"
                  placeholder="輸入你的問題或意見"
                  v-model="suggestText">
        </textarea>
      </div>
      <div class="info-wrap">
        <div class="name-box">
          <textarea type="text" v-model="name" placeholder="請填寫你的名字"></textarea>
        </div>
        <div class="tel-box">
          <textarea type="tel" v-model="phone" placeholder="填寫你的手機號碼"></textarea>
        </div>
      </div>
      <div class="submit-button" @click="comfirm">
        <label>提交反饋</label>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { validateInput } from 'utils/utils'
import { CommonHeader } from 'components'
import { suggest } from 'utils/getData'

export default {
  data () {
    return {
      suggestText: '',
      name: '',
      phone: ''
    }
  },
  components: {
    CommonHeader
  },
  methods: {
    historyBack () {
      history.go(-1)
    },
    async comfirm () {
      if (!this.verifyFrom()) {
        return false
      }
      const params = {
        phone: this.phone,
        name: this.name,
        content: this.suggestText
      }
      const data = await suggest(params)
      if (data.code == 0) {
        Toast('意見提交成功')
        this.clearFrom()
      }
    },
    clearFrom () {
      this.name = ''
      this.phone = ''
      this.suggestText = ''
    },
    verifyFrom () {
      const verifyText = validateInput({
        value: this.suggestText,
        emptyTxt: '請填寫您的意見或建議'
      })
      if (!verifyText) {
        return false
      }
      const verifyName = validateInput({
        value: this.name,
        emptyTxt: '請輸入姓名'
      })
      if (!verifyName) {
        return false
      }
      const verifyPhone = validateInput({
        value: this.phone,
        emptyTxt: '請輸入手機號碼',
        length: 11,
        lengthTxt: '手機號碼長度不正確',
        regStr: /^1(3|4|5|7|8|9)\d{9}$/,
        novalidStr: '請輸入正確的手機號碼'
      })
      if (!verifyPhone) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #F6F6F6;
  width: 100%;
  min-height: 100%;
  .page-title {
    background: #ffffff;
  }
  .page-content {
    padding: 6rem 3.3rem 3.5rem;
    width: 100%;
    box-sizing: border-box;
    @media screen and (min-width: $screenMid) {
      width: 40rem;
      padding: 3rem 1.5rem 0;
      margin: 0 auto;
    }
    .suggest-wrap {
      width: 100%;
      height: 21.4rem;
      background: #ffffff;
      box-shadow: 0 2.5rem 2.5rem 0 rgba(0,0,0,0.10);
      border-radius: .1rem .1rem 0px 0px;
      margin-bottom: 4rem;
      .suggest-input {
        width: 100%;
        height: 100%;
        padding: 1.5rem 2.5rem;
        box-sizing: border-box;
      }
    }
    .info-wrap {
      width: 100%;
      background: #ffffff;
      box-shadow: 0 2.5rem 2.5rem 0 rgba(0,0,0,0.10);
      border-radius: .1rem .1rem 0px 0px;
      margin-bottom: 5.3rem;
      .name-box {
        height: 7.5rem;
        box-sizing: border-box;
        padding: 1.4rem 2.5rem;
      }
      .tel-box {
        height: 7.5rem;
        box-sizing: border-box;
        padding: 1.4rem 2.5rem;
      }
    }
    .submit-button {
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

<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>添加地址</h1>
    </div>
    <div class="page-content">
      <div class="suggest-wrap">
        <textarea class="suggest-input"
                  placeholder="輸入你的地址"
                  v-model="addrText">
        </textarea>
        <div class="name-box">
          <textarea type="text" v-model="name" placeholder="請填寫你的名字"></textarea>
        </div>
        <div class="tel-box">
          <textarea type="tel" v-model="phone" placeholder="填寫你的手機號碼"></textarea>
        </div>
      </div>
      <div class="submit-button" @click="addAddr">
        <label>保存新地址</label>
      </div>
    </div>
  </div>
</template>

<script>
import { validateInput } from 'utils/utils'
import { addAddr } from 'utils/getData'

export default {
  data () {
    return {
      addrText: '',
      name: '',
      phone: ''
    }
  },
  methods: {
    historyBack () {
      history.go(-1)
    },
    async addAddr () {
      if (!this.verifyFrom()) {
        return false
      }
      const params = {
        "name": this.name,
        "phone": this.phone,
        "address": this.addrText,
        "status": "0"
      }
      const data = await addAddr(params)
      if (data.code == 0) {
        this.$router.replace('/addressSetting?type=2')
      }
    },
    verifyFrom () {
      const verifyAddr = validateInput({
        value: this.addrText,
        emptyTxt: '請填寫收貨地址'
      })
      if (!verifyAddr) {
        return false
      }
      const verifyname = validateInput({
        value: this.name,
        emptyTxt: '請填寫姓名'
      })
      if (!verifyname) {
        return false
      }
      const verifyUsername = validateInput({
        value: this.phone,
        emptyTxt: '請填寫手機號碼',
        length: 11,
        lengthTxt: '手機號碼長度不正確',
        regStr: /^1(3|4|5|7|8|9)\d{9}$/,
        novalidStr: '請輸入正確的手機號碼'
      })
      if (!verifyUsername) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
input::input-placeholder, textarea::input-placeholder {
  color: #B2B2B2;
}
input,textarea {
  border: none;
  outline: none;
  font-size: 1.4rem;
  color: #000000;
  background: transparent;
}
.page-wrap {
  background: #F6F6F6;
  width: 100%;
  .page-title {
    background: #ffffff;
  }
  .page-content {
    padding: 6rem 3.3rem 3.5rem;
    width: 100%;
    box-sizing: border-box;
    .suggest-wrap {
      width: 100%;
      background: #ffffff;
      box-shadow: 0 2.5rem 2.5rem 0 rgba(0,0,0,0.10);
      border-radius: .1rem .1rem 0px 0px;
      margin-bottom: 4rem;
      .suggest-input {
        width: 100%;
        display: block;
        height: 14rem;;
        padding: 1.5rem 2.5rem;
        box-sizing: border-box;
        border-bottom: 1px solid #E6E6E6;
      }
      .name-box {
        height: 7.5rem;
        display: block;
        box-sizing: border-box;
        padding: 1.4rem 2.5rem;
        border-bottom: 1px solid #E6E6E6;
      }
      .tel-box {
        height: 7.5rem;
        display: block;
        box-sizing: border-box;
        padding: 1.4rem 2.5rem;
      }
    }
    .submit-button {
      position: fixed;
      width: 75%;
      height: 4.1rem;
      left: 12.5%;
      bottom: 3.5rem;
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

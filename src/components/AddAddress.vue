<template>
  <div class="page-wrap" v-show="show">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>添加地址</h1>
    </div>
    <div class="page-content">
      <div class="suggest-wrap">
        <div class="input-box addr-box">
          <label class="pc-input-title">你的地址</label>
          <textarea class="addr-input"
                  placeholder="輸入你的地址"
                  v-model="addrText">
          </textarea>
        </div> 
        <div class="input-box">
          <label class="pc-input-title">你的名字</label>
          <textarea type="text" v-model="name" placeholder="請填寫你的名字"></textarea>
        </div>
        <div class="input-box">
          <label class="pc-input-title">你的手機號碼</label>
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
  props: {
    show: {
      default: false
    }
  },
  methods: {
    historyBack () {
      this.$emit('hideAddr')
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
        // this.$router.replace('/addressSetting?type=2')
        this.resetFrom()
        this.$emit('saveAddr')
      }
    },
    resetFrom () {
      this.addrText = ''
      this.name = ''
      this.phone = ''
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
        // length: 8,
        // lengthTxt: '手機號碼長度不正確',
        // regStr: /^(28[0-9]{2}|((6|8)[0-9]{3}))[-_－—\s]?[0-9]{4}$/,
        // novalidStr: '請輸入正確的手機號碼'
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
  position: fixed;
  left: 0;top: 0;
  right: 0;bottom: 0;
  @media screen and (min-width: $screenMid) { 
    position: relative;
    background: #ffffff;
  }
  .page-title {
    background: #ffffff;
  }
  .page-content {
    padding: 6rem 3.3rem 3.5rem;
    width: 100%;
    box-sizing: border-box;
    @media screen and (min-width: $screenMid) { 
      padding: 1.4rem 0 3.5rem;
    }
    .suggest-wrap {
      width: 100%;
      background: #ffffff;
      box-shadow: 0 2.5rem 2.5rem 0 rgba(0,0,0,0.10);
      border-radius: .1rem .1rem 0px 0px;
      margin-bottom: 4rem;
      @media screen and (min-width: $screenMid) { 
        box-shadow: none;
      }
      .pc-input-title {
        font-size: 1.4rem;
        color: #A1A1A1;
        margin-bottom: 1rem;
        display: none;
        @media screen and (min-width: $screenMid) { 
          display: block;
        }
      }
      .addr-input {
      }
      .addr-box {
        height: 14rem;
      }
      .input-box {
        height: 7.5rem;
        display: block;
        box-sizing: border-box;
        padding: 1.4rem 2.5rem;
        border-bottom: 1px solid #E6E6E6;
        &:last-child {
          border: none;
        }
        @media screen and (min-width: $screenMid) { 
          width: 25rem;
          height: 5rem;
          padding: 0 0 .3rem;
          margin-bottom: 1rem;
          &:last-child {
            border-bottom: 1px solid #E6E6E6;
          }
        }
        textarea {
          width: 100%;
          height: 100%;
          resize:none;
          @media screen and (min-width: $screenMid) { 
            height: 2rem;
          }
        }
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
      @media screen and (min-width: $screenMid) { 
        position: relative;
        left: 0;bottom: 0;
        width: 19rem;
        height: 3.1rem;
        line-height: 3.1rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

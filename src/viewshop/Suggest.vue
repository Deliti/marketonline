<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>地址管理</h1>
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
          <input type="text" v-model="name" placeholder="請填寫你的名字">
        </div>
        <div class="tel-box">
          <input type="tel" v-model="phone" placeholder="填寫你的手機號碼">
        </div>
      </div>
      <div class="submit-button">
        <label>提交反饋</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      suggestText: '',
      name: '',
      phone: ''
    }
  },
  methods: {
    historyBack () {
      history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
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

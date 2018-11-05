<template>
  <div class="cover-wrap" v-show="show">
    <div class="cover" @click="hideCover"></div>
    <div class="content-box">
      <header class="title" v-if="title !== ''">{{title}}</header>
      <div class="content">
        <span>{{message}}</span>
      </div>
      <footer class="button-wrap">
        <div class="f-button cancel" @click="cancle">{{buttons[0].text}}</div>
        <div class="f-button comfirm" v-if="buttons.length === 2" @click="comfirm">{{buttons[1].text}}</div>
      </footer>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        title: '',
        show: false,
        message: '',
        buttons: [{
          text: '取消'
        }, {
          text: '确定'
        }]
      }
    },
    methods: {
      cancle() {
        this.buttons[0].callBack && this.buttons[0].callBack()
        this.hideCover()
      },
      comfirm() {
        this.buttons[1].callBack && this.buttons[1].callBack()
        this.hideCover()
      },
      hideCover() {
        this.show = false
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cover-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;top: 0;
    right: 0;bottom: 0;
    z-index: 9999;
    .cover {
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.60);
    }
  }
  .content-box {
    width: 27rem;
    height: 12.9rem;
    // padding: 2rem;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    border-radius: 1.4rem;
    overflow: hidden;

    .title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .content {
      position: relative;
      padding: 3.5rem 2.6rem;
      text-align: center;
      font-size: 1.5rem;
      color: #1A2833;
      line-height: 1.5rem;
    }

    .button-wrap {
      @extend .flex-box;
      height: 4.3rem;
      position: relative;

      .f-button {
        flex: 1;
        width: 4rem;
        height: 2rem;
        box-sizing: border-box;
        border: 1px solid #000000;
        line-height: 4.3rem;
        text-align: center;
        font-size: 1.7rem;
        color: #137FFB;
        ;
      }
    }
  }
</style>

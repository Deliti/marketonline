<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon"></i>
      <h1>財務匯總</h1>
    </div>
    <div class="page-content">
      <div class="time-wrap">
        <div class="time-content">
          <span>篩選日期：</span>
          <div class="time-box">
            <b class="time-now"  @click="toggleShowTime">{{currentTime}}</b>
            <i :class="['down-icon', timeshow?'rotate-down':'']"  @click="toggleShowTime"></i>
            <div class="time-option-wrap" v-show="timeshow">
              <div class="time-option">今日</div>
              <div class="time-option">本週</div>
              <div class="time-option">本月</div>
              <div class="time-option" @click="showMonthPop">其他月份</div>
            </div>
          </div>
        </div>
      </div>
      <section class="order-wrap" @click="linkjump('orderDetail')">
        <div class="order-title-box">
          <div class="flex-box">
            <p class="order-text-1">江先生  96XXXXXX</p>
            <a class="tel-text">聯繫團員</a>
          </div>
          <p class="order-text-1">XX馬路XX號XX樓XX棟XX房</p>
        </div>
        <div class="order-content-box">
          <div class="good-item">
            <span class="order-text-2">商品總額</span>
            <span class="order-text-3">$ 150</span>
          </div>
          <div class="good-item">
            <span class="order-text-2">商品件數</span>
            <span class="order-text-3">3 件</span>
          </div>
          <div class="order-info-box">
            <span class="order-no">訂單編號：1000043</span>
            <span class="order-get">提成金額：$38</span>
          </div>
        </div>
      </section>
    </div>
    <mt-popup
      v-model="otherMonthVisible"
      class="mint-popup"
      position="bottom">
      <mt-picker :slots="dataList"
                :show-toolbar="true"
                ref="picker"
                value-key="cName">
        <div class="picker-button-wrap">
          <span class="cancel-btn" @click="hideMonthPop">取消</span>
          <span class="comfirm-btn" @click="timeConfirm">確認</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Popup, Picker } from 'mint-ui'
const timeTextConf = []
export default {
  data () {
    return {
      currentTime: 0,
      timeTextConf: timeTextConf,
      timeshow: false,
      otherMonthVisible: false
    }
  },
  computed: {
    dataList () {
      const monthList = ['2018/11','2018/10','2018/9','2018/8','2018/7','2018/6']
      let dateSlots = [
        {
          flex: 1,
          values: monthList,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      return  dateSlots
    }
  },
  components: {
    mtPopup: Popup,
    mtPicker: Picker
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    toggleShowTime () {
      this.timeshow = !this.timeshow
    },
    showMonthPop () {
      this.timeshow = false
      this.otherMonthVisible = true
    },
    hideMonthPop () {
      this.otherMonthVisible = false
    },
    timeConfirm () {
      this.currentTime = this.$refs.picker.getValues()[0]
      this.otherMonthVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #F6F6F6;
  min-height: 100%;
  .page-title {
    background: #ffffff;
  }
  .page-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .7rem;
    .time-wrap {
      width: 100%;
      box-sizing: border-box;
      height: 6.1rem;
      padding: 0 1.4rem;
      .time-content {
        font-size: 1.6rem;
        color: #444444;
        line-height: 6.1rem;
        display: flex;
        position: relative;
        .time-box {
          height: 100%;
          display: flex;
          align-items: center;
          .time-now {
            color: #000000;
            margin-right: 1.7rem;
          }
          .down-icon {
            width: 1.1rem;
            height: .6rem;
            @include backImg('../assets/images/triangle4.png');
            transition: all .3s;
          }
          .rotate-down {
            transform: rotate(180deg);
          }
          .time-option-wrap {
            position: absolute;
            left: 6.5rem;top: 4.5rem;
            z-index: 1;
            border: 1px solid red;
            background: #ffffff;
            .time-option {
              font-size: 1.4rem;
              height: 1.6rem;
              line-height: 1.6rem;
              border-bottom: 1px solid #eeeeee;
            }
          }
        }
      }
    }
    .order-wrap {
      width: 100%;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.09);
      border-radius: .2rem;
      margin-bottom: 1.5rem;
      .order-text-1 {
        text-align: left;
        font-size: 1.7rem;
        color: #444444;
      }
      .order-text-2 {
        font-size: 1.5rem;
        color: #777776;
      }
      .order-text-3 {
        font-size: 1.6rem;
        color: #152935;
      }
      .tel-text {
        color: #1CD0A3;
        font-size: 1.7rem;
        text-decoration: underline;
      }
      .order-title-box {
        width: 100%;
        background: #ffffff;
        position: relative;
        box-sizing: border-box;
        padding: 1.3rem 1.6rem 1.15rem 1.75rem;
        border-bottom: 1px solid #E6E6E6;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;top: 0;
          width: .5rem;
          height: 100%;
          background: #1CD0A3;
          border-radius: .2rem 0px 0px 0px;
        }
      }
      .order-content-box {
        .good-item {
          @extend .flex-box;
          box-sizing: border-box;
          padding: 0 1.4rem 0 1.75rem;
          height: 4rem;
          background: #ffffff;
          border-bottom: 1px solid #E6E6E6;
          &:last-child {
            border: none;
          }
        }
      }
      .order-info-box {
        height: 5.65rem;
        box-sizing: border-box;
        padding: 0 1.1rem 0 1.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .order-no {
          font-size: 1.4rem;
          color: #777776;
          // margin-right: 1rem;
        }
        .order-get {
          font-size: 1.4rem;
          color: #444444;
        }
        .suggest-btn {
          width: 7.25rem;
          height: 3rem;
          background: #F2917C;
          border-radius: .2rem;
          text-align: center;
          line-height: 3rem;
          color: #ffffff;
        }
        .status-btn {
          width: 11.1rem;
          height: 3rem;
          background: #1CD0A3;
          border-radius: .2rem;
          text-align: center;
          line-height: 3rem;
          color: #ffffff;
        }
        .finish-btn {
          width: 11.1rem;
          height: 3rem;
          box-sizing: border-box;
          padding: 0 2rem 0 2.5rem;
          border-radius: .2rem;
          border: 1px solid #152935;
          font-size: 1.4rem;
          color: #444444;
          @extend .flex-box;
          .check-btn-icon {
            width: .93rem;
            height: .75rem;
            @include backImg('../assets/images/checkmark.png');
          }
        }
      }
    }
  }
  .mint-popup {
    width: 100%;
  }
  .picker-button-wrap {
    width: 100%;
    height: 3rem;
    @extend .flex-box;
    span {

    }
    .cancel-btn {

    }
    .comfirm-btn {

    }
  }
}
</style>

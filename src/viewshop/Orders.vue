<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>我的訂單</h1>
    </div>
    <div class="page-content">
      <div class="time-wrap">
        <div class="time-content">
          <span>篩選日期：</span>
          <div class="time-box">
            <b class="time-now"  @click="toggleShowTime">{{currentTimeText}}</b>
            <i :class="['down-icon', timeshow?'rotate-down':'']"  @click="toggleShowTime"></i>
            <div class="time-option-wrap" v-show="timeshow">
              <div class="time-option"
                    v-for="(item, index) in timeConf"
                    :key="index"
                    @click="item.click"
                    >{{item.text}}</div>
              <div class="time-option" @click="showMonthPop">其他月份</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="orderList.length != 0"
            v-infinite-scroll="getOrderList"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
        <section v-for="(orderItem, index) in orderList"
                  :key="index"
                  class="order-wrap"
                  @click="linkjump(`orderDetail/${orderItem.id}`)">
          <div class="order-title-box">
            <div class="flex-box leader-info-box">
              <p class="order-text-1">團長：{{orderItem.agentName}}  {{orderItem.agentPhone}}</p>
              <a class="tel-text" :href="'tel:'+orderItem.agentPhone" @click.stop="">聯繫團長</a>
            </div>
            <p class="order-text-1">{{orderItem.agentAddress}}</p>
          </div>
          <div class="order-content-box">
            <div class="good-box">
              <div class="good-item">
                <span class="order-text-2">商品總額&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="order-text-3">{{'$ '+ fenTransYuan(orderItem.price)}}</span>
              </div>
              <div class="good-item">
                <span class="order-text-2">商品件數&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="order-text-3">{{orderItem.totalNum + ' 件'}}</span>
              </div>
              <div class="good-item">
                <span class="order-text-4">下單時間&nbsp;&nbsp;&nbsp;</span>
                <span class="order-text-4">{{orderItem.createAt}}</span>
              </div>
            </div>
            <div class="order-info-box">
              <span class="order-no">訂單編號：{{orderItem.id}}</span>
              <button class="suggest-btn" v-if="orderItem.status == 4" @click.stop="linkjump('suggest')">反饋意見</button>
              <span class="order-get" v-else>{{'已取 '+orderItem.pickNum+' 件'}}</span>
              <button class="status-btn">查看詳情</button>
              <!-- <button class="finish-btn" v-if="orderItem.status == 4">
                <i class="check-btn-icon"></i>
                <label>已完成</label>
              </button>
              <button class="status-btn" v-else-if="orderItem.status == 1">已下單</button>
              <button class="status-btn" v-else-if="orderItem.status == 2">已收單</button>
              <button class="status-btn" v-else-if="orderItem.status == 3">取貨</button>
              <button class="status-btn grey-btn" v-else-if="orderItem.status == 5">已取消</button> -->
            </div>
          </div>
        </section>
      </div>
      <section v-else class="no-order-wrap">
        <label>所選時段還沒有訂單哦</label>
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
import { CommonHeader } from 'components'
import { getCurrentDay, getCurrentWeek, getCurrentMonth, getBeforeMonth, fenTransYuan } from 'utils/utils'
import { getMyOrders } from 'utils/getData'

const currentD = getCurrentDay()
const currentW = getCurrentWeek()
const currentM = getCurrentMonth()
const beforeMonth = getBeforeMonth(12)
const pageLimit = '10'
let pageNo = 0
let totalPage = 1
let loading = false
export default {
  data () {
    return {
      current: '~1',
      timeshow: false,
      otherMonthVisible: false,
      timeConf: [
        {
          text: '全部',
          click: () => {
            pageNo = 0
            totalPage = 1
            this.current = '~1'
            this.timeshow = false
            this.orderList = []
            this.getOrderList()
          }
        }, {
          text: '今日',
          click: () => {
            pageNo = 0
            totalPage = 1
            this.current = '0'
            this.timeshow = false
            this.orderList = []
            this.getOrderList()
          }
        }, {
          text: '本週',
          click: () => {
            pageNo = 0
            totalPage = 1
            this.current = '1'
            this.timeshow = false
            this.orderList = []
            this.getOrderList()
          }
        }, {
          text: '本月',
          click: () => {
            pageNo = 0
            totalPage = 1
            this.current = '2'
            this.timeshow = false
            this.orderList = []
            this.getOrderList()
          }
        }
      ],
      orderList: []
    }
  },
  computed: {
    dataList () {
      const monthList = beforeMonth.map(item => item.label.replace(/-/g,"/"))
      let dateSlots = [
        {
          flex: 1,
          values: monthList,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      return  dateSlots
    },
    currentTimeText () {
      const cArr = this.current.split('-')
      switch (cArr[0]) {
        case '~1':
          return '全部'
          break;
        case '0':
          return '今日'
          break;
        case '1':
          return '本週'
          break;
        case '2':
          return '本月'
          break;
        case '3':
          if (cArr[1]) {
            return beforeMonth[cArr[1]].label
          }
          break;
        default:
          return '今日'
      }
    },
    currentTime () {
      const cArr = this.current.split('-')
      switch (cArr[0]) {
        case '~1':
          return {
            start: '',
            end: ''
          }
          break;
        case '0':
          return currentD
          break;
        case '1':
          return currentW
          break;
        case '2':
          return currentM
          break;
        case '3':
          if (cArr[1]) {
            return beforeMonth[cArr[1]].time
          }
          break;
        default:
          return currentD
      }
    }
  },
  components: {
    CommonHeader,
    mtPopup: Popup,
    mtPicker: Picker
  },
  mounted () {
    this.getOrderList()
  },
  beforeDestroy () {
    this.resetPage()
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    fenTransYuan: fenTransYuan,
    historyBack () {
      history.go(-1)
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
    resetPage () {
      pageNo = 0
      totalPage = 1
      this.orderList = []
      this.current = 0
    },
    timeConfirm () {
      const text = this.$refs.picker.getValues()[0]
      const currentT = text.replace(/\//g,"-")
      let index = 0
      for(let i = 0; i < beforeMonth.length; i++) {
        if (beforeMonth[i].label == currentT) {
          index = i
          break
        }
      }
      this.current = `3-${index}`
      this.timeshow = false
      pageNo = 0
      totalPage = 1
      this.orderList = []
      this.getOrderList()
      this.otherMonthVisible = false
    },
    async getOrderList () {
      console.log('----', pageNo, '----', totalPage, '---', pageNo >= totalPage)
      if (pageNo >= totalPage) {
        return false
      }
      if (loading) {
        return false
      }
      loading = true
      pageNo++
      const params = {
        "page": pageNo,
        "limit": pageLimit,
        "startTime": this.currentTime.start,
        "endTime": this.currentTime.end
      }
      const data = await getMyOrders(params)
      if (data.code == 0) {
        this.orderList.push(...data.data.list)
        totalPage = data.data.totalPage
      }
      loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #F6F6F6;
  min-height: 100%;
  @media screen and (min-width: $screenMid) {
    background: #ffffff;
  }
  .page-title {
    background: #ffffff;
  }
  .page-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .7rem;
    @media screen and (min-width: $screenMid) {
      width: $screenWidth;
      padding: 3rem 1.5rem 0;
      margin: 0 auto;
    }
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
            border-radius: .4rem;
            @extend .theme-color;
            color: #ffffff;
            .time-option {
              padding: 0 2rem;
              font-size: 1.4rem;
              text-align: center;
              height: 2.4rem;
              line-height: 2.4rem;
              border-bottom: 1px solid #ffffff;
              &:last-child {
                border: none;
              }
            }
          }
        }
      }
    }
    .no-order-wrap {
      width: 100%;
      padding-top: 2.5rem;
      text-align: center;
      font-size: 1.8rem;
      color: #7C7C7C;
    }
    .order-wrap {
      width: 100%;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.09);
      border-radius: .2rem;
      margin-bottom: 1.5rem;
      @media screen and (min-width: $screenMid) {
        border: 1px solid #D5D5D5;
      }
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
      .order-text-4 {
        font-size: 1.2rem;
        color: #152935;
      }
      .tel-text {
        color: #1CD0A3;
        font-size: 1.7rem;
        text-decoration: underline;
        @media screen and (min-width: $screenMid) {
          display: none;
        }
      }
      .order-title-box {
        width: 100%;
        background: #ffffff;
        position: relative;
        box-sizing: border-box;
        padding: 1.3rem 1.6rem 1.15rem 1.75rem;
        border-bottom: 1px solid #E6E6E6;
        @media screen and (min-width: $screenMid) {
          display: flex;
          .leader-info-box {
            width: 50%;
          }
        }
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
        .good-box {
          @media screen and (min-width: $screenMid) {
            position: relative;
            display: flex;
            border-bottom: 1px solid #E6E6E6;
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: 0;bottom: 0;
              width: .5rem;
              height: 105%;
              background: #1CD0A3;
              border-radius: .2rem 0px 0px 0px;
            }
          }
        }
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
          @media screen and (min-width: $screenMid) {
            margin-right: 2.5rem;
            border: none;
            width: 30%;
            justify-content: flex-start;
            &:last-child {
              padding-left: 0;

            }
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
        @media screen and (min-width: $screenMid) {
          background: #F6F6F6;
        }
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
          font-size: 1.2rem;
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
        .grey-btn {
          background: #777776;
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
    font-size: 1.8rem;
    box-sizing: border-box;
    padding: .5rem 1rem;
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

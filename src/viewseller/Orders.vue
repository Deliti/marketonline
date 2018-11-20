<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>訂單管理</h1>
    </div>
    <div class="page-content">
      <navbar v-model="selected" class="nav-tab-wrap">
        <tab-item class="nav-tab-item" id="one">全部</tab-item>
        <tab-item class="nav-tab-item" id="two">未取 / 部分取</tab-item>
        <tab-item class="nav-tab-item" id="thr">已完成</tab-item>
      </navbar>
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
      <tab-container v-model="selected">
        <tab-container-item id="one">
          <div class="tab-container-wrap">
            <div v-if="orderListone.length != 0"
                  v-infinite-scroll="getOrderList"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
              <section v-for="(item, index) in orderListone"
                        :key="index"
                        class="order-wrap"
                        @click="linkjump(`orderDetail/${item.id}`)">
                <div class="order-title-box">
                  <div class="flex-box">
                    <p class="order-text-1">{{item.name}}  {{item.phone}}</p>
                    <a class="tel-text" :href="'tel:'+item.phone">聯繫團員</a>
                  </div>
                  <p class="order-text-1">{{item.address}}</p>
                </div>
                <div class="order-content-box">
                  <div class="good-item">
                    <span class="order-text-2">商品總額</span>
                    <span class="order-text-3">{{'$ '+ item.price}}</span>
                  </div>
                  <div class="good-item">
                    <span class="order-text-2">商品件數</span>
                    <span class="order-text-3">{{item.totalNum + ' 件'}}</span>
                  </div>
                  <div class="order-info-box">
                    <span class="order-no">訂單編號：{{item.id}}</span>
                    <span class="order-get">{{'已取 '+item.pickNum+' 件'}}</span>
                    <button class="status-btn" v-if="item.status != 4">取貨</button>
                    <div class="finish-btn " v-else>
                      <i class="check-btn-icon"></i>
                      <label>已完成</label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section class="no-order-wrap" v-else>
              <label>所選時段還沒有訂單哦</label>
            </section>
          </div>
        </tab-container-item>
        <tab-container-item id="two">
          <div class="tab-container-wrap">
            <div v-if="orderListtwo.length != 0"
                  v-infinite-scroll="getOrderList"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
              <section v-for="(item, index) in orderListtwo"
                        :key="index"
                        class="order-wrap"
                        @click="linkjump(`orderDetail/${item.id}`)">
                <div class="order-title-box">
                  <div class="flex-box">
                    <p class="order-text-1">{{item.name}}  {{item.phone}}</p>
                    <a class="tel-text" :href="'tel:'+item.phone">聯繫團員</a>
                  </div>
                  <p class="order-text-1">{{item.address}}</p>
                </div>
                <div class="order-content-box">
                  <div class="good-item">
                    <span class="order-text-2">商品總額</span>
                    <span class="order-text-3">{{'$ '+ item.price}}</span>
                  </div>
                  <div class="good-item">
                    <span class="order-text-2">商品件數</span>
                    <span class="order-text-3">{{item.totalNum + ' 件'}}</span>
                  </div>
                  <div class="order-info-box">
                    <span class="order-no">訂單編號：{{item.id}}</span>
                    <span class="order-get">{{'已取 '+item.pickNum+' 件'}}</span>
                    <button class="status-btn" v-if="item.status != 4">取貨</button>
                    <div class="finish-btn " v-else>
                      <i class="check-btn-icon"></i>
                      <label>已完成</label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section class="no-order-wrap" v-else>
              <label>所選時段還沒有訂單哦</label>
            </section>
          </div>
        </tab-container-item>
        <tab-container-item id="thr">
          <div class="tab-container-wrap">
            <div v-if="orderListthr.length != 0"
                  v-infinite-scroll="getOrderList"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
              <section v-for="(item, index) in orderListthr"
                        :key="index"
                        class="order-wrap"
                        @click="linkjump(`orderDetail/${item.id}`)">
                <div class="order-title-box">
                  <div class="flex-box">
                    <p class="order-text-1">{{item.name}}  {{item.phone}}</p>
                    <a class="tel-text" :href="'tel:'+item.phone">聯繫團員</a>
                  </div>
                  <p class="order-text-1">{{item.address}}</p>
                </div>
                <div class="order-content-box">
                  <div class="good-item">
                    <span class="order-text-2">商品總額</span>
                    <span class="order-text-3">{{'$ '+ item.price}}</span>
                  </div>
                  <div class="good-item">
                    <span class="order-text-2">商品件數</span>
                    <span class="order-text-3">{{item.totalNum + ' 件'}}</span>
                  </div>
                  <div class="order-info-box">
                    <span class="order-no">訂單編號：{{item.id}}</span>
                    <span class="order-get">{{'已取 '+item.pickNum+' 件'}}</span>
                    <button class="status-btn" v-if="item.status != 4">取貨</button>
                    <div class="finish-btn " v-else>
                      <i class="check-btn-icon"></i>
                      <label>已完成</label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section class="no-order-wrap" v-else>
              <label>所選時段還沒有訂單哦</label>
            </section>
          </div>
        </tab-container-item>
      </tab-container>
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
import { Navbar, TabItem, TabContainer, TabContainerItem, Popup, Picker } from 'mint-ui'
import { MessageBox, MyAside, CollapseItem } from 'components'
import { getCurrentDay, getCurrentWeek, getCurrentMonth, getBeforeMonth } from 'utils/utils'
import { agentOrders } from 'utils/getData'

const currentD = getCurrentDay()
const currentW = getCurrentWeek()
const currentM = getCurrentMonth()
const beforeMonth = getBeforeMonth(12)
const pageLimit = '10'
let totalPages = {
  'one': 1,
  'two': 1,
  'thr': 1
}
let pageNos = {
  'one': 0,
  'two': 0,
  'thr': 0
}
let statusConf = {
  'one': '',
  'two': 1,
  'thr': 3
}
let loading = false
export default {
  data () {
    return {
      selected: "one",
      otherMonthVisible: false,
      timeshow: false,
      current : {
        'one': '0',
        'two': '0',
        'thr': '0'
      },
      timeConf: [
        {
          text: '今日',
          click: () => {
            pageNos[this.selected] = 0
            totalPages[this.selected] = 1
            this[`orderList${this.selected}`] = []
            this.$set(this.current, this.selected, '0')
            this.timeshow = false
            this.getOrderList()
          }
        },{
          text: '本週',
          click: () => {
            pageNos[this.selected] = 0
            totalPages[this.selected] = 1
            this[`orderList${this.selected}`] = []
            this.$set(this.current, this.selected, '1')
            this.timeshow = false
            this.getOrderList()
          }
        },{
          text: '本月',
          click: () => {
            pageNos[this.selected] = 0
            totalPages[this.selected] = 1
            this[`orderList${this.selected}`] = []
            this.$set(this.current, this.selected, '2')
            this.timeshow = false
            this.getOrderList()
          }
        }
      ],
      orderListone: [],
      orderListtwo: [],
      orderListthr: []
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
      const cArr = this.current[this.selected].split('-')
      console.log(cArr)
      switch (cArr[0]) {
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
      const cArr = this.current[this.selected].split('-')
      switch (cArr[0]) {
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
    Navbar,
    TabItem,
    TabContainer,
    TabContainerItem,
    MyAside,
    CollapseItem,
    mtPopup: Popup,
    mtPicker: Picker
  },
  mounted () {
    this.timeConf[0].click()
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
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
      pageNos[this.selected] = 0
      totalPages[this.selected] = 1
      this[`orderList${this.selected}`] = []
      this.timeshow = false
      this.$set(this.current, this.selected, `3-${index}`)
      this.getOrderList()
      this.otherMonthVisible = false
    },
    async getOrderList () {
      console.log('----', pageNos[this.selected], '----', totalPages[this.selected], '---', pageNos[this.selected] >= totalPages[this.selected])
      if (pageNos[this.selected] >= totalPages[this.selected]) {
        return false
      }
      if (loading) {
        return false
      }
      pageNos[this.selected]++
      const params = {
        "page": pageNos[this.selected],
        "limit": pageLimit,
        "pickStatus": statusConf[this.selected],
        "startTime": this.currentTime.start,
        "endTime": this.currentTime.end
      }
      loading = true
      const data = await agentOrders(params)
      if (data.code == 0) {
        this[`orderList${this.selected}`].push(...data.data.list)
        totalPages[this.selected] = data.data.totalPage
      }
      loading = false
    }
  },
  watch: {
    selected (newV, oldV) {
      // if (this[`orderList${newV}`].length == 0) {
      //   this.currentTime = '今日'
      //   this.timeConf[0].click()
      // }
      this.timeshow = false
      this.getOrderList()
    }
  }
}
</script>

<style lang="scss">
body {
  background: #F6F6F6;
}
.page-wrap {
  width: 100%;
  height: 100%;
  .page-title {
    background: #ffffff;
  }
  .page-content {
    .nav-tab-wrap {
      height: 3.5rem;
      margin-bottom: 1rem;
      .nav-tab-item {
        height: 100%;
        box-sizing: border-box;
        padding: 0;
        text-align: center;
        color: #A3A3AE;
        .mint-tab-item-label {
          font-size: 1.6rem;
          display: inline-block;
          height: 100%;
          line-height: 3.5rem;
          box-sizing: border-box;
          padding: 0 .4rem;
        }
      }
      .is-selected {
        color: #1CD0A3;
        text-decoration: none;
        border: none;
        .mint-tab-item-label {
          border-bottom: .2rem solid #1CD0A3;
        }
      }
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
    .tab-container-wrap {
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

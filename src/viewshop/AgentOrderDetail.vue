<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>團員訂單</h1>
    </div>
    <div class="page-content">
      <div class="order-wrap">
        <div class="order-title-box">
          <div class="flex-box leader-info-box">
            <p class="order-text-1">{{orderInfo.name}}  {{orderInfo.phone}}</p>
            <a class="tel-text" :href="'tel:'+orderInfo.phone" @click.stop="">聯繫團員</a>
          </div>
          <p class="order-text-1">{{orderInfo.address}}</p>
        </div>
         <div class="order-info-box">
          <span class="order-no">訂單編號：{{orderInfo.id}}</span>
          <span class="order-time">{{orderInfo.createAt}}</span>
        </div>
      </div>
      <div class="order-detail-wrap">
        <div class="detail-title">
          <label>{{orderInfo.totalNum + '件商品'}} / {{'總計 $'+ fenTransYuan(orderInfo.price+orderInfo.deliverFee)}}</label>
        </div>
        <section class="detail-content">
          <div v-for="(prodItem, index) in orderInfo.productList"
                :key="index"
                :class="['order-item', prodItem.isPick == 1?'over-order':'']">
            <div class="order-item-flex">
              <div class="order-item-status-box">
                <label class="order-item-status" v-if="orderInfo.status == 5">取消</label>
                <label class="order-item-status" v-else-if="prodItem.isPick == 1">已取</label>
                <label class="order-item-status" v-else-if="!isVerifed">未取貨</label>
                <i :class="['radius-circle', isVerifed && selectCart.indexOf(prodItem.productId) != -1 ? 'radius-check' : '']"
                  @click="checkItem(prodItem.productId)"
                  v-else></i>
              </div>
              <img :src="prodItem.pic" alt="" class="good-img">
              <div class="order-item-detail">
                <p class="good-name">{{prodItem.productName}}</p>
                <div class="flex-box">
                  <div class="count-box">
                    <span>數量</span>
                    <span>{{prodItem.num}}</span>
                  </div>
                  <label class="good-price">{{'$'+fenTransYuan(prodItem.price)}}</label>
                </div>
              </div>
            </div>
            <div class="get-time">{{'取貨時間：' + prodItem.takeTimeStr + '後'}}</div>
            <div class="solid-hr" v-show="index !== orderInfo.productList.length-1"></div>
          </div>
          <div class="memo-box">
            <span class="memo-title">備註：</span>
            <div class="memo-input-wrap">
              {{orderInfo.memo}}
            </div>
          </div>
          <div class="dash-hr"></div>
        </section>
        <div class="total-wrap">
          <label>商品總計</label>
          <span class="total-price">{{'$'+fenTransYuan(orderInfo.price)}}</span>
        </div>
        <div class="total-wrap" v-if="orderInfo.pickWay == 2">
          <label>配送费</label>
          <span class="total-price">${{fenTransYuan(orderInfo.deliverFee)}}</span>
        </div>
      </div>
      <section class="bottom-block-wrap">
        <div class="status-wrap" v-if="orderInfo.status == 4">
          <div class="finish-btn">
            <i class="check-btn-icon"></i>
            <label>已完成</label>
          </div>
        </div>
        <div class="status-wrap" v-else-if="orderInfo.status == 5">
          <div class="finish-btn">
            <i class="check-btn-icon"></i>
            <label>已取消</label>
          </div>
        </div>
        <div class="verify-wrap" v-else-if="orderInfo.status != 4 && !isVerifed">
          <div class="input-box">
            <input type="text" v-model="pickCode" placeholder="輸入驗證碼">
          </div>
          <div class="submit-btn" @click="handleVerify">
            <label>確認</label>
          </div>
        </div>
        <div class="comfirm-wrap" v-else>
          <div class="all-select" @click="allSelect">
            <i :class="['radius-circle', allSelected ? 'radius-check' : '']"></i>
            <span>全選</span>
          </div>
          <div class="info-wrap">
            <p class="total-count">合計：${{fenTransYuan(moneyCount.count+moneyCount.fee)}}</p>
            <p class="detail-count">總額:${{fenTransYuan(orderInfo.price+orderInfo.deliverFee)}}  剩餘:${{fenTransYuan(orderInfo.price+orderInfo.deliverFee-moneyCount.count-moneyCount.fee)}}</p>
          </div>
          <div class="submit-btn" @click="handleComfirm">
            <label>確認</label>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { CommonHeader } from 'components'
import { Toast } from 'mint-ui'
import { getOrderDetail, checkPickCode, agentComfirm } from 'utils/getData'
import { fenTransYuan } from 'utils/utils'
export default {
  data () {
    return {
      isVerifed: false, // 訂單在為結束狀態下是否驗證過
      pickCode: '', // 驗證碼
      selectCart: [],
      orderInfo: {},
      orderId: this.$route.params.orderId,
    }
  },
  computed: {
    allSelected () {
      let flag = true
      this.orderInfo.productList = this.orderInfo.productList?this.orderInfo.productList:[]
      for (let i = 0;i < this.orderInfo.productList.length; i++) {
        if (this.orderInfo.productList[i].isPick == 1) {
          continue
        }
        if (this.selectCart.indexOf(this.orderInfo.productList[i].productId) == -1) {
          flag = false
          break
        }
      }
      return flag
    },
    moneyCount () {
      let totalM = 0
      let feeM = 0
      this.orderInfo.productList.map(item => {
        if (this.selectCart.indexOf(item.productId) != -1) {
          totalM += item.price*item.num
        }
      })
      feeM += this.orderInfo.deliverFee
      return {
        count: totalM,
        fee: feeM
      }
    }
  },
  mounted () {
    if (!localStorage['isAgent'] || localStorage['isAgent'] == 'undefined') {
      this.$router.replace('/home')
      return false
    }
    this.init()
  },
  components: {
    CommonHeader
  },
  methods: {
    init () {
      this.getOrderDetail()
      if (this.$route.query.pickCode) {
        this.pickCode = this.$route.query.pickCode
        this.handleVerify()
      }
    },
    linkjump (href) {
      this.$router.push(href)
    },
    fenTransYuan: fenTransYuan,
    historyBack () {
      history.go(-1)
    },
    async handleVerify () {
      if (this.pickCode === '') {
        Toast('請輸入驗證碼')
        return false
      }
      const params = {
        pickCode: this.pickCode
      }
      const data = await checkPickCode(params)
      if (data.code == 0) {
        if (data.orderId == this.orderId) {
          this.isVerifed = true
        } else {
          Toast('驗證碼錯誤')
        }
      }
    },
    async handleComfirm () {
      if (this.selectCart.length == 0) {
        Toast('請選擇需要確認的商品')
        return false
      }
      if (this.orderInfo.status == 1 || this.orderInfo.status == 2) {
        Toast('此訂單還未配送')
        return false
      }
      const params = {
        orderId: this.orderId,
        productIds: this.selectCart.join(",")
      }
      const data = await agentComfirm(params)
      if (data.code == 0) {
        this.getOrderDetail()
      }
    },
    async getOrderDetail () {
      const params = {
        orderId: this.orderId
      }
      const data = await getOrderDetail(params)
      if (data.code == 0) {
        this.orderInfo = data.data
      }
    },
    allSelect () {
      if (this.selectCart.length != 0) {
        this.selectCart = []
      } else {
        this.selectCart = []
        this.orderInfo.productList.map(item => {
          if (item.isPick == 1 ) {
            return false
          }
          this.selectCart.push(item.productId)
        })
      }
    },
    checkItem (orderId) {
      if (this.selectCart.indexOf(orderId) == -1) {
        this.selectCart.push(orderId)
      } else {
        for (let i = 0; i < this.selectCart.length; i++) {
          if (this.selectCart[i] === orderId) {
            this.selectCart.splice(i, 1)
            break
          }
        }
      }
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
    margin-bottom: 1.6rem;
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
    .radius-check {
      background-image: url('../assets/images/check-seleted.png') !important;
    }
    .order-wrap {
      width: 100%;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.09);
      border-radius: .2rem;
      margin-bottom: 1.9rem;
      @media screen and (min-width: $screenMid) {
        border: 1px solid #D5D5D5;
      }
      .order-text-1 {
        text-align: left;
        font-size: 1.7rem;
        color: #444444;
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
            margin-right: 3rem;
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
      .order-info-box {
        height: 5.65rem;
        box-sizing: border-box;
        padding: 0 1.1rem 0 1.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #777776;
        .order-no {
          font-size: 1.4rem;
          color: #777776;
        }
      }
    }
    .order-detail-wrap {
      @include backImg('../assets/images/rectangletip.png');
      padding-bottom: 3rem;
      @media screen and (min-width: $screenMid) {
        box-shadow: .5rem 0px .5rem -.5rem rgba(0,0,0,0.11), -.5rem 0px .5rem -.5rem rgba(0,0,0,0.11);
      }
      .detail-title {
        width: 100%;
        height: 4.9rem;
        @extend .theme-color;
        line-height: 4.9rem;
        box-sizing: border-box;
        padding-left: 2rem;
        text-align: left;
        font-size: 1.8rem;
        color: #ffffff;
        box-shadow: 0 1px .5rem 0 rgba(0,0,0,0.11);
        border-radius: .4rem;
      }
      .detail-content {
        .order-item {
          box-sizing: border-box;
          padding: 1.9rem 1.65rem 0 1.8rem;
          .order-item-flex {
            height: 6.25rem;
            margin-bottom: .9rem;
            display: flex;
            align-items: center;
            .order-item-status-box {
              width: 5rem;
              font-size: 1.4rem;
              text-align: center;
              color: #1CD0A3;
              margin-right: .4rem;
              @media screen and (min-width: $screenMid) {
                width: 20rem;
              }
              .order-item-status {
                display: inline-block;
                width: 100%;
                height: 1.8rem;
                line-height: 1.8rem;
                @media screen and (min-width: $screenMid) {
                  width: 10rem;
                  font-size: 2rem;
                  height: 3.6rem;
                  line-height: 3.6rem;
                }
              }
            }
            .radius-circle {
              display: inline-block;
              width: 5rem;
              height: 2rem;
              margin-right: 1.8rem;
              @include backImg('../assets/images/check-item.png');
              background-position: center center;
              background-size: 1.8rem 1.8rem;
            }
            .good-img {
              width: 6.25rem;
              height: 6.25rem;
              margin-right: 1rem;
            }
            .order-item-detail {
              flex: 1;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .good-name {
                font-size: 1.2rem;
                color: #444444;
              }
              .flex-box {
                width: 100%;
                .count-box {
                  width: 7.7rem;
                  height: 3rem;
                  @extend .theme-color;
                  @extend .flex-box;
                  border-radius: .5rem;
                  box-sizing: border-box;
                  padding: 0 1.6rem;
                  font-size: 1.4rem;
                  color: #FFFFFF;
                }
                .good-price {
                  font-size: 2rem;
                  color: #1CD0A3;
                  @media screen and (min-width: $screenMid) {
                    font-size: 2.4rem;
                  }
                }
              }
            }
          }
          .get-time {
            padding-left: 6.4rem;
            font-size: 1.2rem;
            color: #444444;
            padding-bottom: 2.7rem;
            @media screen and (min-width: $screenMid) {
              padding-left: 20.4rem;
            }
          }
        }
        .over-order {
          background: #F6F6F6;
          .order-item-flex {
            .order-item-status-box {
              .order-item-status {
                border-radius: 1.8rem;
                background: #D8D8D8;
                font-size: 1.3rem;
                color: #FFFFFF;
                @media screen and (min-width: $screenMid) {
                  font-size: 2rem;
                  height: 3.6rem;
                  border-radius: 3.6rem;
                  line-height: 3.6rem;
                }
              }
            }
          }
        }
        .solid-hr {
          width: 100%;
          border-bottom: 1px solid #E2E2E2;
        }
        .memo-box {
          width: 100%;
          height: 2rem;
          padding: 0 1.65rem 0 2.65rem;
          font-size: 1.2rem;
          box-sizing: border-box;
          @extend .flex-box;
          justify-content: flex-start;
          align-items: flex-start;
          font-size: 1.2rem;
          color: #444444;
          @media screen and (min-width: $screenMid) {
            font-size: 1.4rem;
          }
          .memo-title {
            margin-right: 1rem;
          }
          .memo-input-wrap {
            flex: 1;
            // border-bottom: 1px solid #0B2031;
          }
        }
        .dash-hr {
          width: 90%;
          margin-left: 5%;
          border-bottom: 1px dashed #0B2031;
        }
      }
      .total-wrap {
        width: 100%;
        box-sizing: border-box;
        padding: 0 1.7rem 0 2rem;
        height:  4.7rem;
        @extend .flex-box;
        font-size: 1.8rem;
        color: #444444;
        .total-price {
          font-size: 2.4rem;
          color: #1CD0A3;
        }
      }
    }
    .bottom-block-wrap {
      padding-bottom: 3.5rem;
      .verify-wrap {
        padding-top: 2.3rem;
        width: 100%;
        @extend .flex-box;
        height: 4.1rem;
        @media screen and (min-width: $screenMid) {
          width: 80%;
          margin: 0 auto;
        }
        .input-box {
          width: 50%;
          height: 4rem;
          background: #FFFFFF;
          box-shadow: 0 .3rem 1rem 0 rgba(0,0,0,0.10);
          box-sizing: border-box;
          padding: .9rem 1.3rem;
          input {
            display: block;
            height: 100%;
          }
        }
        .submit-btn {
          display: block;
          width: 42.8%;
          height: 4.1rem;
          @extend .theme-color;
          border-radius: 1.25rem;
          text-align: center;
          line-height: 4.1rem;
          color: #ffffff;
          font-size: 1.8rem;
        }
      }
      .comfirm-wrap {
        padding-top: 1.8rem;
        width: 100%;
        @extend .flex-box;
        height: 4.4rem;
        .all-select {
          font-size: 1.4rem;
          color: #444444;
          padding-left: .8rem;
          @extend .flex-box;
          .radius-circle {
            width: 1.8rem;
            height: 1.8rem;
            @include backImg('../assets/images/check-item.png');
            margin-right: 1rem;
          }
        }
        .info-wrap {
          .total-count {
            font-size: 1.8rem;
            color: #444444;
            font-weight: bold;
          }
          .detail-count {
            font-size: 1.4rem;
            color: #444444;
          }
        }
        .submit-btn {
          width: 8.5rem;
          height: 4.1rem;
          @extend .theme-color;
          border-radius: 1.25rem;
          text-align: center;
          line-height: 4.1rem;
          color: #ffffff;
          font-size: 1.8rem;
          @media screen and (min-width: $screenMid) {
            width: 20rem;
          }
        }
      }
      .status-wrap {
        padding-top: 2.9rem;
        display: flex;
        justify-content: center;
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
</style>

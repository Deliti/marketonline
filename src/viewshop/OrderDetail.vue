<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>訂單詳情</h1>
    </div>
    <div class="page-content">
      <div class="order-wrap">
        <div class="order-title-box">
          <div class="flex-box">
            <p class="order-text-1">團長：{{orderInfo.agentName}}  {{orderInfo.agentPhone}}</p>
            <a class="tel-text" :href="'tel:'+orderInfo.agentPhone" @click.stop="">聯繫團長</a>
          </div>
          <p class="order-text-1">{{orderInfo.agentAddress}}</p>
        </div>
         <div class="order-info-box">
          <span class="order-no">訂單編號：{{orderInfo.id}}</span>
        </div>
      </div>
      <div class="order-detail-wrap">
        <div class="detail-title">
          <label>{{orderInfo.totalNum + '件商品'}} / {{'總計 $'+ orderInfo.price+orderInfo.deliverFee}}</label>
        </div>
        <section class="detail-content">
          <div v-for="(prodItem, index) in orderInfo.productList"
                :key="index"
                :class="['order-item', prodItem.isPick == 1?'over-order':'']">
            <div class="order-item-flex">
              <label class="order-item-status">{{prodItem.isPick == 1?'已取':'未取貨'}}</label>
              <img :src="prodItem.pic" alt="" class="good-img">
              <div class="order-item-detail">
                <p class="good-name">{{prodItem.productName}}</p>
                <div class="flex-box">
                  <div class="count-box">
                    <span>數量</span>
                    <span>{{prodItem.num}}</span>
                  </div>
                  <label class="good-price">{{'$'+prodItem.price}}</label>
                </div>
              </div>
            </div>
            <div class="get-time">{{'取貨時間：' + prodItem.takeTimeStr + '後'}}</div>
            <div class="solid-hr" v-show="index !== orderInfo.productList.length-1"></div>
          </div>
          <!-- <div class="order-item">
            <div class="order-item-flex">
              <label class="order-item-status">未取貨</label>
              <img src="" alt="" class="good-img">
              <div class="order-item-detail">
                <p class="good-name">進口百香果 90G-110G/個</p>
                <div class="flex-box">
                  <div class="count-box">
                    <span>數量</span>
                    <span>1</span>
                  </div>
                  <label class="good-price">$38</label>
                </div>
              </div>
            </div>
            <div class="get-time">取貨時間：11月3日（星期六）16:00後</div>
          </div> -->
          <div class="dash-hr"></div>
        </section>
        <div class="total-wrap">
          <label>商品總計</label>
          <span class="total-price">{{'$'+orderInfo.price}}</span>
        </div>
        <div class="total-wrap" v-if="orderInfo.pickWay == 2">
          <label>配送费</label>
          <span class="total-price">${{orderInfo.deliverFee}}</span>
        </div>
      </div>
      <div class="over-wrap" v-if="orderInfo.status == 4">
        <button class="suggest-btn" @click="linkjump('suggest')">反饋意見</button>
        <div class="finish-btn">
          <i class="check-btn-icon"></i>
          <label>已完成</label>
        </div>
      </div>
      <div class="code-info" v-else>
        <div class="code-box">
          取貨驗證碼<br>
          <span>{{orderInfo.pickCode}}</span>
        </div>
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
    </div>
  </div>
</template>

<script>
import qrCode from 'qrcodejs2'
import { mapState, mapMutations } from 'vuex'
import { getOrderDetail } from 'utils/getData'

export default {
  data () {
    return {
      orderId: this.$route.params.orderId,
      orderInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapState(['shopCart'])
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    init () {
      this.getOrderDetail()
    },
    async getOrderDetail () {
      const params = {
        orderId: this.orderId
      }
      const data = await getOrderDetail(params)
      if (data.code == 0) {
        this.orderInfo = data.data
        if (this.orderInfo.status != 4) {
          this.qrcode(this.orderInfo.pickCode)
        }
      }
    },
    qrcode (text) {
      var qrcode = new qrCode(this.$refs.qrCodeUrl, {
        text: text,
        width: '107.5',
        height: '107.5'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #F6F6F6;
  .page-title {
    background: #ffffff;
    margin-bottom: 1.6rem;
  }
  .page-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .7rem;
    .order-wrap {
      width: 100%;
      box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.09);
      border-radius: .2rem;
      margin-bottom: 1.9rem;
      .order-text-1 {
        text-align: left;
        font-size: 1.7rem;
        color: #444444;
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
        }
      }
    }
    .order-detail-wrap {
      padding-bottom: 3rem;
      @include backImg('../assets/images/rectangletip.png');
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
          height: 12.1rem;
          box-sizing: border-box;
          padding: 1.9rem 1.65rem 2.7rem 1.8rem;
          .order-item-flex {
            height: 6.25rem;
            margin-bottom: .9rem;
            display: flex;
            align-items: center;
            .order-item-status {
              width: 5rem;
              height: 1.8rem;
              font-size: 1.4rem;
              line-height: 1.8rem;
              text-align: center;
              color: #1CD0A3;
              margin-right: 1.8rem;
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
                  font-size: 1.6rem;
                  color: #1CD0A3;
                }
              }
            }
          }
          .get-time {
            padding-left: 6.4rem;
            font-size: 1.2rem;
            color: #444444;
          }
        }
        .over-order {
          background: #F6F6F6;
          .order-item-flex {
            .order-item-status {
              border-radius: 1.8rem;
              background: #D8D8D8;
              font-size: 1.3rem;
              color: #FFFFFF;
            }
          }
        }
        .solid-hr {
          width: 100%;
          border-bottom: 1px solid #E2E2E2;
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
    .code-info {
      padding-top: 3.6rem;
      .code-box {
        font-size: 1.8rem;
        color: #444444;
        text-align: center;
        span {
          font-size: 2.4rem;
        }
      }
      .qrcode {
        width: 10.75rem;
        height: 10.75rem;
        margin: .5rem auto 0;
        padding-bottom: 3.3rem;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .over-wrap {
      padding: 2.4rem 0;
      display: flex;
      justify-content: flex-end;
      .finish-btn {
        width: 11.1rem;
        height: 3rem;
        margin-left: 1.5rem;
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
      .suggest-btn {
        width: 7.25rem;
        height: 3rem;
        background: #F2917C;
        border-radius: .2rem;
        text-align: center;
        line-height: 3rem;
        color: #ffffff;
      }
    }
  }
}
</style>

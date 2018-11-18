<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>團員訂單</h1>
    </div>
    <div class="page-content">
      <div class="order-wrap">
        <div class="order-title-box">
          <div class="flex-box">
            <p class="order-text-1">江先生  96XXXXXX</p>
            <a class="tel-text">聯繫團員</a>
          </div>
          <p class="order-text-1">XX馬路XX號XX樓XX棟XX房</p>
        </div>
         <div class="order-info-box">
          <span class="order-no">訂單編號：1000043</span>
        </div>
      </div>
      <div class="order-detail-wrap">
        <div class="detail-title">
          <label>2件商品 / 總計 $76.00</label>
        </div>
        <section class="detail-content">
          <div class="order-item over-order">
            <div class="order-item-flex">
              <label class="order-item-status">已取</label>
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
          </div>
          <div class="solid-hr"></div>
          <div class="order-item">
            <div class="order-item-flex">
              <label class="order-item-status" v-if="!isOverd && !isVerifed">未取貨</label>
              <i class="radius-circle" v-else></i>
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
          </div>
          <div class="dash-hr"></div>
        </section>
        <div class="total-wrap">
          <label>商品總計</label>
          <span class="total-price">$76.00</span>
        </div>
      </div>
      <section class="bottom-block-wrap">
        <div class="status-wrap" v-if="isOverd">
          <div class="finish-btn">
            <i class="check-btn-icon"></i>
            <label>已完成</label>
          </div>
        </div>
        <div class="verify-wrap" v-else-if="!isOverd && !isVerifed">
          <div class="input-box">
            <input type="text" v-model="verifyCode" placeholder="輸入驗證碼">
          </div>
          <div class="submit-btn" @click="handleVerify">
            <label>確認</label>
          </div>
        </div>
        <div class="comfirm-wrap" v-else>
          <div class="all-select">
            <i :class="['radius-circle', allSelected ? 'radius-check' : '']"></i>
            <span>全選</span>
          </div>
          <div class="info-wrap">
            <p class="total-count">合計：$38</p>
            <p class="detail-count">總額:$76  剩餘:$38</p>
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
export default {
  data () {
    return {
      isOverd: false, // 訂單狀態是否為結束狀態
      isVerifed: false, // 訂單在為結束狀態下是否驗證過
      verifyCode: '', // 驗證碼
      allSelected: false, // 是否全選
      selectCart: {}
    }
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
    },
    historyBack () {
      history.go(-1)
    },
    handleVerify () {
      if (this.verifyCode === '') {
        return false
      }
      this.isVerifed = true
    },
    handleComfirm () {
      this.isOverd = true
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
    .radius-check {
      background-image: url('../assets/images/check-seleted.png') !important;
    }
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
            .radius-circle {
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
                  width: 10.7rem;
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
                  font-size: 2.4rem;
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
          width: 90%;
          margin-left: 5%;
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
        height: 6.7rem;
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

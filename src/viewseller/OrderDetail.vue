<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon"></i>
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
          </div>
          <div class="dash-hr"></div>
        </section>
        <div class="total-wrap">
          <label>商品總計</label>
          <span class="total-price">$76.00</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    linkjump (href) {
      this.$router.push(href)
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
    
  }
}
</style>

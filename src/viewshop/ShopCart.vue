<template>
  <div class="page-wrap">
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon"></i>
      <h1>
        <i class="cart-icon"></i>
        <label>購物車</label>
      </h1>
    </div>
    <div class="page-content">
      <div class="person-info-wrap">
        <div class="person-info">
          <div class="info-title">
            <label class="info-tip">我的團長</label>
            <span class="edit-btn" @click="showLeader">更改</span>
          </div>
          <div class="info-content">
            <span>XXX街XX號XXX舖</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>陳XX 961XXXX</span>
          </div>
        </div>
        <div class="person-info">
          <div class="info-title">
            <label class="info-tip">我的地址</label>
            <p class="deliver-info">
              <i class="radius-circle radius-seleted"></i>
              <span>送貨上門 (配送費+$20)</span>
            </p>
            <span class="edit-btn" @click="showAddr">更改</span>
          </div>
          <div class="info-content">
            <span>XXX街XX號XXX樓XX房</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>陳XX 961XXXX</span>
          </div>
        </div>
      </div>
      <div class="order-detail-wrap" v-if="shopCart.length > 0">
        <div class="detail-title">
          <label v-show="shopCart.length>0">{{goodCount}}件商品 / 總計 ${{cartMoney}}</label>
        </div>
        <section class="detail-content">
          <div class="order-item"
                v-for="(item, index) in shopCart"
                :key="index">
            <div class="order-item-flex">
              <img src="" alt="" class="good-img">
              <div class="order-item-detail">
                <div class="name-box">
                  <p class="good-name">進口百香果 90G-110G/個</p>
                  <i class="close-icon" @click="deleteGoodCart(item)"></i>
                </div>
                <div class="flex-box">
                  <div class="count-box">
                    <span class="change-btn" @click.stop="desGoodCart(item)">-</span>
                    <span>{{item.count}}</span>
                    <span class="change-btn" @click.stop="addGoodCart(item)">+</span>
                  </div>
                  <label class="good-price">$38</label>
                </div>
              </div>
            </div>
            <div class="get-time">取貨時間：11月3日（星期六）16:00後</div>
            <div class="solid-hr" v-show="index !== shopCart.length-1"></div>
          </div>
          <!-- <div class="order-item">
            <div class="order-item-flex">
              <img src="" alt="" class="good-img">
              <div class="order-item-detail">
                <div class="name-box">
                  <p class="good-name">進口百香果 90G-110G/個</p>
                  <i class="close-icon"></i>
                </div>
                <div class="flex-box">
                  <div class="count-box">
                    <span class="change-btn">-</span>
                    <span>1</span>
                    <span class="change-btn">+</span>
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
          <span class="total-price">${{cartMoney}}</span>
        </div>
      </div>
      <div class="no-order-wrap" v-else>
        <div class="no-order-bg"></div>
        <div class="zero-box">
          <b>0</b>
          <span>件商品</span>
        </div>
        <p class="no-order-text">購物車裡還沒東西⋯</p>
      </div>
      <div class="submit-button" @click="comfirmOrder">
        <label>確認訂單</label>
      </div>
    </div>
    <my-aside :show="leaderShow" @hide="hideLeader">
      <div class="option-seleted">
        <div class="seleted-title">已選團長：</div>
        <p class="seleted-text">XX馬路XX號XX樓XX棟XX房<br>團長：江先生  96XXXXXX</p>
        <p class="no-seleted">—— 無 ——</p>
      </div>
      <div class="option-wrap">
        <div v-for="(item, index) in leaders"
              :key="index"
              class="option-item"
              @click="chooseLeader(item)">
          <i :class="['radius-icon', leader.id == item.id?'radius-seleted':'']"></i>
          <div class="option-box">
            <p class="option-text">XX馬路XX號XX樓XX棟XX房</p>
            <p class="option-text">團長：江先生  96XXXXXX</p>
          </div>
        </div>
      </div>
    </my-aside>
    <my-aside :show="addrShow" @hide="hideAddr">
      <div class="option-seleted">
        <div class="seleted-title">已選地址：</div>
        <p class="seleted-text">XX馬路XX號XX樓XX棟XX房<br>梁女士  96XXXXXX</p>
        <p class="no-seleted">—— 無 ——</p>
      </div>
      <div class="option-wrap">
        <div v-for="(item, index) in addrs"
              :key="index"
              class="option-item"
              @click="chooseAddr(item)">
          <i :class="['radius-icon', addr.id == item.id?'radius-seleted':'']"></i>
          <div class="option-box">
            <p class="option-text">XX馬路XX號XX樓XX棟XX房</p>
            <p class="option-text">梁女士  96XXXXXX</p>
          </div>
        </div>
      </div>
    </my-aside>
  </div>
</template>

<script>
import { MessageBox, MyAside } from 'components'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      leaderShow: false,
      addrShow: false,
      leaders: [
        {
          id: 1,
          name: '蒋先生'
        },
        {
          id: 2,
          name: '林先生'
        },
        {
          id: 3,
          name: '懂先生'
        }
      ],
      addrs: [
        {
          id: 1,
          name: '蒋先生'
        },
        {
          id: 2,
          name: '林先生'
        },
        {
          id: 3,
          name: '懂先生'
        }
      ],
      leader: {},
      addr: {}
    }
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['goodCount', 'cartMoney'])
  },
  components: {
    MyAside
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD', 'DELETEGOOD']),
    showLeader () {
      this.leaderShow = true
    },
    hideLeader () {
      this.leaderShow = false
    },
    chooseLeader (leader) {
      this.leader = leader
      this.hideLeader()
    },
    showAddr () {
      this.addrShow = true
    },
    hideAddr () {
      this.addrShow = false
    },
    chooseAddr (addr) {
      this.addr = addr
      this.hideAddr()
    },
    addGoodCart (goodInfo) {
      this.ADDGOOD(goodInfo)
    },
    desGoodCart (goodInfo) {
      this.DESGOOD(goodInfo.id)
    },
    deleteGoodCart (goodInfo) {
      this.DELETEGOOD(goodInfo.id)
    },
    isHasGood (goodId) {
      return this.shopCart.some(item => {
        return item.id === goodId
      })
    },
    getGoodCount (goodId) {
      let count = 0
      this.shopCart.some(item => {
        if (item.id === goodId) {
          count = item.count
        }
      })
      return count
    },
    comfirmOrder () {
      MessageBox({
        message: '<div class="cart-msg" style="text-align:left;">因取貨地點空間有限，請街坊於指定取貨日期和時間內取貨。<br/><br/>你所選擇的團長（取貨）地址：<br/><br/>XX馬路XX號XX樓XX棟XX房</div>',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: () => {
            console.log(321)
          }
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #ffffff;
  position: relative;
  .top-bg {
    width: 100%;
    height: 25.5rem;
    @include backImg('../assets/images/cart-bg.png');
    position: absolute;
    left: 0;top: 0;
  }
  .page-title {
    position: relative;
    color: #ffffff;
    .cart-icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      @include backImg('../assets/images/cart.png');
    }
  }
  .page-content {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4.5rem;
    .person-info-wrap {
      width: 100%;
      margin-bottom: 1.8rem;
      .person-info {
        margin-bottom: 1.5rem;
        &:last-child {
          margin-bottom: 0;
        }
        .info-title {
          @extend .flex-box;
          height: 2rem;
          font-size: 1.2rem;
          color: #FFFFFF;
          margin-bottom: .5rem;
          .info-tip {
            width: 5.5rem;
            height: 1.9rem;
            background: #444444;
            border-radius: .3rem;
            text-align: center;
            line-height: 1.9rem;
          }
          .deliver-info {
            .radius-circle {
              display: inline-block;
              vertical-align: middle;
              width: 1rem;
              height: 1rem;
              @include backImg('../assets/images/check-item.png');
            }
            .radius-seleted {
              background-image: url('../assets/images/radius-white-seleted.png');
            }
          }
          .edit-btn {
            padding-left: 1.3rem;
            @include backImg('../assets/images/pencil-edit-button.png');
            background-size: 1.2rem 1.2rem;
          }
        }
        .info-content {
          font-size: 1.2rem;
          color: #FFFFFF;
        }
      }
    }
    .order-detail-wrap {
      @include backImg('../assets/images/rectangletip.png');
      box-shadow: .5rem 0px .5rem -.5rem rgba(0,0,0,0.11), -.5rem 0px .5rem -.5rem rgba(0,0,0,0.11);
      margin-bottom: 4.1rem;
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
        border-radius: 0 0 .4rem .4rem;
      }
      .detail-content {
        .order-item {
          box-sizing: border-box;
          padding: 1.9rem 1.65rem .8rem 1.8rem;
          .order-item-flex {
            height: 6.25rem;
            margin-bottom: .9rem;
            display: flex;
            align-items: center;
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
              .name-box {
                display: flex;
                .good-name {
                  flex: 1;
                  font-size: 1.2rem;
                  color: #444444;
                }
                .close-icon {
                  width: 1rem;
                  height: 1rem;
                  @include backImg('../assets/images/delete-icon.png');
                  margin-left: .5rem;
                }
              }
              .flex-box {
                width: 100%;
                .count-box {
                  width: 10.7rem;
                  height: 3rem;
                  border-radius: .5rem;
                  box-sizing: border-box;
                  @extend .theme-color;
                  @extend .flex-box;
                  font-size: 1.4rem;
                  color: #FFFFFF;
                  .change-btn {
                    width: 30%;
                    height: 100%;
                    line-height: 3rem;
                    text-align: center;
                  }
                }
                .good-price {
                  font-size: 2.4rem;
                  color: #1CD0A3;
                }
              }
            }
          }
          .get-time {
            font-size: 1.2rem;
            color: #444444;
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
          margin-top: 1.8rem;
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
    .no-order-wrap {
      width: 20.3rem;
      position: relative;
      margin: 0 auto;
      margin-bottom: 6rem;
      .no-order-bg {
        width: 100%;
        height: 20.3rem;
        margin-bottom: 2.4rem;
        border-radius: 50%;
        @include backImg('../assets/images/empty-cart.png');
        background-position: center center;
        background-size: 10.5rem 10.5rem;
        background-color: #D8D8D8;
      }
      .zero-box {
        position: absolute;
        right: -1.6rem;top: .9rem;
        width: 6.6rem;
        height: 6.6rem;
        border-radius: 50%;
        background: #ffffff;
        box-sizing: border-box;
        border: 1px dashed #444444;
        text-align: center;
        padding-top: .5rem;
        font-size: 1rem;
        color: #444444;
        b {
          font-size: 2.8rem;
          color: #1CD0A3;
          display: block;
          line-height: 3.9rem;
        }
      }
      .no-order-text {
        font-size: 1.8rem;
        color: #D8D8D8;
        text-align: center;
      }
    }
    .submit-button {
      width: 100%;
      height: 4.1rem;
      margin-bottom: 3.5rem;
      @extend .theme-color;
      border-radius: 1.25rem;
      text-align: center;
      line-height: 4.1rem;
      color: #ffffff;
      font-size: 1.8rem;
    }
  }
  .option-seleted {
    .seleted-title {
      font-size: 1.4rem;
      color: #444444;
    }
    .seleted-text {
      font-size: 1.4rem;
      color: #000000;
      margin-bottom: 2rem;
    }
    .no-seleted {
      font-size: 1.8rem;
      color: #000000;
    }
  }
  .option-wrap {
    .option-title {
      font-size: 1.8rem;
      color: #444444;
    }
    .option-item {
      padding-top: 1rem;
      display: flex;
      .radius-icon{
        width: 1.4rem;
        height: 1.4rem;
        margin-right: .9rem;
        @include backImg('../assets/images/radius-item.png');
      }
      .radius-disable {
        @include backImg('../assets/images/radius-item-disabled.png');
      }
      .radius-seleted {
        @include backImg('../assets/images/radius-seleted.png');
      }
      .option-box {
        font-size: 1.4rem;
        color: #444444;
      }
    }
    .option-item-disable {
      .radius-icon {
        @include backImg('../assets/images/radius-item-disabled.png');
      }
      .option-box {
        color: #A4A4A4;
      }
    }
  }
  .cart-msg {
    text-align: left;
  }
}
</style>

<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="top-bg"></div>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
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
            <span>{{leader.agentAddress}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{leader.agentName}}  {{leader.agentPhone}}</span>
          </div>
          <my-aside :show="leaderShow" @hide="hideLeader" class="aside-wrap-polify">
            <div class="option-seleted">
              <div class="seleted-title">已選團長：</div>
              <p class="seleted-text" v-if="leader.agentId">{{leader.agentAddress}}<br>團長：{{leader.agentName}}  {{leader.agentPhone}}</p>
              <p class="no-seleted" v-else>—— 無 ——</p>
            </div>
            <div class="pc-option-seleted">
              <div class="seleted-title">常用團長：</div>
            </div>
            <div class="option-wrap">
              <div v-for="(item, index) in myLeaders"
                    :key="index"
                    :class="['option-item', isMyLeaers(item.agentId) ? 'option-item-disable' : '']"
                    @click="chooseLeader(item)">
                <i :class="['radius-icon', leader.agentId == item.agentId?'radius-seleted':'']"></i>
                <div class="option-box">
                  <p class="option-text">{{item.agentAddress}}</p>
                  <p class="option-text">團長：{{item.agentName}}  {{item.agentPhone}}</p>
                </div>
              </div>
            </div>
          </my-aside>
        </div>
        <div class="person-info">
          <div class="info-title addr-info-title">
            <label class="info-tip">我的地址</label>
            <p class="deliver-info" @click="changePickWay">
              <i :class="['radius-circle', selfPick ? 'radius-seleted' : '']"></i>
              <span>送貨上門 (配送費+${{leader.deliveryFee}})</span>
            </p>
            <span class="edit-btn" @click="showAddr">更改</span>
          </div>
          <div class="info-content">
            <span>{{addr.address}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{addr.name}} {{addr.phone}}</span>
          </div>
          <my-aside :show="addrShow" @hide="hideAddr" class="aside-wrap-polify">
            <div class="option-seleted">
              <div class="seleted-title">已選地址：</div>
              <p class="seleted-text" v-if="addr.id">{{addr.address}}<br>{{addr.name}}  {{addr.phone}}</p>
              <p class="no-seleted" v-else>—— 無 ——</p>
            </div>
            <div class="pc-option-seleted">
              <div class="seleted-title">常用地址：</div>
            </div>
            <div class="option-wrap">
              <div v-for="(item, index) in addrs"
                    :key="index"
                    class="option-item"
                    @click="chooseAddr(item)">
                <i :class="['radius-icon', addr.id == item.id?'radius-seleted':'']"></i>
                <div class="option-box">
                  <p class="option-text">{{item.address}}</p>
                  <p class="option-text">{{item.username}}  {{item.phone}}</p>
                </div>
              </div>
            </div>
          </my-aside>
        </div>
      </div>
      <div class="order-wrap">
        <div class="order-detail-wrap" v-if="shopCart.length > 0">
          <div class="detail-title">
            <label v-show="shopCart.length>0">{{goodCount}}件商品 / 總計 ${{selfPick?cartMoney+leader.deliveryFee:cartMoney}}</label>
          </div>
          <section class="detail-content">
            <div class="order-item"
                  v-for="(item, index) in shopCart"
                  :key="index">
              <div class="order-item-flex">
                <img :src='item.pic' alt="" class="good-img">
                <div class="order-item-detail">
                  <div class="name-box">
                    <p class="good-name">{{item.productName}}</p>
                    <i class="close-icon" @click="deleteGoodCart(item)"></i>
                  </div>
                  <div class="count-flex-box">
                    <div class="count-box">
                      <span class="change-btn" @click.stop="desGoodCart(item)">-</span>
                      <span>{{item.count}}</span>
                      <span class="change-btn" @click.stop="addGoodCart(item)">+</span>
                    </div>
                    <label class="good-price">${{item.money}}</label>
                  </div>
                </div>
              </div>
              <div class="get-time">取貨時間：{{item.takeTime}}後</div>
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
          <div class="total-wrap" v-if="selfPick">
            <label>配送费</label>
            <span class="total-price">${{leader.deliveryFee}}</span>
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
          <label>{{shopCart.length == 0 ? '去落單' : '確認訂單'}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CommonHeader, MessageBox, MyAside } from 'components'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getMyLeader, getMyAddr, getAllCartList, updateCart, playOrder } from 'utils/getData'

let loading = false
export default {
  data () {
    return {
      leaderShow: false,
      addrShow: false,
      myLeaders: [],
      addrs: [],
      leader: {},
      addr: {},
      selfPick: false
    }
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['goodCount', 'cartMoney'])
  },
  components: {
    MyAside,
    CommonHeader
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations(['UPDATECART', 'ADDGOOD', 'DESGOOD', 'DELETEGOOD', 'CLEARCART']),
    init () {
      this.getAllCartList()
      this.getMyLeader()
      this.getMyAddr()
    },
    historyBack () {
      history.go(-1)
    },
    async getMyLeader () {
      const params = {
        pageNo: 0,
        pageSize: 100
      }
      const data = await getMyLeader(params)
      if (data.code == 0) {
        this.leader = data.page.list.filter(item => item.status === 0)[0]
        this.myLeaders = data.page.list
      }
    },
    async getMyAddr () {
      const data = await getMyAddr()
      if (data.code == 0) {
        this.addr = data.page.list.length > 0 ? data.page.list[0] : {}
        this.addrs = data.page.list
      }
    },
    isMyLeaers (leaderId) {
      return this.leader.agentId === leaderId
    },
    showLeader () {
      this.leaderShow = true
    },
    hideLeader () {
      this.leaderShow = false
    },
    chooseLeader (leader) {
      if (this.isMyLeaers(leader.agentId)) {
        return false
      }
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
    async addGoodCart (goodInfo) {
      if (loading) {
        return false
      }
      loading = true
      const thisGood = this.shopCart.filter(item => item.id == goodInfo.id)
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        const params = {
          productId: goodInfo.id,
          num: count+1
        }
        const data = await updateCart(params)
        if (data.code == 0) {
          this.ADDGOOD(goodInfo)
        }
        loading = false
      } else {
        const params = {
          productId: goodInfo.id,
          num: 1
        }
        const data = await addCart(params)
        if (data.code == 0) {
          this.ADDGOOD(goodInfo)
        }
        loading = false
      }
    },
    async getAllCartList () {
      if (loading) {
        return false
      }
      loading = true
      const params = {}
      const data = await getAllCartList(params)
      if (data.code == 0) {
        this.UPDATECART(data.data)
      }
      loading = false
    },
    async desGoodCart (goodInfo) {
      if (loading) {
        return false
      }
      loading = true
      const thisGood = this.shopCart.filter(item => item.id == goodInfo.id)
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        const params = {
          productId: goodInfo.id,
          num: count-1
        }
        const data = await updateCart(params)
        if (data.code == 0) {
          this.DESGOOD(goodInfo.id)
        }
        loading = false
      }
    },
    deleteGoodCart (goodInfo) {
      MessageBox({
        message: '是否删除该商品',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: async () => {
            if (loading) {
              return false
            }
            loading = true
            const thisGood = this.shopCart.filter(item => item.id == goodInfo.id)
            if (thisGood.length > 0) {
              const params = {
                productId: goodInfo.id,
                num: 0
              }
              const data = await updateCart(params)
              loading = false
              if (data.code == 0) {
                this.getAllCartList()
              }
            }
          }
        }]
      })
    },
    isHasGood (goodId) {
      return this.shopCart.some(item => {
        return item.id === goodId
      })
    },
    changePickWay () {
      this.selfPick = !this.selfPick
    },
    comfirmOrder () {
      if (this.shopCart.length == 0) {
        this.$router.push('home')
        return false
      }
      MessageBox({
        message: `<div class="cart-msg" style="text-align:left;">因取貨地點空間有限，請街坊於指定取貨日期和時間內取貨。<br/><br/>你所選擇的團長：${this.leader.agentName}<br/><br/>（取貨）地址：${this.leader.agentAddress}</div>`,
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: () => {
            this.playOrder()
          }
        }]
      })
    },
    async playOrder () {
      const productList = this.shopCart.map(item => {
        return {
          productId: item.productId,
          num: item.count
        }
      })
      const params = {
        "pickWay": this.selfPick?1:2,
        "addressId": this.addr.id,
        "agentId": this.leader.agentId,
        "productList": productList
      }
      const data = await playOrder(params)
      if (data.code == 0) {
        this.CLEARCART()
        this.$router.push(`orderDetail/${data.orderId}`)
      }
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
    @media screen and (min-width: $screenMid) {
      display: none;
    }
  }
  .page-title {
    position: relative;
    color: #ffffff;
    background: none;
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
    padding: 0 3.3rem;
    @media screen and (min-width: $screenMid) {
      width: $screenWidth;
      padding: 3.3rem 1.5rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
    }
    .person-info-wrap {
      width: 100%;
      margin-bottom: 1.8rem;
      @media screen and (min-width: $screenMid) {
        width: 23.8rem;
      }
      .person-info {
        margin-bottom: 1.5rem;
        @media screen and (min-width: $screenMid) {
          margin-bottom: 3.2rem;
        }
        &:last-child {
          margin-bottom: 0;
        }
        .info-title {
          @extend .flex-box;
          height: 2rem;
          font-size: 1.2rem;
          color: #FFFFFF;
          margin-bottom: .5rem;
          position: relative;
          @media screen and (min-width: $screenMid) {
            font-size: 1.4rem;
            margin-bottom: .7rem;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .info-tip {
            width: 5.5rem;
            height: 1.9rem;
            background: #444444;
            border-radius: .3rem;
            text-align: center;
            line-height: 1.9rem;
            @media screen and (min-width: $screenMid) {
              margin-bottom: .7rem;
            }
          }
          .deliver-info {
            @media screen and (min-width: $screenMid) {
              font-size: 1.4rem;
              color: #444444;
            }
            .radius-circle {
              display: inline-block;
              vertical-align: middle;
              width: 1rem;
              height: 1rem;
              @include backImg('../assets/images/check-item.png');
              @media screen and (min-width: $screenMid) {
                margin-right: .9rem;
              }
            }
            .radius-seleted {
              background-image: url('../assets/images/radius-white-seleted.png');
              @media screen and (min-width: $screenMid) {
                background-image: url('../assets/images/radius-seleted.png');
              }
            }
          }
          .edit-btn {
            padding-left: 1.3rem;
            @include backImg('../assets/images/pencil-edit-button.png');
            background-size: 1.2rem 1.2rem;
            @media screen and (min-width: $screenMid) {
              cursor: pointer;
              font-size: 1.4rem;
              color: #444444;
              @include backImg('../assets/images/pc-pencil-edit-button.png');
              background-size: 1rem 1rem;
              position: absolute;
              right: 0;top: 0;
            }
          }
        }
        .addr-info-title {
          @media screen and (min-width: $screenMid) {
            height: 5rem;
          }
        }
        .info-content {
          font-size: 1.2rem;
          color: #FFFFFF;
          @media screen and (min-width: $screenMid) {
            font-size: 1.4rem;
            color: #444444;
            margin-bottom: 1rem;
            span {
              display: block;
            }
          }
        }
      }
    }
    .order-wrap {
      @media screen and (min-width: $screenMid) {
        width: 36rem;
      }
    }
    .order-detail-wrap {
      @include backImg('../assets/images/rectangletip.png');
      box-shadow: .5rem 0px .5rem -.5rem rgba(0,0,0,0.11), -.5rem 0px .5rem -.5rem rgba(0,0,0,0.11);
      margin-bottom: 4.1rem;
      padding-bottom: 3rem;
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
          @media screen and (min-width: $screenMid) {
            padding-left: 7rem;
          }
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
                  @media screen and (min-width: $screenMid) {
                    font-size: 1.8rem;
                    font-weight: bold;
                  }
                }
                .close-icon {
                  width: 1rem;
                  height: 1rem;
                  @include backImg('../assets/images/delete-icon.png');
                  margin-left: .5rem;
                }
              }
              .count-flex-box {
                @extend .flex-box;
                @media screen and (min-width: $screenMid) {
                  box-sizing: border-box;
                  padding-right: 3rem;
                }
              }
              .count-box {
                flex: 1;
                margin-right: .5rem;
                height: 3rem;
                border-radius: .5rem;
                box-sizing: border-box;
                @extend .theme-color;
                @extend .flex-box;
                font-size: 1.4rem;
                color: #FFFFFF;
                @media screen and (min-width: $screenMid) {
                  width: 7.5rem;
                }
                .change-btn {
                  width: 30%;
                  height: 100%;
                  line-height: 3rem;
                  text-align: center;
                }
              }
              .good-price {
                display: block;
                font-size: 1.6rem;
                color: #1CD0A3;
                text-align: right;
                @media screen and (min-width: $screenMid) {
                  flex: 1;
                  font-size: 2rem;
                }
              }
            }
          }
          .get-time {
            font-size: 1.2rem;
            color: #444444;
            margin: .85rem;
            @media screen and (min-width: $screenMid) {
              font-size: 1.4rem;
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
          margin-top: 1.8rem;
          border-bottom: 1px dashed #0B2031;
        }
      }
      .total-wrap {
        width: 100%;
        box-sizing: border-box;
        padding: 0 1.7rem 0rem 2rem;
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
  .aside-wrap-polify {
    @media screen and (min-width: $screenMid) {
      border-top: 1px solid #979797;
      padding: 1rem 0 0;
    }
  }
  .option-seleted {
    @media screen and (min-width: $screenMid) {
      display: none;
    }
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
  .pc-option-seleted {
    display: none;
    @media screen and (min-width: $screenMid) {
      display: block;
    }
    .seleted-title {
      font-size: 1.4rem;
      color: #444444;
    }
  }
  .option-wrap {
    @media screen and (min-width: $screenMid) {

    }
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

<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
    </div>
    <div class="banner-wrap">
      <img :src="goodInfo.pic" alt="" class="banner">
      <div class="add-wrap" v-show="goodInfo.lessTime != -1">
        <div class="add-cart" v-if="!isHasGood" @click.stop="addGoodCart">
          <i class="cart-icon"></i><label>購買</label>
        </div>
        <div class="count-box" v-else>
          <span class="change-btn"  @click.stop="desGoodCart">-</span>
          <span>{{goodCount}}</span>
          <span class="change-btn"  @click.stop="addGoodCart">+</span>
        </div>
      </div>
    </div>
    <div class="detail-wrap">
      <p class="title-desc">{{goodInfo.titleOne}}</p>
      <p class="good-name">{{goodInfo.name}}</p>
      <div class="info-box">
        <div class="time-wrap">
          <p class="time-tips" v-if="goodInfo.lessTime != -1">{{goodInfo.lessTime}}後截單</p>
          <p class="time-tips" v-else>已截單</p>
          <div class="old-price">原購價 ${{fenTransYuan(goodInfo.price)}}</div>
        </div>
        <div class="price-wrap">
          <p class="get-good-time">取貨時間：{{goodInfo.takeTimeStr}}</p>
          <div class="cheap-price-box">
            <span class="cheap-tips">團購價</span>
            <span class="cheap-price">$<b>{{fenTransYuan(goodInfo.discountPrice)}}</b></span>
          </div>
        </div>
      </div>
      <p class="good-desc">{{goodInfo.remark}}</p>
    </div>
    <common-footer :activeTab="'none'"></common-footer>
  </div>
</template>

<script>
import { CommonHeader, CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
import { formateTime, timeText, fenTransYuan } from 'utils/utils'
import { productInfo, addCart, updateCart } from 'utils/getData'
let pageInterVal = null
let loading = false
export default {
  data () {
    return {
      goodId: this.$route.params.goodId,
      goodInfo: {}
    }
  },
  computed: {
    ...mapState(['shopCart']),
    goodCount () {
      let count = 0
      this.shopCart.some(item => {
        if (item.id == this.goodId) {
          count = item.count
        }
      })
      return count
    },
    isHasGood () {
      return this.shopCart.filter(item => item.id == this.goodId).length > 0
    }
  },
  mounted () {
    this.getProdInfo()
  },
  beforeDestroy () {
    clearInterval(pageInterVal)
  },
  components: {
    CommonHeader,
    CommonFooter
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
    historyBack () {
      history.go(-1)
    },
    fenTransYuan: fenTransYuan,
    async addGoodCart () {
      if (loading) {
        return false
      }
      loading = true
      const thisGood = this.shopCart.filter(item => item.id == this.goodInfo.id)
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        const params = {
          productId: this.goodInfo.id,
          num: count+1
        }
        const data = await updateCart(params)
        if (data.code == 0) {
          this.ADDGOOD(this.goodInfo)
        }
        loading = false
      } else {
        const params = {
          productId: this.goodInfo.id,
          num: 1
        }
        const data = await addCart(params)
        if (data.code == 0) {
          this.ADDGOOD(this.goodInfo)
        }
        loading = false
      }
    },
    async desGoodCart () {
      if (loading) {
        return false
      }
      loading = true
      const thisGood = this.shopCart.filter(item => item.id == this.goodInfo.id)
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        const params = {
          productId: this.goodInfo.id,
          num: count-1
        }
        const data = await updateCart(params)
        if (data.code == 0) {
          this.DESGOOD(this.goodInfo.id)
        }
        loading = false
      }
    },
    async getProdInfo () {
      if (loading) {
        return false
      }
      loading = true
      if (!this.goodId) {
        loading = false
        return false
      }
      const params = {
        id: this.goodId
      }
      const data = await productInfo(params)
      if (data.code == 0) {
        this.goodInfo = data.data
        this.updateTime()
      }
      loading = false
    },
    updateTime () {
      clearInterval(pageInterVal)
      this.goodInfo.lessTime = this.formateTime(this.goodInfo.todayDeadline)
      this.goodInfo = Object.assign({}, this.goodInfo)
      if (this.goodInfo.lessTime == -1) {
        console.log('已结束')
        clearInterval(pageInterVal)
        return false
      }
      pageInterVal = setInterval(() => {
        this.goodInfo.lessTime = this.formateTime(this.goodInfo.todayDeadline)
        this.goodInfo = Object.assign({}, this.goodInfo)
        if (this.goodInfo.lessTime == -1) {
          console.log('已结束')
          clearInterval(pageInterVal)
          return false
        }
      }, 6000)
    },
    formateTime (timeString) {
      timeString = timeString.replace(/-/g,"/");
      const time = new Date(timeString).getTime()
      const timeObj = formateTime(time)
      const { day, hour, minute, second } = timeObj
      if (day + hour + minute + second == 0) {
        return -1
      }
      return timeText(timeObj.day, '天') + timeText(timeObj.hour, '小時') + timeText(timeObj.minute, '分鐘')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #ffffff;
  position: relative;
  .page-title {
    position: absolute;
    left: 0;top: 0;
    z-index: 1;
    background: none;
  }
  .banner-wrap {
    position: relative;
    width: 100%;
    height: 32.5rem;
    @media screen and (min-width: $screenMid) {
      width: $screenWidth;
      margin: 0 auto;
    }
    .banner {
      width: 100%;
      height: 100%;
      display: block;
    }
    .add-wrap {
      width: 10.7rem;
      height: 3rem;
      position: absolute;
      right: .1rem;bottom: -2.5rem;
      margin: 1rem;
      @extend .theme-color;
      border-radius: .5rem;
      .add-cart {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 2.6rem;
        @extend .flex-box;
        font-size: 1.4rem;
        color: #FFFFFF;
        .cart-icon {
          width: 1.6rem;
          height: 1.6rem;
          @include backImg('../assets/images/cart.png');
        }
      }
      .count-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
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
    }
  }
  .detail-wrap {
    box-sizing: border-box;
    padding: 2rem 2rem 9rem;
    @media screen and (min-width: $screenMid) {
      width: $screenWidth;
      margin: 0 auto;
    }
    .title-desc {
      font-size: 1.8rem;
      line-height: 2.5rem;
      color: #999999;
      margin-bottom: .5rem;
    }
    .good-name {
      font-size: 2.4rem;
      color: #444444;
      line-height: 3.4rem;
      margin-bottom: 4.35rem;
      text-align: left;
    }
    .info-box {
      padding-bottom: 2.5rem;
      border-bottom: 1px solid #E5E5E5;
      @media screen and (min-width: $screenMid) {
        padding-bottom: 4rem;
      }
      .time-wrap {
        @extend .flex-box;
        .time-tips {
          padding: 0 2.5rem;
          height: 2.5rem;
          font-size: 1.3rem;
          color: #ffffff;
          line-height: 2.5rem;
          background: #444444;
          border-radius: 5rem;
          margin-bottom: .5rem;
        }
        .old-price {
          text-align: right;
          font-size: 1.4rem;
          line-height: 2rem;
          color: #444444;
          margin-bottom: .5rem;
        }
      }
      .price-wrap {
        @extend .flex-box;
        align-items: flex-start;
        .get-good-time {
          font-size: 1.4rem;
          color: #1CD0A3;
          line-height: 2rem;
        }
        .cheap-price-box {
          text-align: right;
          height: 2.25rem;
          @extend .flex-box;
          .cheap-tips {
            width: 5.25rem;
            height: 2.25rem;
            @extend .theme-color;
            border-radius: 5rem;
            font-size: 1.3rem;
            color: #ffffff;
            line-height: 2.25rem;
            text-align: center;
            margin-right: 1rem;
          }
          .cheap-price {
            font-size: 1.8rem;
            color: #1CD0A3;
            b {
              font-size: 2.2rem;
            }
          }
        }
      }
    }
    .good-desc {
      padding-top: .85rem;
      font-size: 1.4rem;
      color: #444444;
      line-height: 1.8rem;
    }
  }
}
</style>

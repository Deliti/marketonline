<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
    </div>
    <div :class="['banner-wrap', showStoreNum(goodInfo.storeNum) == 'over' ? 'list-over' : '']">
      <mt-swipe :auto="4000" class="banner-box">
        <mt-swipe-item class="banner-item backbg" 
                        :style="{backgroundImage:`url(${goodInfo.pic})`}" 
                        v-for="(banner, index) in bannerList"
                        :key="index">
          <!-- <img :src='banner.url'
                @load="imgOnload"
                alt=""> -->
        </mt-swipe-item>
      </mt-swipe>
      <div class="sale-tips" v-if="goodInfo.saleStatus != 0"><span>{{showSaleText(goodInfo.saleStatus)}}</span></div>
      <div class="add-wrap" v-show="goodInfo.lessTime != -1 && showStoreNum(goodInfo.storeNum) != 'over'">
        <div class="add-cart" v-if="!isHasGood" @click.stop="addGoodCart">
          <i class="cart-icon"></i><label>購買</label>
        </div>
        <div class="count-box" v-else>
          <span class="change-btn"  @click.stop="desGoodCart">-</span>
          <span>{{goodCount}}</span>
          <span class="change-btn"  @click.stop="addGoodCart">+</span>
        </div>
      </div>
      <div class="over-text">
        <p class="p1">賣光了</p>
        <p class="p2">下次快點啦</p>
      </div>
    </div>
    <div class="detail-wrap">
      <div class="little-part">
        <p class="title-desc">{{goodInfo.titleOne}}</p>
        <p class="item-storenum"  v-if="showStoreNum(goodInfo.storeNum) != -1 && showStoreNum(goodInfo.storeNum) != 'over'">{{showStoreNum(goodInfo.storeNum)}}</p>
      </div>
      <p class="good-name">{{goodInfo.name}}</p>
      <div class="info-box">
        <div class="time-wrap">
          <p class="time-tips" v-if="goodInfo.lessTime != -1 && showStoreNum(goodInfo.storeNum) != 'over'">{{goodInfo.lessTime}}後截單</p>
          <p class="time-tips" v-else-if="goodInfo.lessTime == -1 && showStoreNum(goodInfo.storeNum) != 'over'">已截單</p>
          <div class="old-price">市場價 <span>${{fenTransYuan(goodInfo.price)}}</span></div>
        </div>
        <div class="price-wrap">
          <p class="get-good-time">取貨時間：{{goodInfo.takeTimeStr}}</p>
          <div class="cheap-price-box">
            <span class="cheap-tips">會員價</span>
            <span class="cheap-price">$<b>{{fenTransYuan(goodInfo.discountPrice)}}</b></span>
          </div>
        </div>
      </div>
      <p class="good-desc" v-html="goodInfo.remark"></p>
    </div>
    <common-footer :activeTab="'none'"></common-footer>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast } from 'mint-ui';
import { CommonHeader, CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
import { formateTime, timeText, fenTransYuan } from 'utils/utils'
import { productInfo, addCart, updateCart } from 'utils/getData'

const saleStatusConf = ['普通', '開團', '限定', '至抵']
let pageInterVal = null
let loading = false
export default {
  data () {
    return {
      bannerList: [],
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
    CommonFooter,
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
    historyBack () {
      history.go(-1)
    },
    imgOnload (e) {
      let img = new Image();
      const imgUrl = e.target.src;
      img.src = imgUrl;
      const pWidth = document.querySelector('.banner-wrap').clientWidth
      const pHeight = document.querySelector('.banner-wrap').clientHeight
      let imgCss = "";
      // console.log('pWidth', e.path[1])
      if (img.width / img.height > pWidth/pHeight) {
        const widthRem = (img.width - pWidth/pHeight*img.height)/2;
        const left = `-${100*((widthRem/img.width).toFixed(2))}%`;
        imgCss = `height:100%;width:initial;transform:translateX(${left});position:relative`;
      } else {
        const heightRem =  (img.height - img.width/(pWidth/pHeight))/2;
        console.log('heightRem', heightRem, 'heightRem/img.height', heightRem/img.height)
        const top = `-${100*((heightRem/img.height).toFixed(2))}%`;
        imgCss = `width: 100%;height:initial; transform:translateY(${top});position:relative`;
      }
      // $(e.target).attr('style',imgCss)
      e.target.setAttribute("style",imgCss)
    },
    fenTransYuan: fenTransYuan,
    showSaleText (status) {
      if (status != 0) {
        return saleStatusConf[status]
      } else {
        return ''
      }
    },
    showStoreNum (num) {
      if (num == -1) {
        return '-1'
      } else if (num == 0) {
        return 'over'
      }else if (num >= 1000) {
        return '庫存999+'
      } else {
        return `庫存${num}件`
      }
    },
    async addGoodCart () {
      if (loading) {
        return false
      }
      const maxNum = this.goodInfo.maxPurchaseNum == -1 ? 99999999999999999 : this.goodInfo.maxPurchaseNum
      const thisGood = this.shopCart.filter(item => item.id == this.goodInfo.id)
      loading = true
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        // if (count >= maxNum) {
        //   Toast('已超過最大購買數量')
        //   loading = false
        //   return false
        // }
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
      this.bannerList = []
      const data = await productInfo(params)
      if (data.code == 0) {
        this.goodInfo = data.data
        this.bannerList[0] = {
          name: '',
          url: this.goodInfo.pic
        }
        if (JSON.parse(this.goodInfo.picList) instanceof Array) {
          this.bannerList.push(...JSON.parse(this.goodInfo.picList))
          console.log(this.bannerList)
        }
        this.updateTime()
      }
      loading = false
    },
    updateTime () {
      clearInterval(pageInterVal)
      if (this.goodInfo.scheduleStatus == 1) {
        this.goodInfo.lessTime = this.formateTime(this.goodInfo.deadline)
      } else {
        let deadlineTime = this.formateTime(this.goodInfo.nextDeadline)
        if (deadlineTime == -1) {
          this.goodInfo.lessTime = this.formateTime(this.goodInfo.nextNextDeadline)
        } else {
          this.goodInfo.lessTime = deadlineTime
        }
      }
      
      this.goodInfo = Object.assign({}, this.goodInfo)
      if (this.goodInfo.lessTime == -1) {
        console.log('已结束')
        clearInterval(pageInterVal)
        return false
      }
      pageInterVal = setInterval(() => {
        if (this.goodInfo.scheduleStatus == 1) {
          this.goodInfo.lessTime = this.formateTime(this.goodInfo.deadline)
        } else {
          let deadlineTime = this.formateTime(this.goodInfo.nextDeadline)
          if (deadlineTime == -1) {
            this.goodInfo.lessTime = this.formateTime(this.goodInfo.nextNextDeadline)
          } else {
            this.goodInfo.lessTime = deadlineTime
          }
        }
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
      margin: 4rem auto 0;
    }
    .over-text {
      position: absolute;
      opacity: 0;
    }
    .banner-box {
      width: 100%;
      height: 100%;
      .banner-item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          display: block;
        }
      }
      .backbg {
        background-color: #FFFFFF;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: contain;
      }
    }
    .sale-tips {
      width: 8.5rem;
      height: 5.7rem;
      position: absolute;
      right: 0;top: 0;
      overflow: hidden;
      @include backImg('../assets/images/sale.png');
      span {
        width: 10.27rem;
        position: absolute;
        left: 0;top: 1rem;
        transform: rotate(37deg);
        font-size: 1.4rem;
        color: #ffffff;
        text-align: center;
      }
    }
    .add-wrap {
      width: 11.5rem;
      height: 3.3rem;
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
          @include backImg('../assets/images/cartfull.png');
        }
      }
      .count-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        @extend .flex-box;
        font-size: 1.8rem;
        color: #FFFFFF;
        .change-btn {
          width: 30%;
          height: 100%;
          line-height: 3.3rem;
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
    .little-part {
      overflow: hidden;
      .title-desc {
        float: left;
        width: 65%;
        font-size: 1.8rem;
        line-height: 2.5rem;
        color: #999999;
        margin-bottom: .5rem;
      }
      .item-storenum {
        font-size: 1.2rem;
        line-height: 2rem;
        color: #999999;
        text-align: right;
      }
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
          span {
            text-decoration: line-through;
          }
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
  .list-over {
    position: relative;
    .over-text {
      position: absolute;
      background: rgba(0, 0, 0, .6);
      @extend .flex-box;
      opacity: 1 !important;
      flex-direction: column;
      justify-content: center;
      left: 0;top: 0;
      right: 0;bottom: 0;
      .p1 {
        font-size: 1.8rem;
        color: #ffffff;
        margin-bottom: 1rem;
      }
      .p2 {
        font-size: 1.2rem;
        color: #ffffff;
      }
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;top: 0;
      background: rgba(0, 0, 0, .6);
    }
  }
}
</style>

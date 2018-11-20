<template>
  <div class="page-wrap">
    <div class="banner-wrap">
      <div v-show="isAgent == 1" class="leader-btn" @click="hrefJump('/seller#home')">團長入口</div>
      <mt-swipe :auto="4000" class="banner-box">
        <mt-swipe-item class="banner-item">
          <img src="../assets/images/banner1.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item class="banner-item">
          <img src="../assets/images/banner2.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item class="banner-item">
          <img src="../assets/images/banner3.jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="page-content">
      <div class="top-bg"></div>
      <div class="head-nav-class">
        <div class="scroll-view" id="scrollBox">
          <div v-for="(item, index) in goodType"
                :key="index"
                @click="chooseProd(item)"
                :class="['item', categoryId == item.id?'active':'']" >{{item.categoryName}}</div>
        </div>
      </div>
      <section class="list-container"
                v-infinite-scroll="getProdList"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
        <div v-for="(goodInfo, index) in goodList"
              :key="index"
              :class="['list-item', goodInfo.lessTime == -1 ? 'list-over' : '']" 
              @click="linkJump(`goodDetail/${goodInfo.id}`)">
          <div class="item-banner-wrap">
            <img :src='goodInfo.pic' alt="" class="item-banner">
            <p class="time-tips" v-if="goodInfo.lessTime != -1">{{goodInfo.lessTime+'後截單'}}</p>
            <p class="time-tips" v-else>已截單</p>
            <div class="add-wrap" @click.stop="" v-show="goodInfo.lessTime != -1">
              <div class="add-cart" v-if="!isHasGood(goodInfo.id)" @click.stop="addGoodCart(goodInfo, 'first')">
                <i class="cart-icon"></i><label>購買</label>
              </div>
              <div class="count-box" v-else>
                <span class="change-btn" @click.stop="desGoodCart(goodInfo)">-</span>
                <span >{{getGoodCount(goodInfo.id)}}</span>
                <span class="change-btn" @click.stop="addGoodCart(goodInfo)">+</span>
              </div>
            </div>
          </div>
          <div class="item-detail-wrap">
            <p class="item-desc">{{goodInfo.titleOne}}</p>
            <div class="item-info-box">
              <label class="item-name">{{goodInfo.name}}</label>
              <div class="item-price-wrap">
                <div class="old-price">原購價 ${{goodInfo.price}}</div>
                <div class="cheap-price-box">
                  <span class="cheap-tips">團購價</span>
                  <span class="cheap-price">${{goodInfo.discountPrice}}</span>
                </div>
              </div>
            </div>
            <p class="get-good-time">取貨時間：{{goodInfo.takeTimeStr}}</p>
          </div>
        </div>
        <!-- <div class="list-item list-over">
          <div class="item-banner-wrap">
            <img src="//m.360buyimg.com/mobilecms/s750x750_jfs/t30121/9/45509898/135153/faa4fc0f/5be64c1fNa331afae.jpg!q80.dpg.webp" alt="" class="item-banner">
            <p class="time-tips">已截單</p>
            <div class="add-wrap"></div>
          </div>
          <div class="item-detail-wrap">
            <p class="item-desc">清香超甜 物美價廉</p>
            <div class="item-info-box">
              <label class="item-name">進口百香果 90G-110G/個</label>
              <div class="item-price-wrap">
                <div class="old-price">原購價 $50</div>
                <div class="cheap-price-box">
                  <span class="cheap-tips">團購價</span>
                  <span class="cheap-price">$38</span>
                </div>
              </div>
            </div>
            <p class="get-good-time">取貨時間：11月3日（星期六）</p>
          </div>
        </div> -->
      </section>
    </div>
    <common-footer :activeTab="'home'"></common-footer>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
import { formateTime, timeText } from 'utils/utils'
import $ from 'jquery'
import { productList, prodType, addCart, updateCart } from 'utils/getData'

let pageInterVal = null
let pageNo = 0
const pageLimit = 10
let totalPage = 1
let loading = false
export default {
  data () {
    return {
      isAgent: localStorage['isAgent'],
      goodTypeIndex: 0,
      categoryId: '',
      goodType: [],
      goodList: []
    }
  },
  computed: {
    ...mapState(['shopCart'])
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem,
    CommonFooter
  },
  mounted () {
    this.init()
    this.addEvent()
  },
  beforeDestroy () {
    clearInterval(pageInterVal)
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
    init () {
      this.getProdType()
    },
    addEvent () {
      $("#scrollBox").off().on('click', '.item', function(){
        var moveX = $(this).position().left+$(this).parent().scrollLeft();
        var pageX = document.documentElement.clientWidth;//设备的宽度
        var blockWidth = $(this).width();
        var left = moveX-(pageX/2)+(blockWidth/2);
        $("#scrollBox").animate({scrollLeft:left},400);
        $(this).addClass("active").siblings().removeClass("active");
      })
    },
    hrefJump (href) {
      window.location.href = href
    },
    linkJump (href) {
      this.$router.push(href)
    },
    chooseProd (item) {
      this.categoryId = item.id
      pageNo = 0
      totalPage = 1
      this.goodList = []
      this.getProdList()
    },
    async getProdType () {
      const data = await prodType()
      if (data.code == 0) {
        this.goodType.push(...data.data)
        this.categoryId = this.goodType[0].id
        this.getProdList()
      }
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
    isHasGood (goodId) {
      return this.shopCart.filter(item => item.id == goodId).length > 0
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
    async getProdList () {
      if (pageNo >= totalPage) {
        return false
      }
      if (loading) {
        return false
      }
      loading = true
      pageNo++
      const params = {
        categoryId: this.categoryId,
        page: pageNo,
        limit: pageLimit
      }
      const data = await productList(params)
      if (data.code == 0) {
        this.goodList.push(...data.page.list) 
        totalPage = data.page.totalPage
        this.updateTime()
        loading = false
      }
    },
    updateTime () {
      clearInterval(pageInterVal)
      this.goodList.map(item => {
        this.$set(item, 'lessTime', this.formateTime(item.todayDeadline))
      })
      pageInterVal = setInterval(() => {
        console.log('---')
        this.goodList.map(item => {
          this.$set(item, 'lessTime', this.formateTime(item.todayDeadline))
        })
      }, 6000)
    },
    formateTime (timeString) {
      timeString = timeString.replace(/-/g,"/")
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
  .banner-wrap {
    width: 100%;
    height: 21.9rem;
    position: relative;
    .leader-btn {
      position: absolute;
      left: 0;top: 0;
      width: 9rem;
      height: 3.7rem;
      font-size: 1.4rem;
      color: #ffffff;
      text-align: center;
      line-height: 3.7rem;
      @include backImg('../assets/images/leader-enter-bg.png');
      z-index: 1;
    }
    .banner-box {
      width: 100%;
      height: 100%;
      .banner-item {
        // background: red;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .banner-item-1 {
        // background: blue;
      }
      .banner-item-2 {
        // background: green;
      }
    }
  }
  .page-content {
    position: relative;
    .top-bg {
      width: 100%;
      height: 31.7rem;
      @include backImg('../assets/images/ovalshed.png');
      position: absolute;
      left: 0;top: 0;
    }
    .head-nav-class {
      position: relative;
      width: 100%;
      height: 5rem;
      overflow: hidden;
      .scroll-view {
        height: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        &::-webkit-scrollbar{
          display: none;
        }
        display:flex;
        flex-wrap:nowrap;
        justify-content:space-between;
        .item {
          flex:1 0 auto;
          height: 100%;
          padding: 0 4.5rem;
          font-size: 1.7rem;
          color: #FFFFFF;
          line-height: 5rem;
        }
        .active {
          font-weight: bold;
          margin: 0 auto;
        }
      }
    }
    .list-container {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding: 0 1.6rem 9rem;
      .list-item {
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0 .1rem .5rem 0 #00000029;
        border-radius: .3rem;
        margin-bottom: 1.5rem;
        .item-banner-wrap {
          position: relative;
          width: 100%;
          height: 18.6rem;
          .item-banner {
            width: 100%;
            height: 100%;
            display: block;
          }
          .time-tips {
            position: absolute;
            left: .7rem;top: .7rem;
            z-index: 1;
            padding: 0 2.5rem;
            height: 2.5rem;
            font-size: 1.3rem;
            color: #ffffff;
            line-height: 2.5rem;
            background: #444444;
            border-radius: 5rem;
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
                @include backImg('../assets/images/cart-sm.png');
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
        .item-detail-wrap {
          box-sizing: border-box;
          padding: 1.3rem 1.1rem .7rem 1.9rem;
          .item-desc {
            font-size: 1.4rem;
            line-height: 2rem;
            color: #999999;
          }
          .item-info-box {
            @extend .flex-box;
            align-items: flex-start;
            margin-bottom: 1.2rem;
            .item-name {
              width: 50%;
              font-size: 1.8rem;
              color: #444444;
            }
            .item-price-wrap {
              text-align: right;
              .old-price {
                font-size: 1.4rem;
                line-height: 2rem;
                color: #444444;
                margin-bottom: .5rem;
              }
              .cheap-price-box {
                height: 2.1rem;
                @extend .flex-box;
                .cheap-tips {
                  width: 5.25rem;
                  height: 2.1rem;
                  @extend .theme-color;
                  border-radius: 5rem;
                  font-size: 1.3rem;
                  color: #ffffff;
                  line-height: 2.1rem;
                  text-align: center;
                  margin-right: .65rem;
                }
                .cheap-price {
                  font-size: 2.4rem;
                  color: #1CD0A3;
                }
              }
            }
          }
          .get-good-time {
            font-size: 1.4rem;
            color: #1CD0A3;
            line-height: 2rem;
          }
        }
      }
      .list-over {
        position: relative;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;top: 0;
          background: rgba(255, 255, 255, .6);
        }
      }
    }
  }
}
</style>

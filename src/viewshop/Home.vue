<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="banner-wrap">
      <div v-show="isAgent == 1" class="leader-btn" @click="linkJump('/agentHome')">團長入口</div>
      <mt-swipe :auto="4000" class="banner-box">
        <mt-swipe-item class="banner-item"
                        v-for="(banner, index) in bannerList"
                        :key="index">
          <img :src='banner.url'
                @load="imgOnload"
                @click="linkJump(`goodDetail/${banner.id}`)"
                alt="">
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
              :class="['list-item']"
              @click="linkJump(`goodDetail/${goodInfo.id}`)">
          <div :class="['item-banner-wrap', showStoreNum(goodInfo.storeNum) == 'over' ? 'list-over' : '']">
            <div class="img-wrap">
              <img :src='goodInfo.pic' alt="" @load="imgOnload" class="item-banner">
            </div>
            <p class="time-tips" v-if="goodInfo.lessTime != -1 && showStoreNum(goodInfo.storeNum) != 'over'">{{goodInfo.lessTime+'後截單'}}</p>
            <p class="time-tips" v-else-if="goodInfo.lessTime != -1 && showStoreNum(goodInfo.storeNum) != 'over'">已截單</p>
            <div class="sale-tips" v-if="goodInfo.saleStatus != 0"><span>{{showSaleText(goodInfo.saleStatus)}}</span></div>
            <div class="add-wrap" v-show="showStoreNum(goodInfo.storeNum) != 'over'">
              <div class="add-cart" v-if="!isHasGood(goodInfo.id)" @click.stop="addGoodCart(goodInfo, 'first')">
                <i class="cart-icon"></i><label>購買</label>
              </div>
              <div class="count-box" v-else>
                <span class="change-btn" @click.stop="desGoodCart(goodInfo)">-</span>
                <span >{{getGoodCount(goodInfo.id)}}</span>
                <span class="change-btn" @click.stop="addGoodCart(goodInfo)">+</span>
              </div>
            </div>
            <div class="over-text">
              <p class="p1">賣光了</p>
              <p class="p2">下次快點啦</p>
            </div>
          </div>
          <div class="item-detail-wrap">
            <div class="little-part">
              <p class="item-desc">{{goodInfo.titleOne}}</p>
              <p class="item-storenum" v-if="showStoreNum(goodInfo.storeNum) != -1 && showStoreNum(goodInfo.storeNum) != 'over'">{{showStoreNum(goodInfo.storeNum)}}</p>
            </div>
            <div class="item-info-box">
              <label class="item-name">{{goodInfo.name}}</label>
              <div class="item-price-wrap">
                <div class="old-price">市場價 <span>${{fenTransYuan(goodInfo.price)}}</span></div>
                <div class="cheap-price-box">
                  <span class="cheap-tips">會員價</span>
                  <span class="cheap-price">${{fenTransYuan(goodInfo.discountPrice)}}</span>
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
        <a class="link-fb-wrap" href="https://www.baidu.com">
          <p class="text">按此加入我们的Facebook群組专页，以便了解我们最新的产品消息和资讯！</p>
        </a>
      </section>
    </div>
    <common-footer :activeTab="'home'"></common-footer>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { Toast } from 'mint-ui'
import { CommonHeader, CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
import { formateTime, timeText, fenTransYuan } from 'utils/utils'
import $ from 'jquery'
import { getBanner, productList, prodType, addCart, updateCart } from 'utils/getData'

const saleStatusConf = ['普通', '促銷', '超低', '折扣']
let pageInterVal = null
let pageNo = 0
const pageLimit = 10
let totalPage = 1
let loading = false
export default {
  data () {
    return {
      isAgent: localStorage['isAgent'],
      bannerList: [],
      categoryId: -1,
      goodType: [{
        "id": -1,
        "status": 0,
        "categoryName": "全部"
      }],
      goodList: []
    }
  },
  computed: {
    ...mapState(['shopCart'])
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem,
    CommonHeader,
    CommonFooter
  },
  mounted () {
    this.init()
    this.addEvent()
  },
  beforeDestroy () {
    this.resetPage()
    clearInterval(pageInterVal)
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
    init () {
      this.getBanner()
      this.getProdType()
      this.getProdList()
    },
    imgOnload (e) {
      let img = new Image();
      const imgUrl = e.target.src;
      img.src = imgUrl;
      const pWidth = $(e.target).parent().width()
      const pHeight = $(e.target).parent().height()
      let imgCss = "";
      if (img.width / img.height > pWidth/pHeight) {
        const widthRem = (img.width - pWidth/pHeight*img.height)/2;
        const left = `-${100*((widthRem/img.width).toFixed(2))}%`;
        imgCss = `height:100%;width:initial;transform:translateX(${left});position:relative`;
      } else {
        const heightRem =  (img.height - img.width/(pWidth/pHeight))/2;
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
      // return '-1'
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
    async getBanner () {
      const data = await getBanner()
      if (data.code == 0) {
        this.bannerList = data.data
      }
      // mock数据
      // this.bannerList = [
      //   {
      //     "id": 1,
      //     "paramKey": "banner_one",
      //     "paramValue": 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1543069953&di=b69ecf83d2de77ceced6ce8a80dd0e3e&src=http://imgsrc.baidu.com/imgad/pic/item/5366d0160924ab18c6b5570e3efae6cd7b890b63.jpg',
      //     "remark": null,
      //     "category": "banner"
      //   },{
      //     "id": 2,
      //     "paramKey": "banner_one",
      //     "paramValue": 'https://img.alicdn.com/imgextra/i1/1910146537/TB2x9I0Db9YBuNjy0FgXXcxcXXa_!!1910146537.jpg_430x430q90.jpg',
      //     "remark": null,
      //     "category": "banner"
      //   },{
      //     "id": 3,
      //     "paramKey": "banner_one",
      //     "paramValue": 'https://img.alicdn.com/imgextra/i1/1910146537/TB2tERsD_JYBeNjy1zeXXahzVXa_!!1910146537.jpg_430x430q90.jpg',
      //     "remark": null,
      //     "category": "banner"
      //   }
      // ]
    },
    async getProdType () {
      const data = await prodType()
      if (data.code == 0) {
        this.goodType.push(...data.data)
        console.log('this.cate', this.categoryId)
      }
    },
    async addGoodCart (goodInfo) {
      if (loading) {
        return false
      }
      const maxNum = goodInfo.maxPurchaseNum || 9999999999999
      const thisGood = this.shopCart.filter(item => item.id == goodInfo.id)
      loading = true
      if (thisGood.length > 0) {
        const count = thisGood[0].count
        if (count > maxNum) {
          Toast('已超過最大購買數量')
          loading = false
          return false
        }
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
    resetPage () {
      this.categoryId = -1
      pageNo = 0
      totalPage = 1
      this.goodList = []
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
      this.categoryId == -1 && delete params.categoryId
      console.log(params)
      let data = await productList(params)
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
        if (item.scheduleStatus == 1) {
          this.$set(item, 'lessTime', this.formateTime(item.deadline))
        } else {
          let deadlineTime = this.formateTime(item.nextDeadline)
          if (deadlineTime == -1) {
            this.$set(item, 'lessTime', this.formateTime(item.nextNextDeadline))
          } else {
            this.$set(item, 'lessTime', deadlineTime)
          }
        }
      })
      pageInterVal = setInterval(() => {
        console.log('---')
        this.goodList.map(item => {
          if (item.scheduleStatus == 1) {
            this.$set(item, 'lessTime', this.formateTime(item.deadline))
          } else {
            let deadlineTime = this.formateTime(item.nextDeadline)
            if (deadlineTime == -1) {
              this.$set(item, 'lessTime', this.formateTime(item.nextNextDeadline))
            } else {
              this.$set(item, 'lessTime', deadlineTime)
            }
          }
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
    @media screen and (min-width: $screenMid) {
      min-width: $screenWidth;
      height: 33rem;
    }
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
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
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
    @media screen and (min-width: $screenMid) {
      min-width: $screenWidth;
    }
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
      @media screen and (min-width: $screenMid) {
        width: $screenWidth;
        height: 8rem;
        margin: 0 auto;
      }
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
          @media screen and (min-width: $screenMid) {
            height: 8rem;
            cursor: pointer;
          }
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
      @media screen and (min-width: $screenMid) {
        width: $screenWidth;
        margin: 0 auto;
        padding: 0 1rem 9rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .link-fb-wrap {
        width: 100%;
        background: #FFFFFF;
        border-radius: .3rem;
        padding: 1.3rem 1.1rem 1.3rem 1.9rem;
        box-shadow: 0 .1rem .5rem 0 #00000029;
        color: #444444;
        font-size: 1.4rem;
        box-sizing: border-box;
        @extend .flex-box;
      }
      .list-item {
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0 .1rem .5rem 0 #00000029;
        border-radius: .3rem;
        margin-bottom: 1.5rem;
        overflow: hidden;
        @media screen and (min-width: $screenMid) {
          width: 20rem;
          margin-bottom: 2.2rem;
          margin-right: 1rem;
          &:nth-child(3n) {
            margin-right: 0;
          }
          cursor: pointer;
        }
        .item-banner-wrap {
          position: relative;
          width: 100%;
          height: 18.6rem;
          @media screen and (min-width: $screenMid) {
            height: 11rem;
          }
          .over-text {
            opacity: 0;
          }
          .img-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .item-banner {
              // width: 100%;
              // height: 100%;
              display: block;
            }
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
            @media screen and (min-width: $screenMid) {
              padding: 0 1.5rem;
            }
          }
          .sale-tips {
            width: 8.5rem;
            height: 5.7rem;
            position: absolute;
            right: 0;top: 0;
            z-index: 1;
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
            @media screen and (min-width: $screenMid) {
              width: 6.8rem;
              height: 1.8rem;
              bottom: -2rem;
            }
            .add-cart {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 0 2.6rem;
              @extend .flex-box;
              font-size: 1.4rem;
              color: #FFFFFF;
              @media screen and (min-width: $screenMid) {
                padding: 0 1.3rem;
              }
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
              font-size: 1.8rem;
              color: #FFFFFF;
              .change-btn {
                width: 35%;
                height: 100%;
                line-height: 3.3rem;
                text-align: center;
                @media screen and (min-width: $screenMid) {
                  line-height: 1.8rem;
                }
              }
            }
          }
        }
        .item-detail-wrap {
          box-sizing: border-box;
          padding: 1.3rem 1.1rem .7rem 1.9rem;
          @media screen and (min-width: $screenMid) {
            padding: .7rem .7rem .3rem;
          }
          .little-part {
            overflow: hidden;
          }
          .item-desc {
            width: 65%;
            float: left;
            font-size: 1.4rem;
            line-height: 2rem;
            color: #999999;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            @media screen and (min-width: $screenMid) {
              line-height: 1.8rem;
            }
          }
          .item-storenum {
            font-size: 1.2rem;
            line-height: 2rem;
            color: #999999;
            text-align: right;
          }
          .item-info-box {
            @extend .flex-box;
            align-items: flex-start;
            margin-bottom: 1.2rem;
            @media screen and (min-width: $screenMid) {
              margin-bottom: 1rem;
            }
            .item-name {
              max-width: 50%;
              max-height: 4.6rem;
              overflow: hidden;
              text-overflow:ellipsis;
              font-size: 1.6rem;
              color: #444444;
              @media screen and (min-width: $screenMid) {
                font-size: 1.3rem;
                font-weight: bold;
              }
            }
            .item-price-wrap {
              text-align: right;
              .old-price {
                font-size: 1.4rem;
                line-height: 2rem;
                color: #444444;
                margin-bottom: .5rem;
                span {
                  text-decoration: line-through;
                }
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
                  font-size: 2.2rem;
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
        .over-text {
          position: absolute;
          @extend .flex-box;
          background: rgba(0, 0, 0, .8);
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
  }
}
</style>

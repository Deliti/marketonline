<template>
  <div class="page-wrap">
    <div class="banner-wrap">
      <div class="leader-btn" @click="hrefJump('/seller#home')">團長入口</div>
      <mt-swipe :auto="4000" class="banner-box">
        <mt-swipe-item class="banner-item">1</mt-swipe-item>
        <mt-swipe-item class="banner-item-1">2</mt-swipe-item>
        <mt-swipe-item class="banner-item-2">3</mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="page-content">
      <div class="top-bg"></div>
      <div class="head-nav-class">
        <div class="scroll-view" id="scrollBox">
          <div class="item">全部</div>
          <div class="item active">水果</div>
          <div class="item">蔬菜</div>
          <div class="item">日用品</div>
          <div class="item">其他</div>
        </div>
      </div>
      <section class="list-container">
        <div class="list-item" @click="linkJump(`goodDetail/${goodInfo.id}`)">
          <div class="item-banner-wrap">
            <img src="//m.360buyimg.com/mobilecms/s750x750_jfs/t30121/9/45509898/135153/faa4fc0f/5be64c1fNa331afae.jpg!q80.dpg.webp" alt="" class="item-banner">
            <p class="time-tips">x小時xx分鐘後截單</p>
            <div class="add-wrap">
              <div class="add-cart" v-if="!isHasGood(goodInfo.id)" @click.stop="addGoodCart(goodInfo)">
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
        </div>
        <div class="list-item">
          <div class="item-banner-wrap">
            <img src="//m.360buyimg.com/mobilecms/s750x750_jfs/t30121/9/45509898/135153/faa4fc0f/5be64c1fNa331afae.jpg!q80.dpg.webp" alt="" class="item-banner">
            <p class="time-tips">x小時xx分鐘後截單</p>
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
        </div>
      </section>
    </div>
    <common-footer :activeTab="'home'"></common-footer>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
import $ from 'jquery'
export default {
  data () {
    return {
      goodInfo: {
        id: 'goodid',
        oldPrice: 50,
        cheapPrice: 38
      }
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
    this.addEvent()
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
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
    addGoodCart (goodInfo) {
      this.ADDGOOD(goodInfo)
    },
    desGoodCart (goodInfo) {
      this.DESGOOD(goodInfo.id)
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
        background: red;
      }
      .banner-item-1 {
        background: blue;
      }
      .banner-item-2 {
        background: green;
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
            right: 1.1rem;bottom: -1.5rem;
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
    }
  }
}
</style>

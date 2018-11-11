<template>
  <div class="page-wrap">
    <div class="banner-wrap">
      <img src="//m.360buyimg.com/mobilecms/s750x750_jfs/t30121/9/45509898/135153/faa4fc0f/5be64c1fNa331afae.jpg!q80.dpg.webp" alt="" class="banner">
      <div class="add-wrap">
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
      <p class="title-desc">清香超甜 物美價廉</p>
      <p class="good-name">進口百香果 90G-110G/個</p>
      <div class="info-box">
        <div class="time-wrap">
          <p class="time-tips">x小時xx分鐘後截單</p>
          <p class="get-good-time">取貨時間：11月3日（星期六）</p>
        </div>
        <div class="price-wrap">
          <div class="old-price">原購價 $50</div>
          <div class="cheap-price-box">
            <span class="cheap-tips">團購價</span>
            <span class="cheap-price">$<b>38</b></span>
          </div>
        </div>
      </div>
      <p class="good-desc">熱情果，又叫百香果，係熱情果科熱情果屬嘅爬藤草本植物，亦係種生果，原產南美洲熱帶地區，通常用嚟整果汁</p>
    </div>
    <common-footer :activeTab="'none'"></common-footer>
  </div>
</template>

<script>
import { CommonFooter } from 'components'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      goodId: this.$route.params.goodId,
      goodInfo: {
        id: 'goodid',
        oldPrice: 50,
        cheapPrice: 38
      }
    }
  },
  computed: {
    ...mapState(['shopCart']),
    goodCount () {
      let count = 0
      this.shopCart.some(item => {
        if (item.id === this.goodId) {
          count = item.count
        }
      })
      return count
    },
    isHasGood () {
      return this.shopCart.some(item => {
        return item.id === this.goodId
      })
    }
  },
  mounted () {
    console.log()
  },
  components: {
    CommonFooter
  },
  methods: {
    ...mapMutations(['ADDGOOD', 'DESGOOD']),
    addGoodCart () {
      this.ADDGOOD(this.goodInfo)
    },
    desGoodCart () {
      this.DESGOOD(this.goodId)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  background: #ffffff;
  position: relative;
  .banner-wrap {
    position: relative;
    width: 100%;
    height: 32.5rem;
    .banner {
      width: 100%;
      height: 100%;
      display: block;
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
      @extend .flex-box;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid #E5E5E5;
      .time-wrap {
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
        .get-good-time {
          font-size: 1.4rem;
          color: #1CD0A3;
          line-height: 2rem;
        }
      }
      .price-wrap {
        text-align: right;
        .old-price {
          font-size: 1.4rem;
          line-height: 2rem;
          color: #444444;
          margin-bottom: .5rem;
        }
        .cheap-price-box {
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
              font-size: 3.2rem;
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

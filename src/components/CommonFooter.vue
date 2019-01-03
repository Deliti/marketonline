<template>
  <footer class="common-footer">
    <div class="mobile-footer">
      <div class="footer-wrap">
        <div class="enter-footer active-footer" v-if="activeTab === 'home'">
          首頁
        </div>
        <router-link :to="{name: 'home'}" class="enter-footer" v-else>
          首頁
        </router-link>
        <div class="enter-footer active-footer" v-if="activeTab === 'mine'">
          個人中心
        </div>
        <router-link :to="{name: 'mine'}" class="enter-footer" v-else>
          個人中心
        </router-link>
      </div>
      <router-link :to="{name: 'shopCart'}" class="cart-wrap">
        <div class="cart-bg"></div>
        <i class="cart-num" v-show="goodCount !== 0">{{goodCount}}</i>
      </router-link>
    </div>
    <div class="pc-footer">
      <span>@2019 www.moqqb.com. All Rights Reserved.</span>
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    activeTab: {
      default: 'home'
    }
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['goodCount'])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.common-footer {
  width: 100%;
  position: fixed;
  left: 0;bottom: 0;
  z-index: 11;
  @media screen and (min-width: $screenMid) {
    background: linear-gradient(-135deg, #0AC4BA 0%, #2BDA8E 100%);
  }
  .mobile-footer {
    width: 100%;
    display: flex;
    align-items: flex-end;
    @media screen and (min-width: $screenMid) {
      display: none;
    }
  }
  .pc-footer {
    width: $screenWidth;
    height: 5.5rem;
    margin: 0 auto;
    display: none;
    @media screen and (min-width: $screenMid) {
      display: block;
    }
    span {
      font-size: 1.2rem;
      color: #ffffff;
      line-height: 5.5rem;
    }
  }
  .footer-wrap {
    flex: 1;
    height: 5rem;
    display: flex;
    box-sizing: border-box;
    border-top: 1px solid #E5E5E5;

    .enter-footer {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 5rem;
      font-size: 1.4rem;
      color: #444444;
      background: #FFFFFF;
    }
    .active-footer {
      background: #E5E5E5;
    }
  }
  .cart-wrap {
    width: 7.5rem;
    height: 7.5rem;
    position: relative;
    border-radius: 1.35rem 0px 0px 0px;
    @extend .theme-color;
    .cart-bg {
      width: 100%;
      height: 100%;
      @include backImg('../assets/images/cartfull.png');
      background-position: center center;
      background-size: 5rem 5rem;
    }
    .cart-num {
      width: 1.9rem;
      height: 1.9rem;
      position: absolute;
      border-radius: 50%;
      right: .9rem;top: .9rem;
      background: red;
      text-align: center;
      line-height: 1.9rem;
      font-size: 1.4rem;
      color: #ffffff;
    }
  }

}
</style>



<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { IsPC, DataFormate } from 'utils/utils'
import { mapMutations } from 'vuex'
import { getAllCartList } from 'utils/getData'

export default {
  mounted () {
    this.init()
  },
  beforeCreate () {
    if (IsPC()) {
      localStorage['userAgent'] = 'PC'
    } else {
      localStorage['userAgent'] = 'PHONE'
      document.documentElement.style = "font-size: 2.6666667vw !important;"
    }
  },
  methods: {
    ...mapMutations(['UPDATECART']),
    init () {
      DataFormate()
      if (localStorage['token']) {
        this.getAllCartList()
      }
    },
    async getAllCartList () {
      const params = {}
      const data = await getAllCartList(params)
      if (data.code == 0) {
        this.UPDATECART(data.data)
      }
    }
  }
}
</script>

<style lang="scss">
@import url('../assets/scss/reset.scss');
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  width: 100%;
  height: 100%;
}
.page-title {
  height: 7rem;
  position: relative;
  text-align: center;
  line-height: 7rem;
  color: #444444;
  .return-icon {
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 2.6rem;top: 2.2rem;
    @include backImg('../assets/images/return-icon.png');
  }
  h1 {
    font-size: 1.8rem;
  }
}
</style>

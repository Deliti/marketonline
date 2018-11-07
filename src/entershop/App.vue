<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import url('../assets/scss/reset.scss');
html,body {
  font-size: 2.6666667vw;
}
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
  font-size: 1.8rem;
  line-height: 7rem;
  color: #444444;
  .return-icon {
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 2.6rem;top: 2.2rem;
    @include backImg('../assets/images/return-icon.png');
  }
}
</style>

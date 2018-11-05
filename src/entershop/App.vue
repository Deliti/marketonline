<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setRem } from 'utils/utils'
export default {
  mounted () {
    // setRem()
  }
}
</script>

<style lang="scss">
@import url('../assets/scss/reset.scss');
html,body {
  font-size: 2.6666667vw;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

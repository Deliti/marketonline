<template>
  <div class="aside-wrap" v-show="show">
    <div class="cover-wrap" @click="hideComp"></div>
    <transition name="fade">
      <div class="aside-content" v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideComp () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;top: 0;
  right: 0;bottom: 0;
  z-index: 9999;
  .cover-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0 , .4);
    position: absolute;
    left: 0;top: 0;
    right: 0;bottom: 0;
  }
  .aside-content {
    width: 27.9rem;
    max-width: 85%;
    height: 100%;
    box-sizing: border-box;
    padding: 3.5rem 2.4rem 0 3.5rem;
    overflow: hidden;
    overflow-y: auto;
    background: #ffffff;
    position: absolute;
    left: 0;top: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media screen and (min-width: $screenMid) {
  .aside-wrap {
    position: relative;
    width: 100%;
    .cover-wrap {
      display: none;
    }
    .aside-content {
      width: 37rem;
      max-width: 85%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0 2rem 0;
      background: none;
      position: relative;
    }
  }
}
</style>

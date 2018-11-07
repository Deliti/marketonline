<template>
  <div class="collapse-wrap" :class="{'is-active': isActive}">
    <div class="collapse-item__header" @click="handleHeaderClick">
      <slot name="title"></slot>
      <i :class="['collapse-item__header__arrow', isActive?'el-icon-arrow-down':'' ]"></i>
    </div>
    <collapse-transition>
      <div class="el-collapse-item__wrap" v-show="isActive">
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from '../transition/collapse-transition'
export default {
  data () {
    return {
      isActive: false
    }
  },
  props: {
    title: String,
    name: {
      type: [String, Number],
      default: '1'
    }
  },
  components: {
    CollapseTransition
  },
  methods: {
    handleHeaderClick () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-wrap {
  width: 100%;
  .collapse-item__header {
    height: 2.5rem;
    padding-bottom: .9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    .collapse-item__header__arrow {
      transition: transform .3s;
      width: 1.2rem;
      height: .7rem;
      @include backImg('../../assets/images/up-arrow.png');
      transform: rotate(180deg);
    }
    .el-icon-arrow-down {
      transform: rotate(0deg);
    }
  }
  .el-collapse-item__wrap {
    padding-top: .3rem;
    .el-collapse-item__content {

    }
  }
}
</style>

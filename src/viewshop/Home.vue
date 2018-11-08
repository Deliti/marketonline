<template>
  <div class="page-wrap">
    商城首页
    <div @click="showLeft">xianshi</div>
    <router-link to="aboutus">关于我们</router-link>
    <router-link to="register">注册</router-link>
    <my-aside :show="show" @hide="hide" class="left-content">
      <div class="option-wrap">
        <collapse-item>
          <div slot="title">花蒂玛塘区</div>
          <div v-for="(item, index) in addr"
              :key="index"
              @click="chooseAddr(item)">
            {{item.name}}
          </div>
        </collapse-item>
      </div>
    </my-aside>
    <!-- <div class="test">
      <div @click="toggle">标题</div>
      <collapse-transition>
        <div class="desc" v-show="isActive">lalalalllalallalal</div>
      </collapse-transition>
    </div> -->
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
import MyAside from 'components/MyAside'
import { MessageBox, CollapseItem } from 'components/index.js'
import CollapseTransition from 'components/transition/collapse-transition'

export default {
  data () {
    return {
      show: false,
      isActive: false,
      addr: [
        {
          name: '蒋先生'
        },
        {
          name: '林先生'
        },
        {
          name: '懂先生'
        }
      ]
    }
  },
  components: {
    MyAside,
    CollapseItem,
    CollapseTransition
  },
  mounted () {
    // MessageBox('提示', '操作成功');
    MessageBox({
      message: '两次密码输入不同，<br/>请重新设置',
      buttons: [{
        text: '取消',
        callBack: () => {
          console.log(123)
        }
      },{
        text: '确认',
        callBack: () => {
          console.log(123)
        }
      }]
    })
  },
  methods: {
    showLeft () {
      this.show = true
    },
    hide () {
      this.show = false
    },
    toggle () {
      this.isActive = !this.isActive
    },
    chooseAddr (addr) {
      console.log(addr.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 1rem;
  @extend .theme-color;
}
.test {
  .desc {
    height: 20rem;
    background: red;
    color: #ffffff;
  }
}
.option-wrap {
  width: 100%;
}

</style>

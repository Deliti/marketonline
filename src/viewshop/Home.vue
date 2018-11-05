<template>
  <div class="page-wrap">
    商城首页
    <div @click="showLeft">xianshi</div>
    <router-link to="aboutus">关于我们</router-link>
    <my-aside :show="show" @hide="hide" >
      <div>里面的数据</div>
    </my-aside>
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
import MyAside from 'components/MyAside'
import { MessageBox } from 'components/index.js'
export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    MyAside
  },
  mounted () {
    // MessageBox('提示', '操作成功');
    MessageBox({
      message: '两次密码输入不同，请重新设置',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  height: 1rem;
  background: red;
}
</style>

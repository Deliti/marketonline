<template>
  <div class="page-wrap">
    商城注册页
    <div @click="showLeader">选择团长</div>
    <div @click="showAddr">填写地址</div>
    <my-aside :show="leaderShow" @hide="hideLeader">
      <div class="option-wrap">
        <collapse-item>
          <div slot="title" class="option-title">花蒂玛塘区</div>
          <div v-for="(item, index) in leaders"
              :key="index"
              @click="chooseLeader(item)">
            {{item.name}}
          </div>
        </collapse-item>
        <collapse-item>
          <div slot="title" class="option-title">清华去</div>
          <div v-for="(item, index) in leaders"
              :key="index"
              @click="chooseLeader(item)">
            {{item.name}}
          </div>
        </collapse-item>
      </div>
    </my-aside>
    <my-aside :show="addrShow" @hide="hideAddr">
      <div class="option-wrap">
        <div v-for="(item, index) in addrs"
            :key="index"
            @click="chooseAddr(item)">
          {{item.name}}
        </div>
      </div>
    </my-aside>
  </div>
</template>

<script>
import { MessageBox, MyAside, CollapseItem } from 'components/index.js'

export default {
  data () {
    return {
      leaderShow: false,
      leaders: [
        {
          name: '蒋先生'
        },
        {
          name: '林先生'
        },
        {
          name: '懂先生'
        }
      ],
      leader: {},
      addrShow: false,
      addrs: [
        {
          name: 'xxx马路'
        },
        {
          name: 'mmm马路'
        },
        {
          name: 'lll马路'
        }
      ],
      addr: {},
    }
  },
  components: {
    MyAside,
    CollapseItem
  },
  mounted () {

  },
  methods: {
    showLeader () {
      this.leaderShow = true
    },
    hideLeader () {
      this.leaderShow = false
    },
    chooseLeader (leader) {
      this.leader = leader
    },
    showAddr () {
      this.addrShow = true
    },
    hideAddr () {
      this.addrShow = false
    },
    chooseAddr (addr) {
      this.addr = addr
    }
  }
}
</script>

<style lang="scss" scoped>
.option-title {
  font-size: 1.6rem;
}
</style>

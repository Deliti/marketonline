<template>
  <div class="page-wrap">
    <common-header></common-header>
    <div class="page-title">
      <i class="return-icon" @click="historyBack"></i>
      <h1>地址管理</h1>
    </div>
    <div class="page-content">
      <navbar v-model="selected" class="nav-tab-wrap">
        <tab-item class="nav-tab-item" id="1">我的團長</tab-item>
        <tab-item class="nav-tab-item" id="2">我的地址</tab-item>
      </navbar>
      <tab-container v-model="selected">
        <tab-container-item id="1">
          <div class="cell-wrap">
            <section class="cell-item"
                      v-for="(item, index) in myLeaders"
                      :key="index">
              <div class="order-title-box">
                <p class="order-text-1">團長：{{item.agentName}}  {{item.agentPhone}}</p>
                <p class="order-text-1">{{item.agentAddress}}</p>
                <i class="close-icon" @click="deleteLeader(item)"></i>
              </div>
            </section>
          </div>
          <div class="add-container">
            <div :class="['fix-button', leaderShow?'add-title-active':'']" @click="toggleLeader">
              <i class="add-icon"></i>
              <label>添加新團長</label>
              <i :class="['down-icon', leaderShow?'rotate-down':'']"></i>
            </div>
            <my-aside :show="leaderShow" @hide="hideLeader" class="aside-wrap-polify">
              <div class="option-seleted">
                <div class="seleted-title">已選團長：</div>
                <p class="seleted-text" v-if="leader.id">{{leader.address}}<br>團長：{{leader.name}}  {{leader.phone}}</p>
                <p class="no-seleted" v-else>—— 無 ——</p>
              </div>
              <div class="option-wrap">
                <collapse-item v-for="(childLeaders, districtKey) in leaders"
                                :key="districtKey">
                  <div slot="title" class="option-title">{{districtKey}}</div>
                  <div v-for="(item, index) in childLeaders"
                      :key="index"
                      :class="['option-item', isMyLeaders(item.id) ? 'option-item-disable' : '']"
                      @click="chooseLeader(item)">
                    <i :class="['radius-icon', leader.id == item.id?'radius-seleted':'']"></i>
                    <div class="option-box">
                      <p class="option-text">{{item.address}}</p>
                      <p class="option-text">團長：{{item.name}}  {{item.phone}}</p>
                    </div>
                  </div>
                </collapse-item>
              </div>
            </my-aside>
          </div>
        </tab-container-item>
        <tab-container-item id="2">
          <div class="cell-wrap">
            <section class="cell-item"
                      v-for="(item, index) in myAddress"
                      :key="index">
              <div class="order-title-box">
                <p class="order-text-1">{{item.name}}  {{item.phone}}</p>
                <p class="order-text-1">{{item.address}}</p>
                <i class="close-icon" @click="deleteAddr(item)"></i>
              </div>
            </section>
          </div>
          <div :class="['fix-button', addrShow?'add-title-active':'']" @click="toggleAddr">
            <i class="add-icon"></i>
            <label>添加新地址</label>
            <i :class="['down-icon', addrShow?'rotate-down':'']"></i>
          </div>
          <add-address @saveAddr="saveAddr" @hideAddr='hideAddr' :show="addrShow"></add-address>
        </tab-container-item>
      </tab-container>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import { CommonHeader, MessageBox, MyAside, CollapseItem, AddAddress } from 'components'
import { Toast } from 'mint-ui'
import { getMyLeader, getLeaderList, getMyAddr, addLeader, deleteLeader, addAddr, deleteAddr } from 'utils/getData'
export default {
  data () {
    return {
      selected: this.$route.query.type == 2 ? "2" : "1",
      leaderShow: false,
      addrShow: false,
      leaders: {},
      myLeaders: [],
      leader: {},
      myAddress: []
    }
  },
  components: {
    CommonHeader,
    Navbar,
    AddAddress,
    TabItem,
    TabContainer,
    TabContainerItem,
    MyAside,
    CollapseItem
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.selected == 1) {
        this.getMyLeader()
        this.getAllLeaders()
      } else {
        this.getMyAddr()
      }
    },
    historyBack () {
      history.go(-1)
    },
    async getMyLeader () {
      const params = {
        pageNo: 0,
        pageSize: 100
      }
      const data = await getMyLeader(params)
      if (data.code == 0) {
        this.myLeaders = data.page.list
      }
    },
    async getAllLeaders () {
      const data = await getLeaderList()
      if (data.code == 0) {
        console.log(data)
        this.leaders = data.data
      }
    },
    async getMyAddr () {
      const data = await getMyAddr()
      if (data.code == 0) {
        this.myAddress = data.page.list
      }
    },
    saveAddr () {
      this.hideAddr()
      this.getMyAddr()
    },
    isMyLeaders (leaderId) {
      return this.myLeaders.filter(item => item.agentId == leaderId).length > 0 ? true : false
    },
    toggleLeader () {
      this.leaderShow = !this.leaderShow
    },
    showLeader () {
      this.leaderShow = true
    },
    hideLeader () {
      this.leaderShow = false
    },
    hideAddr () {
      this.addrShow = false
    },
    async chooseLeader (leader) {
      if (this.isMyLeaders(leader.id)) {
        return false
      }
      this.leader = leader
      const params = {
        "status": "0",
        "agentId": this.leader.id
      }
      const data = await addLeader(params)
      if (data.code == 0) {
        this.leaderShow = false
        this.getMyLeader()
      }
    },
    deleteLeader (leaderInfo) {
      MessageBox({
        message: '確定刪除我的團長嗎？',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: async () => {
            const params = {
              "agentId": leaderInfo.agentId
            }
            const data = await deleteLeader(params)
            if (data.code == 0) {
              this.getMyLeader()
            }
          }
        }]
      })
    },
    toggleAddr () {
      // this.$router.push('addAddr')
      this.addrShow = !this.addrShow
    },
    deleteAddr (addrInfo) {
      MessageBox({
        message: '確定刪除該地址嗎？',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: async () => {
            const params = {
              "addressId": addrInfo.id
            }
            const data = await deleteAddr(params)
            if (data.code == 0) {
              this.getMyAddr()
            }
          }
        }]
      })
    }
  },
  watch: {
    selected (newV, oldV) {
      if (newV == 1) {
        this.getMyLeader()
      } else {
        this.getMyAddr()
      }
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  background: #F6F6F6;
  width: 100%;
  min-height: 100%;
  @media screen and (min-width: $screenMid) {
    background: #ffffff;
  }
  .page-title {
    background: #ffffff;
  }
  .page-content {
    box-sizing: border-box;
    @media screen and (min-width: $screenMid) {
      width: $screenWidth;
      padding: 3rem 1.5rem 0;
      margin: 0 auto;
    }
    .nav-tab-wrap {
      height: 3.5rem;
      margin-bottom: 1rem;
      @media screen and (min-width: $screenMid) {
        border-bottom: 1px solid #E6E6E6;
        margin-bottom: 2rem;
      }
      .nav-tab-item {
        height: 100%;
        box-sizing: border-box;
        padding: 0;
        text-align: center;
        .mint-tab-item-label {
          font-size: 1.6rem;
          display: inline-block;
          height: 100%;
          line-height: 3.5rem;
          box-sizing: border-box;
          padding: 0 .4rem;
        }
      }
      .is-selected {
        color: #1CD0A3;
        text-decoration: none;
        border: none;
        .mint-tab-item-label {
          border-bottom: .2rem solid #1CD0A3;
        }
      }
    }
    .cell-wrap {
      box-sizing: border-box;
      padding: 0 .7rem 8rem;
      .cell-item {
        width: 100%;
        box-shadow: 0 .2rem .4rem 0 rgba(0,0,0,0.09);
        border-radius: .2rem;
        margin-bottom: .9rem;
        @media screen and (min-width: $screenMid) {
          box-shadow: none;
          background: #FFFFFF;
          border: 1px solid #D5D5D5;
          border-radius: 4px;
        }
        .order-text-1 {
          text-align: left;
          font-size: 1.7rem;
          color: #444444;
          @media screen and (min-width: $screenMid) {
            width: 50%;
          }
        }
        .close-icon {
          width: 1.33rem;
          height: 1.33rem;
          position: absolute;
          right: 1.25rem;top: 50%;
          transform: translateY(-50%);
          @include backImg('../assets/images/delete-icon.png');
        }
        .order-title-box {
          width: 100%;
          background: #ffffff;
          position: relative;
          box-sizing: border-box;
          padding: 1.3rem 1.6rem 1.15rem 1.75rem;
          border-bottom: 1px solid #E6E6E6;
          &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;top: 0;
            width: .5rem;
            height: 100%;
            background: #1CD0A3;
            border-radius: .2rem 0px 0px 0px;
          }
          @media screen and (min-width: $screenMid) {
            display: flex;
            justify-content: flex-start;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 4px;
          }
        }
      }
    }
    .add-container {
      padding: 0 .7rem;
    }
    .fix-button {
      position: fixed;
      width: 75%;
      height: 4.1rem;
      left: 12.5%;
      bottom: 3.5rem;
      @extend .theme-color;
      border-radius: 1.25rem;
      text-align: center;
      line-height: 4.1rem;
      color: #ffffff;
      font-size: 1.8rem;
      @media screen and (min-width: $screenMid) {
        width: 100%;
        text-align: left;
        position: relative;
        left: 0;bottom: 0;
        background: none;
        color: #444444;
        border-radius: 0;
      }
      .add-icon {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        margin-right: 1rem;
        @include backImg('../assets/images/add-icon.png');
        @media screen and (min-width: $screenMid) {
          display: none;
        }
      }
      .down-icon {
        display: none;
        width: 1.1rem;
        height: .6rem;
        @include backImg('../assets/images/triangle4.png');
        transition: all .3s;
        @media screen and (min-width: $screenMid) {
          display: inline-block;
        }
      }
      .rotate-down {
        transform: rotate(180deg);
      }
    }
    .add-title-active {
      @media screen and (min-width: $screenMid) {
        border-bottom: 1px solid #979797;
      }
    }
    label {
      @media screen and (min-width: $screenMid) {
        margin-right: 1rem;
      }
    }
  }
  .aside-wrap-polify {
    @media screen and (min-width: $screenMid) {
      .collapse-wrap {
        .collapse-item__header {
          .collapse-item__header__arrow {
            @include backImg('../assets/images/up-arrow.png');
          }
        }
      }
    }
  }
  .option-seleted {
    @media screen and (min-width: $screenMid) {
      display: none;
    }
    .seleted-title {
      font-size: 1.4rem;
      color: #444444;
    }
    .seleted-text {
      font-size: 1.4rem;
      color: #000000;
      margin-bottom: 2rem;
    }
    .no-seleted {
      font-size: 1.8rem;
      color: #000000;
    }
  }
  .option-wrap {
    .option-title {
      font-size: 1.8rem;
      color: #444444;
    }
    .option-item {
      padding-top: 1rem;
      display: flex;
      .radius-icon{
        width: 1.4rem;
        height: 1.4rem;
        margin: .3rem .9rem 0 0;
        @include backImg('../assets/images/radius-item.png');
        @media screen and (min-width: $screenMid) {
          margin-right: 1.4rem;
        }
      }
      .radius-disable {
        @include backImg('../assets/images/radius-item-disabled.png');
      }
      .radius-seleted {
        @include backImg('../assets/images/radius-seleted.png');
      }
      .option-box {
        font-size: 1.6rem;
        color: #444444;
      }
    }
    .option-item-disable {
      .radius-icon {
        @include backImg('../assets/images/radius-item-disabled.png');
      }
      .option-box {
        color: #A4A4A4;
      }
    }
  }
}
</style>

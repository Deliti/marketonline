<template>
  <div class="page-wrap">
    <div class="page-title">
      <i class="return-icon"></i>
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
            <section class="cell-item">
              <div class="order-title-box">
                <div class="flex-box">
                  <p class="order-text-1">團長：江先生  96XXXXXX</p>
                  <i class="close-icon" @click="deleteLeader"></i>
                </div>
                <p class="order-text-1">XX馬路XX號XX樓XX棟XX房</p>
              </div>
            </section>
          </div>
          <div class="fix-button" @click="showLeader">
            <i class="add-icon"></i>
            <label>添加新團長</label>
          </div>
        </tab-container-item>
        <tab-container-item id="2">
          <div class="cell-wrap">
            <section class="cell-item">
              <div class="order-title-box">
                <div class="flex-box">
                  <p class="order-text-1">梁女士  96XXXXXX</p>
                  <i class="close-icon" @click="deleteAddr"></i>
                </div>
                <p class="order-text-1">XX馬路XX號XX樓XX棟XX房</p>
              </div>
            </section>
          </div>
          <div class="fix-button" @click="linkAddr">
            <i class="add-icon"></i>
            <label>添加新地址</label>
          </div>
        </tab-container-item>
      </tab-container>
    </div>
    <my-aside :show="leaderShow" @hide="hideLeader">
      <div class="option-seleted">
        <div class="seleted-title">已選團長：</div>
        <p class="seleted-text">XX馬路XX號XX樓XX棟XX房<br>團長：江先生  96XXXXXX</p>
        <p class="no-seleted">—— 無 ——</p>
      </div>
      <div class="option-wrap">
        <collapse-item>
          <div slot="title" class="option-title">花蒂玛塘区</div>
          <div v-for="(item, index) in leaders"
              :key="index"
              class="option-item option-item-disable"
              @click="chooseLeader(item)">
            <i :class="['radius-icon', leader.id == item.id?'radius-seleted':'']"></i>
            <div class="option-box">
              <p class="option-text">XX馬路XX號XX樓XX棟XX房</p>
              <p class="option-text">團長：江先生  96XXXXXX</p>
            </div>
          </div>
        </collapse-item>
      </div>
    </my-aside>
  </div>
</template>

<script>
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import { MessageBox, MyAside, CollapseItem } from 'components'
export default {
  data () {
    return {
      selected: "1",
      leaderShow: false,
      leaders: [
        {
          id: 1,
          name: '蒋先生'
        },
        {
          id: 2,
          name: '林先生'
        },
        {
          id: 3,
          name: '懂先生'
        }
      ],
      leader: {},
    }
  },
  components: {
    Navbar,
    TabItem,
    TabContainer,
    TabContainerItem,
    MyAside,
    CollapseItem
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
    deleteLeader () {
      MessageBox({
        message: '確定刪除我的團長嗎？',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: () => {
            console.log(321)
          }
        }]
      })
    },
    linkAddr () {
      this.$router.push('addAddr')
    },
    deleteAddr () {
      MessageBox({
        message: '確定刪除該地址嗎？',
        buttons: [{
          text: '取消',
          callBack: () => {
            console.log(123)
          }
        },{
          text: '確認',
          callBack: () => {
            console.log(321)
          }
        }]
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  background: #F6F6F6;
  width: 100%;
  height: 100%;
  .page-title {
    background: #ffffff;
  }
  .page-content {
    .nav-tab-wrap {
      height: 3.5rem;
      margin-bottom: 1rem;
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
        .order-text-1 {
          text-align: left;
          font-size: 1.7rem;
          color: #444444;
        }
        .close-icon {
          width: 1.33rem;
          height: 1.33rem;
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
        }
      }
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
      .add-icon {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        margin-right: 1rem;
        @include backImg('../assets/images/add-icon.png');
      }
    }
  }
  .option-seleted {
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
        margin-right: .9rem;
        @include backImg('../assets/images/radius-item.png');
      }
      .radius-disable {
        @include backImg('../assets/images/radius-item-disabled.png');
      }
      .radius-seleted {
        @include backImg('../assets/images/radius-seleted.png');
      }
      .option-box {
        font-size: 1.4rem;
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

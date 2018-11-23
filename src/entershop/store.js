import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopCart: []
  },
  mutations: {
    UPDATECART (state, cartList) {
      state.shopCart = []
      cartList.forEach(item => {
        item.count = item.num
        item.id = item.productId
        state.shopCart.push(item)
      })
      console.log(state.shopCart)
    },
    CLEARCART (state) {
      state.shopCart = []
    },
    ADDGOOD (state, goodInfo) {
      const { id } = goodInfo
      let isHas = state.shopCart.some(item => {
        if (item.id === id) {
          item.count ++
          return true
        } else {
          return false
        }
      })
      if (!isHas) {
        state.shopCart.push(Object.assign({}, goodInfo, {count: 1}))
      }
      console.log(state.shopCart)
    },
    DESGOOD (state, goodId) {
      const len = state.shopCart.length
      for (let i = 0; i < len; i++) {
        if (state.shopCart[i].id == goodId) {
          state.shopCart[i].count --
          if (state.shopCart[i].count === 0) {
            state.shopCart.splice(i, 1)
            break
          }
        }
      }
    },
    DELETEGOOD (state, goodId) {
      const len = state.shopCart.length
      for (let i = 0; i < len; i++) {
        if (state.shopCart[i].id === goodId) {
          state.shopCart.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {

  },
  getters: {
    goodCount: state => {
      let count = 0
      state.shopCart.map(item => count += item.count)
      return count
    },
    cartMoney: state => {
      let money = 0
      state.shopCart.map(item => money += item.count*item.money)
      return money
    }
  }
})

<template>
  <div class="time-wrap" @click="countDown">
    <label>{{verifyText}}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 60,
      interval: null,
      verifyText: '發送驗證碼'
    }
  },
  props: {
    
  },
  methods: {
    countDown () {
      if (this.interval != null) {
        return false
      }
      clearInterval(this.interval)
      this.$emit('sendCode', () => {
        this.interval = setInterval(() => {
          if (this.time < 1) {
            this.reset()
            return false
          }
          this.time--
          this.verifyText = `${this.time}s後可重新發送`
        }, 1000)
      })
    },
    reset () {
      this.time = 60
      this.verifyText = '重新發送'
      clearInterval(this.interval)
      this.interval = null
    },
    clearInterVal () {
      clearInterval(this.interval)
    }
  }
}
</script>

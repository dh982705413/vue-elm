<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  created() {
    this.getLoaction()
  },
  methods: {
    getLoaction() {
      const self = this
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.Geolocation', function() {
        // eslint-disable-next-line no-undef
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })

        geolocation.getCurrentPosition()
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'complete', onComplete)
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
          // data是具体的定位信息
          self.setLocation(data)
          self.setAddress(data.formattedAddress)
        }

        function onError(data) {
          // 定位出错
          console.log(data)
        }
      })
    },
    ...mapActions(['setLocation', 'setAddress'])
  }
}
</script>
<style lang="scss">
@import './assets/scss/enter';
@import './assets/scss/_var';
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background-color: $bgcolor;
}
</style>

<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
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
          self.getLngLatLocation()
        }
      })
    },
    getLngLatLocation() {
      const self = this
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.CitySearch', function() {
        // eslint-disable-next-line no-undef
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(result)
            // eslint-disable-next-line no-undef
            AMap.plugin('AMap.Geocoder', function() {
              // eslint-disable-next-line no-undef
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',')

              geocoder.getAddress(lnglat, function(status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  // console.log(data);
                  self.$store.dispatch('setLocation', {
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  })

                  self.$store.dispatch(
                    'setAddress',
                    data.regeocode.formattedAddress
                  )
                }
              })
            })
          }
        })
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

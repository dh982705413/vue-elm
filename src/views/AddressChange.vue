<template>
  <div class="address-change">
    <elm-header
      title="选取收货地址"
      :isLeft="true"
      @go="$router.push('/home')"
    ></elm-header>
    <div class="city-search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学习等"
        />
      </div>
      <location :address="address" @click="selectAddress"></location>
    </div>
    <div class="area">
      <ul class="area_list">
        <li
          v-for="(item, index) in areaList"
          :key="index"
          @click="selectAddress(item)"
        >
          <h4>{{ item.name }}</h4>
          <p>
            {{ item.district
            }}{{ item.address.length ? item.address : '暂无详情' }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
import Location from '@/components/Location'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'address-change',
  components: {
    ElmHeader,
    Location
  },
  computed: {
    ...mapGetters(['address'])
  },
  data() {
    return {
      city: this.$route.params.city || '赣州市',
      search_val: '',
      areaList: []
    }
  },
  watch: {
    search_val() {
      this.searchPlace()
    }
  },
  methods: {
    ...mapActions(['setAddress']),
    searchPlace() {
      const self = this
      // eslint-disable-next-line no-undef
      AMap.plugin('AMap.Autocomplete', function() {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: self.city
        }
        // eslint-disable-next-line no-undef
        var autoComplete = new AMap.Autocomplete(autoOptions)
        // eslint-disable-next-line no-undef
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.areaList = result.tips
        })
      })
    },
    selectAddress(item) {
      if (item) {
        // ? 设置地址
        this.setAddress(item.district + item.address)
      } else {
        this.setAddress(this.address)
      }
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.address-change {
  .city-search {
    @include flex(center, center, column);
    padding: 15px 25px;
    background-color: #fff;
    .search {
      @include flex(space-between, center);
      padding: 15px;
      width: 100%;
      border-radius: 20px;
      background-color: #eee;
      .city {
        margin-right: 10px;
      }
      input {
        @include inputInit();
        flex: 1;
        height: 100%;
        background-color: #eee;
        padding-left: 5px;
      }
    }
  }
  .area {
    margin-top: 20px;
    width: 100%;
    .area_list {
      background-color: #fff;
      li {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        min-height: 70px;
        border-top: 1px solid #eee;
        padding-left: 10px;
        h4 {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: #aaa;
        }
      }
    }
  }
}
</style>

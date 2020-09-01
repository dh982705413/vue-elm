<template>
  <div class="city">
    <elm-header title="选择城市"></elm-header>
    <div
      class="search-wrap"
      :class="{ 'is-search': searchCities.length !== 0 }"
    >
      <div class="search">
        <div class="search-input">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="输入城市名" v-model="city_val" />
        </div>
        <button @click="$router.push({ name: 'address', params: { city } })">
          取消
        </button>
      </div>
      <location
        :address="city"
        v-show="searchCities.length === 0"
        @click="selecteCity({ name: city })"
      ></location>
    </div>
    <div class="scorll-container" v-show="searchCities.length === 0">
      <alphabet
        @selectecity="selecteCity"
        ref="allcity"
        :cityInfo="cityInfo"
        :keys="keys"
      ></alphabet>
    </div>
    <div class="search-list">
      <ul>
        <li
          v-for="(item, index) in searchCities"
          :key="index"
          @click="selecteCity(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
import Location from '@/components/Location'
import Alphabet from '@/components/Alphabet'
import { mapGetters } from 'vuex'
export default {
  name: 'city',
  components: {
    ElmHeader,
    Location,
    Alphabet
  },
  data() {
    return {
      city_val: '',
      cityInfo: null,
      keys: [],
      allcitys: []
    }
  },
  computed: {
    ...mapGetters(['city']),
    searchCities() {
      if (!this.city_val) {
        return []
      } else {
        return this.allcitys.filter(city => city.name.includes(this.city_val))
      }
    }
  },
  created() {
    this.getCityInfo()
  },
  methods: {
    async getCityInfo() {
      const res = await this.$http('/posts/cities')
      this.cityInfo = res
      this.keys = Object.keys(res)
      this.keys.pop()
      this.keys.sort()
      this.allcitys = Object.values(res)
      this.allcitys.pop()
      this.allcitys = this.allcitys.flat()
      this.$nextTick(() => {
        this.$refs.allcity.initScroll()
      })
    },
    selecteCity(city) {
      this.$router.push({ name: 'address', params: { city: city.name } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
@import '../assets/scss/_var';
.city {
  height: 100%;
  .search-wrap {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .search {
      display: flex;
      .search-input {
        flex: 1;
        padding: 10px 5px;
        background-color: #eee;
        border-radius: 15px;
        margin-bottom: 5px;
        input {
          @include inputInit();
          background-color: #eee;
          padding-left: 5px;
        }
      }
      button {
        @include inputInit();
        background-color: #fff;
        color: $themeColor;
        cursor: pointer;
      }
    }
  }
  .scorll-container {
    height: 100%;
    overflow: hidden;
  }
  .search-list {
    background-color: #fff;
    padding: 0 20px;
    li {
      height: 40px;
      line-height: 40px;
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }
  .is-search {
    border: none;
    margin-bottom: 0;
  }
}
</style>

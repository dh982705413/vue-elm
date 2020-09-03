<template>
  <div class="search">
    <elm-header
      title="搜索"
      :isLeft="true"
      @go="$router.push('/home')"
      class="fiexdSearch"
    ></elm-header>
    <div class="search-wrap">
      <div class="input-wrap">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="输入商家,商品名称" v-model="keyword" />
      </div>
      <button @click="keyWordChange">搜索</button>
    </div>
    <div class="shop" v-if="empty">
      <div class="empty-wrap">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
        />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
    </div>
    <search-index
      :result="result"
      v-if="empty || !showShop"
      @click="showItemClick"
    ></search-index>
    <filter-view
      :filterData="filterData"
      @updata="updata"
      v-if="showShop"
      class="fiexdFilterView"
    ></filter-view>
    <div class="container" v-if="showShop">
      <div
        class="shop-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
      >
        <index-shop
          v-for="(item, index) in restaurants"
          :key="index"
          :restaurant="item.restaurant"
        ></index-shop>
      </div>
    </div>
  </div>
</template>

<script>
import SearchIndex from '@/components/SearchIndex'
import ElmHeader from '@/components/ElmHeader'
import FilterView from '@/components/FilterView'
import IndexShop from '@/components/IndexShop'
import { InfiniteScroll } from 'mint-ui'

export default {
  name: 'search',
  components: {
    ElmHeader,
    SearchIndex,
    FilterView,
    IndexShop
  },
  directives: {
    InfiniteScroll
  },
  data() {
    return {
      keyword: '',
      result: {
        restaurants: [],
        words: []
      },
      empty: false,
      showShop: false,
      filterData: null,
      restaurants: [],
      page: 0,
      size: 7,
      loading: false,
      updataData: ''
    }
  },
  watch: {
    keyword() {
      this.empty = false
      this.showShop = false
      if (this.keyword !== '') {
        this.keyWordChange()
      }
    }
  },
  async created() {
    const filterData = await this.$http.get('/profile/filter')
    this.filterData = filterData
  },
  methods: {
    async keyWordChange() {
      try {
        const res = await this.$http.get(`/profile/typeahead/${this.keyword}`)
        this.result = res
        if (
          this.result.restaurants.length === 0 &&
          this.result.words.length === 0
        ) {
          this.empty = true
        } else {
          this.empty = false
        }
      } catch {
        this.empty = false
      }
    },
    showItemClick() {
      this.page = 0
      this.restaurants = []
      this.showShop = true
      this.loadData()
    },
    updata(condation) {
      this.updataData = condation
      this.loadData()
    },
    async loadMore() {
      this.page++
      const restaurants = await this.$http.post(
        `/profile/restaurants/${this.page}/${this.size}`,
        this.updataData
      )
      if (restaurants.length > 0) {
        this.restaurants = this.restaurants.concat(restaurants)
      } else {
        this.loading = true
      }
    },
    async loadData() {
      this.page = 1
      this.loading = false
      const restaurants = await this.$http.post(
        `/profile/restaurants/${this.page}/${this.size}`,
        this.updataData
      )
      this.restaurants = restaurants
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  .search-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    .input-wrap {
      width: 80%;
      padding: 8px;
      background-color: #eee;
      border-radius: 12px;
      input {
        width: 80%;
        background-color: #eee;
        height: 100%;
        line-height: 71px;
        border: none;
        outline: none;
        padding-left: 5px;
      }
    }
    button {
      border: none;
      outline: none;
      background-color: #fff;
      font-size: 16px;
      color: #4d90fe;
    }
  }
  .shop {
    width: 100%;
    height: 100%;
    .empty-wrap {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 120px;
      }
      .empty_txt {
        h4 {
          margin-bottom: 5px;
        }
        span {
          font-size: 0.8rem;
          color: #aaa;
        }
      }
    }
  }
  .container {
    width: 100%;
    height: 100%;
    .shop-list {
      width: 100%;
      height: 100%;
    }
  }
  .fiexdSearch {
    width: 100%;
    height: 54px;
    position: sticky;
    top: 0;
    z-index: 9999;
  }
  .fiexdFilterView {
    width: 100%;
    position: sticky;
    top: 54px;
    z-index: 999;
  }
}
</style>

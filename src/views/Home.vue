<template>
  <div class="home">
    <div class="header">
      <div
        class="address_map"
        @click="$router.push({ name: 'address', params: { city } })"
      >
        <i class="fa fa-map-marker"></i>
        <span>{{ address ? address : '正在获取' }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <div class="shop_search-wrap" :class="{ fixedview: showFilter }">
      <div class="shop_search" @click="$router.push('/search')">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div class="container">
      <swipe :auto="4000" class="swipe">
        <swipe-item v-for="(item, index) in swipeImgs" :key="index">
          <img :src="item" alt="" />
        </swipe-item>
      </swipe>
      <swipe :auto="0" class="category-swipe">
        <swipe-item v-for="(item, index) in entries" :key="index">
          <ul class="category-list">
            <li
              v-for="(category, index) in item"
              :key="index"
              class="category-item"
            >
              <img :src="category.image" alt="" />
              <span>{{ category.name }}</span>
            </li>
          </ul>
        </swipe-item>
      </swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航 -->
    <filter-view
      :filterData="filterData"
      @searchFiexd="showFilterView"
      @updata="update"
    ></filter-view>
    <!-- 商家信息 -->
    <loadmore
      :top-method="loadData"
      :bottom-method="loadMore"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      :bottomPullText="bottomPullText"
      ref="loadmore"
    >
      <index-shop
        v-for="(item, index) in restaurants"
        :key="index"
        :restaurant="item.restaurant"
      ></index-shop>
    </loadmore>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swipe, SwipeItem, Loadmore } from 'mint-ui'
import FilterView from '@/components/FilterView'
import IndexShop from '@/components/IndexShop'
export default {
  name: 'home',
  components: {
    Swipe,
    SwipeItem,
    FilterView,
    IndexShop,
    Loadmore
  },
  computed: {
    ...mapGetters(['address', 'city'])
  },
  created() {
    this.getData()
  },
  data() {
    return {
      swipeImgs: [],
      entries: [],
      filterData: {
        screenBy: []
      },
      showFilter: false,
      page: 1,
      size: 5,
      restaurants: [],
      allLoaded: false,
      bottomPullText: '上拉加载更多',
      updataData: null
    }
  },
  methods: {
    async getData() {
      const res = await this.$http.get('/profile/shopping')
      this.swipeImgs = res.swipeImgs
      this.entries = res.entries

      const filterData = await this.$http.get('/profile/filter')
      this.filterData = filterData

      // ? 拉取商家信息
      this.loadData()
    },
    showFilterView(isShow) {
      this.showFilter = isShow
    },
    update(condation) {
      console.log(condation)
      this.updataData = condation
      this.loadData()
    },
    async loadData() {
      this.page = 1
      this.allLoaded = false
      this.bottomPullText = '上拉加载更多'
      const restaurants = await this.$http.post(
        `/profile/restaurants/${this.page}/${this.size}`,
        this.updataData
      )
      this.restaurants = restaurants
      this.$refs.loadmore.onTopLoaded()
    },
    async loadMore() {
      if (!this.allLoaded) {
        this.page++
        const restaurants = await this.$http.post(
          `/profile/restaurants/${this.page}/${this.size}`
        )
        this.$refs.loadmore.onBottomLoaded()
        if (restaurants.length > 0) {
          this.restaurants = this.restaurants.concat(restaurants)
          if (restaurants < this.size) {
            this.allLoaded = true
            this.bottomPullText = '没有更多了哦'
          }
        } else {
          this.allLoaded = true
          this.bottomPullText = '没有更多了哦'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  .header {
    width: 100%;
    background-color: #009eef;
    padding: 20px;
    .address_map {
      color: #fff;
      @include flex();
      span {
        margin-left: 5px;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .shop_search-wrap {
    position: sticky;
    top: 0;
    background-color: #009eef;
    text-align: center;
    padding: 10px 30px;
    color: #aaa;
    z-index: 999;
    .shop_search {
      border-radius: 10px;
      background-color: #fff;
      padding: 10px 0;
    }
  }
  .container {
    width: 100%;
    .swipe {
      height: 100px;
      img {
        width: 100%;
        height: 100px;
      }
    }
    .category-swipe {
      height: 140px;
      padding-bottom: 25px;
      box-sizing: content-box;
      background-color: #fff;
      .category-list {
        display: flex;
        flex-wrap: wrap;
        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 20%;
          height: 70px;
          img {
            width: 50px;
            height: 50px;
          }
          span {
            color: #666;
            font-size: 0.82rem;
          }
        }
      }
    }
  }
  .shoplist-title {
    text-align: center;
    padding: 10px 0;
    background-color: #fff;
    &::before {
      content: '一';
      margin-right: 20px;
      color: #999;
    }
    &::after {
      content: '一';
      margin-left: 20px;
      color: #999;
    }
  }
  .fixedview {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
}
</style>

<template>
  <div class="goods" v-if="shopInfo">
    <!-- 商家推荐 -->
    <div
      class="recommend"
      v-for="(recommend, index) in shopInfo.recommend"
      :key="index"
    >
      <p class="recommend-name">{{ recommend.name }}</p>
      <ul class="recommend-wrap">
        <li
          v-for="(item, index) in recommend.items"
          :key="index"
          @click="handleFood(item)"
        >
          <img v-lazy="item.image_path" alt="" />
          <div class="recommend-food">
            <p class="recommend-food-name">{{ item.name }}</p>
            <p class="recommend-food-zm">
              <span>月售{{ item.month_sales }}</span>
              <span> 好评{{ item.satisfy_rate }}%</span>
            </p>
            <p class="recommend--food-price">
              ￥{{ item.activity.fixed_price }}
              <cart-controll :food="item"></cart-controll>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品分类 -->
    <div class="menuview">
      <!-- 左侧 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            v-for="(item, index) in shopInfo.menu"
            :key="index"
            @click="selectMenu(index)"
            :class="{ current: index === currentIndex }"
          >
            <img :src="item.icon_url" v-if="item.icon_url" alt="" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧 -->
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li
            class="food-list-hook"
            v-for="(item, index) in shopInfo.menu"
            :key="index"
          >
            <div class="category-title">
              <strong>{{ item.name }}</strong>
              <span>{{ item.description }}</span>
            </div>
            <!-- 内容下 -->
            <div
              class="food-detail"
              v-for="(food, i) in item.foods"
              :key="i"
              @click="handleFood(food)"
            >
              <img :src="food.image_path" alt="" />
              <section class="food-detail-info">
                <h4>{{ food.name }}</h4>
                <p class="food-detail-desc">{{ food.description }}</p>
                <p class="food-detail-sales">
                  月售{{ food.month_sales }} 好评率{{ food.satisfy_rate }}%
                </p>
                <div class="food-detail-price">
                  <span class="price">￥{{ food.activity.fixed_price }}</span>
                  <cart-controll :food="food"></cart-controll>
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <shop-cart :shopInfo="shopInfo"></shop-cart>
    <!-- 商品详情 -->
    <food
      :food="selectFood"
      :isShow="isShowDetail"
      @close="isShowDetail = false"
    ></food>
  </div>
</template>

<script>
import CartControll from '@/components/Shops/CartControll'
import BScroll from 'better-scroll'
import ShopCart from '@/views/Shops/ShopCart'
import Food from '@/views/Shops/Food'

export default {
  name: 'goods',
  components: {
    CartControll,
    ShopCart,
    Food
  },
  created() {
    this.getData()
  },
  data() {
    return {
      shopInfo: null,
      menuScroll: null,
      foodScroll: null,
      scrollY: 0, // ? 右侧菜单当前滚动到的y值
      listHeight: [],
      selectFood: null,
      isShowDetail: false
    }
  },
  computed: {
    currentIndex: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        for (let i = 0; i < this.listHeight.length; i++) {
          const height1 = this.listHeight[i]
          const height2 = this.listHeight[i + 1]
          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      set(val) {
        return val
      }
    }
  },
  methods: {
    async getData() {
      const res = await this.$http.get('/profile/batch_shop')
      res.recommend[0].items.forEach(item => (item.count = 0))
      res.menu.forEach(item => {
        item.foods.forEach(food => (food.count = 0))
      })
      this.shopInfo = res
      this.$nextTick(() => {
        this.initScroll()
        this.calculateHeight()
      })
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight() {
      const foodlist = this.$refs.foodWrapper.getElementsByClassName(
        'food-list-hook'
      )
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodlist.length - 1; i++) {
        const item = foodlist[i]
        height += item.clientHeight - 38
        this.listHeight.push(height)
      }
    },
    selectMenu(index) {
      const foodlist = this.$refs.foodWrapper.getElementsByClassName(
        'food-list-hook'
      )
      const el = foodlist[index]
      this.currentIndex = index
      this.foodScroll.scrollToElement(el, 250)
    },
    handleFood(item) {
      this.selectFood = item
      this.isShowDetail = true
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  width: 100%;
  height: calc(100% - 40px);
  .recommend {
    background-color: #fff;
    .recommend-name {
      padding: 10px;
      font-size: 1.1rem;
      font-weight: bold;
    }
    .recommend-wrap {
      display: flex;
      overflow-x: scroll;
      width: 100%;
      img {
        display: block;
        width: 32vw;
        height: 32vw;
        border-top-left-radius: 0.8vw;
        border-top-right-radius: 0.8vw;
        max-width: 100%;
      }
      li {
        flex: none;
        width: 32vw;
        margin-right: 2.666667vw;
      }
      .recommend-food {
        margin-top: 10px;
        .recommend-food-name {
          color: #333;
          font-size: 0.8rem;
          margin: 1.866667vw 0 1.233333vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .recommend-food-zm {
          color: #999;
          font-size: 0.6rem;
          margin-bottom: 1.866667vw;
          min-height: 1em;
        }
        .recommend--food-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 0.266667vw;
          font-size: 1rem;
          color: #ff5339;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .menuview {
    height: 100%;
    padding-bottom: 10.8vw;
    background-color: #fff;
    display: flex;
    .menu-wrapper {
      overflow-y: hidden;
      /* height: 100%; */
      height: calc(100% - 12.8vw);
      background-color: #f8f8f8;
      padding-bottom: 10.666667vw;
      width: 20.533333vw;
      li {
        padding: 4.666667vw 2vw;
        font-size: 0.6rem;
        color: #666;
        line-height: 1.2;
        img {
          max-width: 100%;
          width: 3.466667vw;
          height: 3.466667vw;
          vertical-align: top;
          margin-right: 0.8vw;
        }
      }
    }
    .foods-wrapper {
      overflow: hidden;
      background-color: #fff;
      height: calc(100% - 12.8vw);
      width: 79.466667vw;
      padding-bottom: 10.666667vw;
      .food-list-hook {
        .category-title {
          margin-left: 2.666667vw;
          padding: 2vw 8vw 2vw 0;
          display: flex;
          align-items: center;
          overflow: hidden;
          strong {
            margin-right: 1.333333vw;
            font-weight: 700;
            font-size: 0.8rem;
            color: #333;
            flex: none;
          }
          span {
            flex: 1;
            color: #999;
            font-size: 0.6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .food-detail {
          display: flex;
          min-height: 30.666667vw;
          padding: 2.666667vw 0 2.666667vw 2.666667vw;
          margin-bottom: 0.133333vw;
          img {
            width: 25.333333vw;
            height: 25.333333vw;
            flex: none;
            margin-right: 2.666667vw;
            border-radius: 0.533333vw;
          }
          .food-detail-info {
            flex: 1;
            padding-bottom: 6.666667vw;
            padding-right: 4vw;
            h4 {
              padding-right: 4vw;
              font-weight: 700;
              overflow: hidden;
              font-size: 1rem;
              white-space: nowrap;
              width: 40vw;
              text-overflow: ellipsis;
              color: #333;
            }
            .food-detail-desc {
              margin: 1.333333vw 0;
              font-size: 0.6rem;
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 42.666667vw;
            }
            .food-detail-sales {
              margin: 1.733333vw 0 !important;
              color: #999;
              font-size: 0.6rem;
              line-height: 1;
              min-height: 1em;
            }
            .food-detail-price {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 3.733333vw;
              .price {
                font-size: 1rem;
                line-height: 4.266667vw;
                color: #ff5339;
                padding-bottom: 0.933333vw;
                display: flex;
                align-items: baseline;
              }
            }
          }
        }
      }
    }
    .current {
      background-color: #fff !important;
      color: #333 !important;
    }
  }
}
</style>

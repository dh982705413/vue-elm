<template>
  <div class="shop-cart">
    <div class="mark" v-show="isShow" @click.self="isShow = false">
      <div class="info-wrapper">
        <div class="info-nav">
          <span>已选商品</span>
          <span class="clear" @click.stop="clearFoods">
            <i class="fa fa-trash-o"></i>
            清空
          </span>
        </div>
        <div v-show="selectFoods.length === 0" class="tips">购物车空空如也</div>
        <ul class="info-content">
          <li v-for="(item, index) in selectFoods" :key="index">
            <span>{{ item.name }}</span>
            <span class="price"
              >￥{{ (item.activity.fixed_price * item.count).toFixed(1) }}</span
            >
            <cart-controll :food="item"></cart-controll>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottomNav-cartfooter" :class="{ nodata: isEmpty }">
      <span class="bottomNav-carticon" @click="isShow = true">
        <i class="fa fa-cart-plus"></i>
      </span>
      <div class="bottomNav-cartInfo" @click="isShow = true">
        <p class="bottomNav-cartTotal">
          <span v-if="isEmpty" style="color:#aaa">未选购商品</span>
          <span v-else>￥{{ totalPrice.toFixed(1) }}</span>
        </p>
        <p class="bottomNav-cartdevlivery">
          另需配送费{{ shopInfo.rst.float_delivery_fee }}
        </p>
      </div>
      <button>
        <span v-if="isEmpty"
          >￥{{ shopInfo.rst.float_minimum_order_amount }}元起送</span
        >
        <span v-else @click="settlement">去结算</span>
      </button>
      <div class="count-tip" v-if="totalCount">{{ totalCount }}</div>
    </div>
  </div>
</template>

<script>
import CartControll from '@/components/Shops/CartControll'
export default {
  name: 'shop-cart',
  props: {
    shopInfo: Object
  },
  components: {
    CartControll
  },
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      selectFoods: [],
      isShow: false
    }
  },
  created() {
    console.log(this.shopInfo)
  },
  computed: {
    isEmpty() {
      let empty = true
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalCount = 0
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalPrice = 0
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.selectFoods = []
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          if (item.count) {
            empty = false
            this.totalCount += item.count
            this.totalPrice += item.count * item.activity.fixed_price
            this.selectFoods.push(item)
          }
        })
      })
      this.shopInfo.menu.forEach(menu => {
        menu.foods.forEach(item => {
          if (item.count) {
            empty = false
            this.totalCount += item.count
            this.totalPrice += item.count * item.activity.fixed_price
            this.selectFoods.push(item)
          }
        })
      })
      return empty
    }
  },
  methods: {
    clearFoods() {
      this.isShow = false
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          if (item.count) {
            item.count = 0
          }
        })
      })
      this.shopInfo.menu.forEach(menu => {
        menu.foods.forEach(item => {
          if (item.count) {
            item.count = 0
          }
        })
      })
    },
    settlement() {
      this.$store.dispatch('setOrderInfo', {
        shopInfo: this.shopInfo.rst,
        selectFoods: this.selectFoods
      })
      this.$router.push('/settlement')
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  .bottomNav-cartfooter {
    position: fixed;
    display: flex;
    right: 0;
    bottom: 0;
    height: 14.8vw;
    width: 100%;
    background-color: rgba(61, 61, 63, 0.9);
    align-items: center;
    padding-left: 21vw;
    justify-content: space-between;
    z-index: 99;
    .bottomNav-carticon {
      position: absolute;
      left: 30px;
      top: -30%;
      padding: 10px;
      font-size: 30px;
      background-color: #3190e8;
      color: #fff;
      border-radius: 50%;
      border: 4px solid #333;
    }
    .bottomNav-cartInfo {
      margin-left: 30px;
      .bottomNav-cartTotal {
        margin-bottom: 5px;
        color: #fff;
      }
      .bottomNav-cartdevlivery {
        color: #aaa;
      }
    }
    button {
      border: none;
      outline: none;
      height: 100%;
      width: 110px;
      background-color: #38ca73;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
    .count-tip {
      position: absolute;
      background-color: red;
      color: #fff;
      padding: 4px 6px;
      border-radius: 50%;
      top: -30%;
      left: 70px;
    }
  }
  .nodata {
    .bottomNav-carticon {
      background-color: #999;
    }
    button {
      background-color: rgba(61, 61, 63, 0);
      color: #fff;
    }
  }
  .mark {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(61, 61, 63, 0.5);
    z-index: 70;
    .info-wrapper {
      position: absolute;
      bottom: 50px;
      left: 0;
      width: 100%;
      background-color: #fff;
      .info-nav {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 0.133333vw solid #ddd;
        background-color: #eceff1;
        color: #666;
      }
      .tips {
        padding: 20px;
        text-align: center;
      }
      .info-content {
        margin-bottom: 30px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #eee;
          span:nth-child(1) {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            flex: 1;
            text-align: center;
            color: red;
          }
        }
      }
    }
  }
}
</style>

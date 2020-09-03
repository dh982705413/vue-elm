<template>
  <div class="index-shop">
    <div class="index-shopInfo" @click="$router.push('/shop')">
      <!-- 左侧图片 -->
      <div class="logo-container">
        <img v-lazy="restaurant.image_path" alt="" />
      </div>
      <!-- 右侧内容 -->
      <div class="index-main">
        <div class="index-shopname">
          <i v-if="restaurant.is_premium">品牌</i>
          <span>{{ restaurant.name }}</span>
        </div>
        <div class="index-rateWrap">
          <div class="rateWrap">
            <rating :rating="restaurant.rating"></rating>
            <div>
              <span class="rate">{{ restaurant.rating }}</span>
              <span>月售{{ restaurant.recent_order_num }}单</span>
            </div>
          </div>
          <div v-if="restaurant.delivery_mode" class="delivery">
            <span class="icon-hollow">{{ restaurant.delivery_mode.text }}</span>
          </div>
        </div>
        <div class="index-moneylimit">
          <div>
            <span>￥{{ restaurant.float_minimum_order_amount }}起送</span>
            <span class="separated">|</span>
            <span>配送费￥{{ restaurant.float_delivery_fee }}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{ (restaurant.distance / 1000).toFixed(2) }}km</span>
            <span class="separated">|</span>
            <span>{{ restaurant.order_lead_time }}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
export default {
  name: 'index-shop',
  props: {
    restaurant: Object
  },
  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
.index-shop {
  background-color: #fff;
  padding: 15px;
  height: 100px;
  border-bottom: 0.133333vw solid rgba(0, 0, 0, 0.08);
  .index-shopInfo {
    display: flex;
    width: 100%;
    height: 100%;
    .logo-container {
      width: 18vw;
      height: 18vw;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .index-main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: space-between;
      .index-shopname {
        color: #333;
        font-weight: 700;
        font-size: 0.9rem;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i {
          background: #ffe800;
          padding: 0.266667vw 0.666667vw;
          margin-right: 1.333333vw;
          text-align: center;
          white-space: nowrap;
          font-size: 0.6rem;
        }
      }
      .index-rateWrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rate {
          margin-right: 5px;
        }
        .delivery {
          display: flex;
          align-items: center;
          font-size: 0.6rem;
          margin-left: 1.066667vw;
          .icon-hollow {
            color: #fff;
            background-color: #2395ff;
            padding: 3px;
            box-sizing: border-box;
          }
        }
      }
      .index-moneylimit {
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 0.9rem;
        .separated {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>

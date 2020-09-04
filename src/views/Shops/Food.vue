<template>
  <transition name="move">
    <div class="food" v-if="isShow">
      <div class="food-detail-wrapper">
        <img :src="food.image_path" alt="" />
        <div class="close-btn" @click="$emit('close')">
          <i class="fa fa-close"></i>
        </div>
        <div class="food-info">
          <h1>{{ food.name }}</h1>
          <span>月售{{ food.month_sales }}好评率{{ food.satisfy_rate }}</span>
          <div class="price">
            <span>￥{{ food.activity.fixed_price }}</span>
            <cart-controll :food="food"></cart-controll>
          </div>
          <p class="desc">{{ food.description }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartControll from '@/components/Shops/CartControll'
export default {
  name: 'food',
  props: {
    food: Object,
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CartControll
  }
}
</script>

<style lang="scss" scoped>
.food {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 66;
  .food-detail-wrapper {
    img {
      width: 100%;
    }
    .food-info {
      padding: 0 10px;
      h1 {
        padding: 20px 0;
        font-size: 18px;
        font-weight: 700;
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: content;
        padding: 10px 0;
        span:nth-child(1) {
          color: red;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      color: #fafafa;
    }
  }
}
.move-enter-active {
  animation: move 0.5s;
}
.move-leave-active {
  animation: move 0.5s reverse;
}

@keyframes move {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
</style>

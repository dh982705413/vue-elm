<template>
  <transition name="fade">
    <div class="info" v-show="isShow">
      <div class="mark" @click="$emit('close')"></div>
      <div class="brief-modal">
        <h2>
          <i v-if="rst.is_premium">品牌</i>
          <span>{{ rst.name }}</span>
        </h2>
        <ul>
          <li>
            <h3>{{ rst.rating }}</h3>
            <span>评分</span>
          </li>
          <li>
            <h3>{{ rst.recent_order_num }}</h3>
            <span>月售</span>
          </li>
          <li v-if="rst.delivery_mode" class="delivery">
            <h3>蜂鸟专送</h3>
            <span>约{{ rst.order_lead_time }}分钟</span>
          </li>
          <li>
            <h3>{{ rst.float_delivery_fee }}</h3>
            <span>配送费</span>
          </li>
          <li>
            <h3>{{ (rst.distance / 1000).toFixed(1) }}km</h3>
            <span>距离</span>
          </li>
        </ul>
        <h3 class="promotion">
          <span>公告</span>
        </h3>
        <p class="brief-modal-yx">{{ rst.promotion_info }}</p>
      </div>
      <!-- 叉号 -->
      <div class="brief-modal-close" @click="$emit('close')">
        <img
          src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'info',
  props: {
    rst: Object,
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  .mark {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .brief-modal {
    position: absolute;
    width: 80%;
    top: 40%;
    left: 50%;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    transform: translate(-50%, -50%);
    z-index: 999;
    h2 {
      width: 90%;
      margin: 0 auto;
      display: flex;
      padding: 10px;
      i {
        box-sizing: content-box;
        height: 1rem;
        background: #ffe800;
        padding: 4px;
        margin-right: 1.333333vw;
        text-align: center;
        white-space: nowrap;
        font-size: 0.6rem;
      }
      span {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin: 20px 0;
      .delivery {
        flex: 1.3;
      }
      li {
        flex: 1;
        h3 {
          font-size: 14px;
          font-weight: bold;
        }
        span {
          font-size: 12px;
          color: #aaa;
        }
      }
    }
    .promotion {
      text-align: center;
      color: #aaa;
      &::before {
        content: '一';
        margin-right: 10px;
      }
      &::after {
        content: '一';
        margin-left: 10px;
      }
    }
    .brief-modal-yx {
      margin: 20px 0;
      color: #333;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
  .brief-modal-close {
    position: absolute;
    left: 50%;
    bottom: 30%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 999;
    img {
      width: 80%;
    }
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>

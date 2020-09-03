<template>
  <div class="rst-active">
    <div class="activity-txt">
      <span
        :style="{ background: '#' + activities[0].icon_color }"
        class="tips"
        >{{ activities[0].icon_name }}</span
      >
      <span>{{ activities[0].description }}</span>
    </div>
    <div class="activity-count">
      <span @click="$emit('show')">{{ activities.length }}个优惠</span>
      <i class="fa fa-caret-down"></i>
    </div>
    <div class="wrap" v-show="isShow">
      <div class="mark" @click="$emit('close')"></div>
      <transition name="slide">
        <div class="act-modal" v-show="isShow">
          <h1>优惠活动</h1>
          <i class="fa fa-close" @click="$emit('close')"></i>
          <ul class="preferential">
            <li v-for="(item, index) in activities" :key="index">
              <span
                :style="{ background: '#' + item.icon_color }"
                class="tips"
                >{{ item.icon_name }}</span
              >
              <span class="desc">{{ item.description }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'active',
  props: {
    activities: Array,
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.rst-active {
  display: flex;
  justify-content: space-between;
  width: 83%;
  margin: 5px 0;
  .activity-txt {
    .tips {
      color: #fff;
      padding: 2px;
      margin-right: 5px;
    }
  }
  .activity-count {
    color: #999;
  }
  .wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .mark {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .act-modal {
      position: absolute;
      width: 100%;
      height: 45%;
      bottom: 0;
      left: 0;
      background-color: #fff;
      h1 {
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 20px 0;
      }
      i {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        color: #999;
      }
      .preferential {
        width: 100%;
        padding: 0 20px;
        li {
          padding: 10px;
          font-size: 14px;
          .tips {
            padding: 3px;
            margin-right: 5px;
            color: #fff;
          }
        }
      }
    }
  }
}

.slide-enter-active {
  animation: slide 0.5s;
}
.slide-leave-active {
  animation: slide 0.5s reverse;
}
@keyframes slide {
  0% {
    bottom: -45%;
  }
  100% {
    bottom: 0;
  }
}
</style>

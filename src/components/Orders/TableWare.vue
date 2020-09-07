<template>
  <div class="tableware" v-if="isShow">
    <div class="mark" @click="$emit('close')"></div>
    <div class="container">
      <div class="close" @click="$emit('close')">
        <i class="fa fa-close"></i>
      </div>
      <div class="header">餐具份数</div>
      <ul class="content">
        <li
          v-for="(item, index) in tablewareList"
          :key="index"
          @click="$emit('check', item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableware',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tablewareList: ['1', '2', '3', '4', '5', '6']
    }
  }
}
</script>

<style lang="scss" scoped>
.tableware {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  z-index: 9999;
  .mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  .container {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: auto;
    .close {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 1.3em;
    }
    .header {
      padding: 10px;
      &::after {
        content: '一';
        margin-left: 10px;
      }
      &::before {
        content: '一';
        margin-right: 10px;
      }
    }
    .content {
      width: 100%;
      li {
        padding: 15px;
      }
      .ischeck {
        color: #4d90fe;
      }
    }
  }
}
</style>

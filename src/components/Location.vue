<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des" @click="$emit('click')">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address ? address : '正在获取' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'location',
  props: {
    address: String
  }
}
</script>

<style lang="scss" scoped>
.location {
  width: 100%;
  .title {
    margin: 10px 0;
    font-size: 12px;
  }
  .des {
    display: flex;
    i {
      color: #009eef;
    }
    span {
      flex: 1;
      font-size: 14px;
      color: #333;
      margin-left: 5px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

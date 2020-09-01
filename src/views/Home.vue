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
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters(['address', 'city'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.home {
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
    .shop_search {
      margin-top: 15px;
      background-color: #fff;
      text-align: center;
      border-radius: 4px;
      padding: 10px 0;
      color: #aaa;
    }
  }
}
</style>

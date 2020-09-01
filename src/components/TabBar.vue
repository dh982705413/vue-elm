<template>
  <div class="tabbar">
    <router-link
      class="tab-item"
      v-for="item in data"
      :key="item.title"
      :to="item.path"
      active-class="is-selected"
    >
      <div class="tab-item-icon">
        <i :class="'fa fa-' + item.icon"></i>
      </div>
      <div class="tab-item-label">{{ item.title }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
@import '../assets/scss/_var';
.tabbar {
  @include flex(space-around, center);
  position: fixed;
  width: 100%;
  height: 45px;
  bottom: 0;
  z-index: 999;
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: map-get($map: $Tabbar, $key: 'bgcolor');
  .tab-item {
    height: 100%;
    @include flex(space-evenly, center, column);
    color: map-get($map: $Tabbar, $key: 'itemcolor');
    flex: 1;
  }
  .is-selected {
    color: map-get($map: $Tabbar, $key: 'active');
  }
}
</style>

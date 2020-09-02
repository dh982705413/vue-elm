<template>
  <div class="elm-header">
    <!-- 左侧返回 -->
    <div class="header-button is-left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click="$emit('go')">返回</button>
    </div>
    <!-- 中间标题 -->
    <div class="header-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'elm-header',
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
@import '../assets/scss/_var';
.elm-header {
  position: relative;
  @include flex(space-between, center);
  padding: 15px;
  background-color: $themeColor;
  color: $baseColor;
  .header-button {
    position: absolute;
    left: 10px;
    button {
      @include inputInit();
      color: $baseColor;
      background-color: $themeColor;
    }
  }
  .header-title {
    flex: 1;
    text-align: center;
    font-size: 16px;
  }
}
</style>

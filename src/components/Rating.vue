<template>
  <div class="Rating-gray">
    <i
      v-for="(item, index) in itemClasses"
      :key="index"
      class="fa"
      :class="item"
    ></i>
  </div>
</template>

<script>
// ? 星星长度
const LENGTH = 5
// ? 星星对应的class
const CLS_ON = 'fa-star'
const CLS_HALF = 'fa-star-half-empty'
const CLS_OFF = 'fa-star-o'
export default {
  name: 'rating',
  props: {
    rating: Number
  },
  computed: {
    itemClasses() {
      const result = []

      const score = Math.floor(this.rating * 2) / 2
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.Rating-gray {
  margin-right: 1vw;
  color: #ffbe00;
  display: inline-block;
}
</style>

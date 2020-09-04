<template>
  <div class="cart-controll">
    <span
      class="cartbutton button-minus"
      v-if="food.count > 0"
      @click.stop="decreaseCount"
    >
      <i class="fa fa-minus"></i>
    </span>
    <span v-show="food.count > 0" class="count">{{ food.count }}</span>
    <span class="cartbutton button-plus" @click.stop="increaseCount">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'cart-controll',
  props: {
    food: Object
  },
  methods: {
    decreaseCount() {
      this.food.count--
    },
    increaseCount() {
      this.food.count++
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-controll {
  display: flex;
  align-items: center;
  .cartbutton {
    color: #4d90fe;
    font-size: 20px;
  }
  .button-minus {
    margin-right: 5px;
  }
  .button-plus {
    margin-left: 5px;
  }
  .count {
    color: #333;
  }
}
</style>

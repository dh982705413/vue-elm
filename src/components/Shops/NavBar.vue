<template>
  <div class="navbar">
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="currentTabComponent = tab.component"
        :class="{ 'is-active': currentTabComponent === tab.component }"
      >
        {{ tab.name }}
      </button>
    </div>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import Goods from '@/components/Shops/Goods'
import Comments from '@/components/Shops/Comments'
import Seller from '@/components/Shops/Seller'
export default {
  name: 'navbar',
  components: {
    Goods,
    Comments,
    Seller
  },
  data() {
    return {
      currentTab: '点播',
      tabs: [
        { name: '点播', component: 'Goods' },
        { name: '评论', component: 'Comments' },
        { name: '商家', component: 'Seller' }
      ],
      currentTabComponent: 'Goods'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  .tabs {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding-bottom: 1px;
    button {
      border: none;
      outline: none;
      background-color: #fff;
      height: 100%;
      padding: 10px 0;
    }
    .is-active {
      border-bottom: 2px solid #4d90fe;
    }
  }
}
</style>

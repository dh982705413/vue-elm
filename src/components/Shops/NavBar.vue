<template>
  <div class="navbar" :class="{ 'is-fixed': isFixed }">
    <div class="tabs">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.path"
        tag="button"
        :class="{ 'is-active': $route.path === tab.path }"
      >
        {{ tab.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      currentTab: '点播',
      tabs: [
        { name: '点播', path: '/goods' },
        { name: '评论', path: '/comments' },
        { name: '商家', path: '/seller' }
      ],
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.isFixed = scrollTop > 254
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight)
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
.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
}
</style>

<template>
  <div class="alphabet" v-if="cityInfo" ref="wrapper">
    <div class="scorll-wrap">
      <!-- 热门城市 -->
      <div class="hot-wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot-city">
          <li
            @click="$emit('selectecity', item)"
            v-for="(item, index) in cityInfo['hotCities']"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city-wrap">
        <div
          class="city-content citylist"
          v-for="(item, index) in keys"
          :key="index"
        >
          <div class="title">{{ item }}</div>
          <ul>
            <li
              @click="$emit('selectecity', city)"
              v-for="(city, cityIndex) in cityInfo[item]"
              :key="cityIndex"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="area-keys">
      <li @click="selectKey(0)">#</li>
      <li
        @click="selectKey(index + 1)"
        v-for="(item, index) in keys"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'alphabet',
  props: {
    cityInfo: Object,
    keys: Array
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    },
    selectKey(key) {
      const citylist = this.$refs.wrapper.getElementsByClassName('citylist')
      const el = citylist[key]
      this.scroll.scrollToElement(el, 250)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.alphabet {
  position: relative;
  height: 100%;
  .scorll-wrap {
    background-color: #fff;
    padding: 10px 20px;
    .hot-wrap {
      .title {
        font-size: 16px;
        color: #aaa;
      }
      .hot-city {
        @include flex(space-around, flex-start, row);
        flex-wrap: wrap;
        width: 240px;
        margin: 10px;
        li {
          text-align: center;
          width: 100px;
          padding: 10px;
          background-color: #eee;
          margin: 8px 0;
        }
      }
    }
    .city-wrap {
      .city-content {
        .title {
          font-size: 16px;
          color: #aaa;
          margin: 20px 0;
          padding-top: 20px;
        }
        li {
          color: #333;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
          margin: 0 10px;
        }
      }
    }
  }
  .area-keys {
    position: fixed;
    top: 32%;
    right: 5px;
    @include flex(flex-start, center, column);
    li {
      color: #aaa;
      font-size: 12px;
      line-height: 1.4;
      text-align: center;
      padding: 0 5px;
    }
  }
}
</style>

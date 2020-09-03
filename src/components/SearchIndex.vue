<template>
  <div class="search-index">
    <ul>
      <li
        class="restaurants"
        v-for="(item, index) in result.restaurants"
        :key="index"
        @click="$emit('goshop')"
      >
        <img :src="item.image_path" alt="" />
        <div class="info">
          <span>{{ item.name }}</span>
          <span class="rating">评分{{ item.rating }}</span>
        </div>
      </li>
    </ul>
    <ul>
      <li
        class="words"
        v-for="(item, index) in result.words"
        :key="index"
        @click="$emit('click')"
      >
        <i class="fa fa-search"></i>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search-index',
  props: {
    result: Object
  }
}
</script>

<style lang="scss" scoped>
.search-index {
  background-color: #fff;
  width: 100%;
  .restaurants {
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      border-radius: 50%;
    }
    .info {
      width: 100%;
      line-height: 14vw;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e3e3e3;
      .rating {
        font-size: 0.8rem;
        color: #aaa;
      }
    }
  }
  .words {
    display: flex;
    align-items: center;
    line-height: 14vw;
    i {
      margin-right: 20px;
      margin-left: 10px;
      font-size: 1.2rem;
    }
    span {
      width: 100%;
      border-bottom: 1px solid #e3e3e3;
      color: #333;
    }
  }
}
</style>

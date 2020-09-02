<template>
  <div class="search">
    <elm-header
      title="搜索"
      :isLeft="true"
      @go="$router.push('/home')"
    ></elm-header>
    <div class="search-wrap">
      <div class="input-wrap">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="输入商家,商品名称" v-model="keyword" />
      </div>
      <button>搜索</button>
    </div>
    <div class="search-container">
      <ul>
        <li
          class="restaurants"
          v-for="(item, index) in result.restaurants"
          :key="index"
        >
          <img :src="item.image_path" alt="" />
          <div class="info">
            <span>{{ item.name }}</span>
            <span>评分{{ item.rating }}</span>
          </div>
        </li>
      </ul>
      <ul>
        <li class="words" v-for="(item, index) in result.words" :key="index">
          <i class="fa fa-search"></i>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
export default {
  name: 'search',
  components: {
    ElmHeader
  },
  data() {
    return {
      keyword: '',
      result: {
        restaurants: [],
        words: []
      }
    }
  },
  watch: {
    keyword() {
      this.keyWordChange()
    }
  },
  methods: {
    async keyWordChange() {
      const res = await this.$http.get(`/profile/typeahead/${this.keyword}`)
      this.result = res
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  .search-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 15px;
    .input-wrap {
      width: 80%;
      padding: 6px;
      background-color: #eee;
      border-radius: 12px;
      input {
        background-color: #eee;
        height: 100%;
        line-height: 71px;
        border: none;
        outline: none;
        padding-left: 5px;
      }
    }
    button {
      border: none;
      outline: none;
      background-color: #fff;
      font-size: 16px;
      color: #4d90fe;
    }
  }
  .search-container {
    background-color: #fff;
    width: 100%;
    .restaurants {
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 5px;
      }
      .info {
        width: 100%;
        line-height: 14vw;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e3e3e3;
      }
    }
    .words {
      display: flex;
      align-items: center;
      line-height: 14vw;
      i {
        margin-right: 20px;
        margin-left: 30px;
        font-size: 1.2rem;
      }
      span {
        width: 100%;
        border-bottom: 1px solid #e3e3e3;
      }
    }
  }
}
</style>

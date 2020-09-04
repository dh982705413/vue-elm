<template>
  <div class="comments" v-if="evaluation">
    <!-- 商家评分 -->
    <section class="rating-wrap">
      <div class="rating-info">
        <h4>{{ evaluation.rating.shop_score.toFixed(1) }}</h4>
        <div class="shop-score">
          <span>商家评分</span>
          <rating :rating="evaluation.rating.shop_score"></rating>
        </div>
        <div class="other-score">
          <div class="tp-score">
            <div>
              <span>味道</span>
              <p>{{ evaluation.rating.taste_score.toFixed(1) }}</p>
            </div>
            <div>
              <span>包装</span>
              <p>{{ evaluation.rating.package_score.toFixed(1) }}</p>
            </div>
            <div>
              <span>标签</span>
              <p>{{ evaluation.rating.rider_score.toFixed(1) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 评论区 -->
    <div class="shop-info">
      <!-- 标签 -->
      <ul class="tags">
        <li
          v-for="(item, index) in evaluation.tags"
          :key="index"
          :class="{ unsatisfied: item.unsatisfied }"
        >
          {{ item.name }}
          <span v-if="item.count > 0">{{ item.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating'
export default {
  name: 'comments',
  components: {
    Rating
  },
  created() {
    this.getData()
  },
  data() {
    return {
      evaluation: null
    }
  },
  methods: {
    async getData() {
      const res = await this.$http.get('/profile/comments')
      this.evaluation = res
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  width: 100%;
  .rating-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    height: 93px;
    .rating-info {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-size: 24px;
        color: red;
        margin-left: 20px;
      }
      .shop-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px;
        .tp {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            margin-bottom: 5px;
          }
        }
      }
      .other-score {
        flex: 1;
        text-align: center;
        height: 33px;
        .tp-score {
          display: flex;
          justify-content: space-between;
          height: 100%;
          span {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .shop-info {
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
    .tags {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 5px;

      li {
        color: #6d7885;
        background-color: #ebf5ff;
        display: inline-block;
        padding: 0 2.4vw;
        height: 7.466667vw;
        line-height: 7.466667vw;
        margin: 0.933333vw;
        font-size: 0.7rem;
        border-radius: 0.533333vw;
        span {
          margin-left: 2px;
        }
      }
      .unsatisfied {
        color: #aaa !important;
        background-color: #f5f5f5 !important;
      }
    }
  }
}
</style>

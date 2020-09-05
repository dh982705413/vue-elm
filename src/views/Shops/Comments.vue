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
      <!-- 内容 -->
      <ul class="comments-wrap">
        <li v-for="(item, index) in evaluation.comments" :key="index">
          <div class="comment-user">
            <div class="comment-info">
              <img
                :src="
                  item.avatar ||
                    ' https://fuss10.elemecdn.com/2/e1/71fce8fcf471aa29bbdf9748a5bfajpeg.jpeg'
                "
                alt=""
              />
              <div class="comment-name">
                <h4>{{ item.username }}</h4>
                <rating :rating="item.rating"></rating>
                <span :style="{ color: ratingcontent(item.rating).color }">{{
                  ratingcontent(item.rating).txt
                }}</span>
              </div>
              <small>{{ item.rated_at }}</small>
            </div>
          </div>
          <div class="comment-text">{{ item.comment_text }}</div>
          <div class="comment-reply">{{ item.reply.content }}</div>
          <ul class="comment-imgs">
            <li v-for="(img, i) in item.order_images" :key="i">
              <img :src="img.image_hash" alt="" />
            </li>
          </ul>
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
    },
    ratingcontent(rating) {
      const content = [
        { txt: '吐槽', color: 'rgb(137,159,188)' },
        { txt: '较差', color: 'rgb(137, 159, 188)' },
        { txt: '一般', color: 'rgb(251, 154, 11)' },
        { txt: '满意', color: 'rgb(251, 154, 11)' },
        { txt: '超赞', color: 'rgb(255, 96, 0)' }
      ]
      return content[rating - 1]
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
      border-bottom: 1px solid #eee;
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
    .comments-wrap {
      width: 100%;
      li {
        padding: 20px 10px;
        border-bottom: 1px solid #eee;
        .comment-user {
          width: 100%;
        }
        .comment-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .comment-name {
            flex: 1;
          }
        }
        .comment-text {
          color: #333;
          word-break: break-word;
          margin: 2.133333vw 0;
        }
        .comment-reply {
          margin: 2.666667vw 0;
          padding: 2.666667vw;
          border-radius: 1.066667vw;
          background: #f3f3f3;
          position: relative;
          font-size: 0.8rem;
          &::after {
            position: absolute;
            content: ' ';
            top: -30px;
            left: 60px;
            border: 15px solid #f3f3f3;
            border-color: transparent transparent #f3f3f3 transparent;
          }
        }
        .comment-imgs {
          li {
            border: none;
            img {
              width: 40vw;
              height: 40vw;
            }
          }
        }
      }
    }
  }
}
</style>

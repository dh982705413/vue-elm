<template>
  <div class="shop" v-if="shopInfo">
    <!-- 头部 -->
    <nav class="header-nav">
      <div class="nav-bg">
        <img v-lazy="shopInfo.rst.scheme" alt="" />
      </div>
      <div class="nav-back" @click="$router.go(-1)">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="shop_image">
        <img v-lazy="shopInfo.rst.image_path" alt="" />
      </div>
    </nav>
    <!-- 商家信息 -->
    <div class="index-rst">
      <div class="rst-name" @click="showModal = true">
        <span>{{ shopInfo.rst.name }}</span>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 弹窗信息 -->
      <info-modal
        :rst="shopInfo.rst"
        :isShow="showModal"
        @close="showModal = false"
      ></info-modal>
      <!-- 评分月售 -->
      <div class="rst-order">
        <span>评分{{ shopInfo.rst.rating }}</span>
        <span>月售{{ shopInfo.rst.recent_order_num }}</span>
        <span>蜂鸟专送约{{ shopInfo.rst.order_lead_time }}分钟</span>
      </div>
      <!-- 优惠信息 -->
      <activity
        :activities="shopInfo.rst.activities"
        @close="showPreModal = false"
        @show="showPreModal = true"
        :isShow="showPreModal"
      ></activity>
      <!-- 公告 -->
      <p class="rst-promotion">公告: {{ shopInfo.rst.promotion_info }}</p>
    </div>
    <!-- navBar -->
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import Activity from '@/components/Shops/Activity'
import InfoModal from '@/components/Shops/InfoModal'
import NavBar from '@/components/Shops/NavBar'
export default {
  name: 'shop',
  components: {
    InfoModal,
    Activity,
    NavBar
  },
  data() {
    return {
      shopInfo: null,
      showModal: false,
      showPreModal: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$http.get('/profile/batch_shop')
      this.shopInfo = res
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  .header-nav {
    .nav-bg {
      img {
        width: 100%;
        height: 26.666667vw;
      }
    }
    .nav-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 26.666667vw;
      background: rgba(0, 0, 0, 0.5);
      i {
        color: #fff;
        font-size: 1.3rem;
        margin-left: 1.333333vw;
        margin-top: 1.333333vw;
      }
    }
    .shop_image {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -10vw;
      margin-top: 11vw;
      img {
        width: 20vw;
        height: 20vw;
        border-radius: 0.8vw;
      }
    }
  }
  .index-rst {
    padding: 8vw 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
    .rst-name {
      flex: 1;
      width: 72vw;
      font-size: 1.3rem;
      font-weight: 700;
      white-space: nowrap;
      padding-right: 2.666667vw;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1.6vw 0;
      span {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .rst-order {
      margin: 10px 0;
      span {
        margin-right: 5px;
        color: #999;
      }
    }
    .rst-promotion {
      font-size: 0.9rem;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 10px 0;
    }
  }
}
</style>

<template>
  <div class="settlement">
    <elm-header
      :isLeft="true"
      title="确认订单"
      @go="$router.go(-1)"
    ></elm-header>
    <div class="view-body">
      <div class="main">
        <!-- 收货地址 -->
        <section class="cart-address">
          <p class="title">
            订单配送至
            <span class="address-tag" v-if="userInfo && userInfo.tag">{{
              userInfo.tag
            }}</span>
          </p>
          <p class="address-detail">
            <span v-if="userInfo" @click="$router.push('/myAddress')"
              >{{ userInfo.address }}{{ userInfo.bottom }}</span
            >
            <span v-else>
              <span @click="addAddress" v-if="!haveAddress">新增收货地址</span>
              <span @click="selectAddress" v-else>选择收货地址</span>
            </span>
            <i class="fa fa-angle-right"></i>
          </p>
          <h2 v-if="userInfo" class="address-name">
            <span>{{ userInfo.name }}</span>
            <span v-if="userInfo.sex">（{{ userInfo.sex }})</span>
            <span class="phone">{{ userInfo.phone | phone }}</span>
          </h2>
        </section>
        <!--收货地址 end -->
        <!-- 送达时间 -->
        <delivery :shopInfo="orderInfo.shopInfo"></delivery>
        <!-- 送达时间  end-->
        <!-- 点餐内容 -->
        <cart-group
          :orderInfo="orderInfo"
          :totalPrice="totalPrice"
        ></cart-group>
        <!-- 点餐内容 end-->
        <!-- 备注信息 -->
        <section class="checkout-section">
          <cart-item
            title="餐具份数"
            :subTitle="Tableware"
            @click="showTableware = true"
          ></cart-item>
          <cart-item title="订单备注" subTitle="口味 偏好"></cart-item>
          <cart-item title="发票信息" subTitle="不需要开发票"></cart-item>
        </section>
        <!-- 餐具 -->
        <table-ware
          :isShow="showTableware"
          @close="showTableware = false"
          @check="checkTableware"
        ></table-ware>
        <!-- 餐具 end-->
      </div>
    </div>
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
import Delivery from '@/components/Orders/Delivery'
import CartGroup from '@/components/Orders/CartGroup'
import CartItem from '@/components/Orders/CartItem'
import TableWare from '@/components/Orders/TableWare'
import { mapGetters } from 'vuex'
export default {
  name: 'Settlement',
  components: {
    ElmHeader,
    Delivery,
    CartGroup,
    CartItem,
    TableWare
  },
  data() {
    return {
      haveAddress: false,
      showTableware: false,
      Tableware: '未选择'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'orderInfo', 'totalPrice'])
  },
  created() {
    this.getData()
  },
  filters: {
    phone(val) {
      const reg = /^(\d{3})\d{4}(\d)$/
      return val.replace(reg, '$1****$2')
    }
  },
  methods: {
    addAddress() {
      console.log(1)
      this.$router.push('/addAddress')
    },
    selectAddress() {
      this.$router.push('/myAddress')
    },
    async getData() {
      const res = await this.$http.get(
        `/user/user_info/${localStorage.ele_login}`
      )
      if (res.myAddress.length > 0) {
        this.haveAddress = true
      } else {
        this.haveAddress = false
      }
    },
    checkTableware(item) {
      this.TableCheck = item
      this.Tableware = item + '份'
      this.showTableware = false
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  height: 100%;
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: #333;
  padding-bottom: 14.133333vw;
  padding-left: 1.6vw;
  padding-right: 1.6vw;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.cart-address {
  background-color: transparent;
  padding: 4.266667vw 2.133333vw 2.933333vw 2.133333vw;
  min-height: 22.133333vw;
  color: #fff;
  overflow: hidden;
}
.cart-address .title {
  font-size: 0.9rem;
  line-height: 1.21;
  color: hsla(0, 0%, 100%, 0.8);
}
.cart-address .address-detail {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.88;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.address-detail > span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 4vw);
}
.address-detail > i {
  margin-left: 2.133333vw;
}

/* 显示送货地址 */
.address-name {
  font-size: 0.86rem;
  line-height: 1.21;
  margin-bottom: 1.333333vw;
}
.address-name .phone {
  margin-left: 2.133333vw;
}
.address-tag {
  border: 0.133334vw solid hsla(0, 0%, 100%, 0.8);
  margin-left: 1.6vw;
  display: inline-block;
  padding: 0.533333vw;
  white-space: nowrap;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}

.checkout-section {
  margin-bottom: 2.133333vw;
  padding: 0 5.333333vw;
  background: #fff;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}

/* 底部支付样式 */
.action-bar {
  height: 11.733333vw;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #3c3c3c;
  z-index: 2;
}
.action-bar > span {
  color: #fff;
  font-size: 1.2rem;
  line-height: 11.733333vw;
  padding-left: 2.666667vw;
  vertical-align: middle;
}
.action-bar > button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: #00e067;
  min-width: 28vw;
  padding: 0 1.333333vw;
  border: none;
  color: #fff;
  font-size: 1.2rem;
}
</style>

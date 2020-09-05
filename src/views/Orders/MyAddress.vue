<template>
  <div class="my-address">
    <elm-header
      :isLeft="true"
      title="我的地址"
      @go="$router.go(-1)"
    ></elm-header>
    <!-- 地址列表 -->
    <ul class="address-list-wrap">
      <li class="address-wrap" v-for="(item, index) in address" :key="index">
        <div class="info">
          <div class="addaress-card-body">
            <span class="username">{{ item.name }}</span>
            <span v-if="item.sex" class="gender">{{ item.sex }}</span>
            <span class="phone">{{ item.phone }}</span>
          </div>
          <div class="address">
            <span class="tag" v-if="item.tag">{{ item.tag }}</span>
            <p class="address-text">{{ item.address.substr(0, 16) }}</p>
          </div>
        </div>
        <div class="address-edit">
          <i class="fa fa-edit" @click="handleEdit(item)"></i>
          <i class="fa fa-close" @click="handleDelete(item)"></i>
        </div>
      </li>
    </ul>
    <!-- 地址列表 end -->
    <div class="addressview-bottom" @click="$router.push('/addAddress')">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
import { Toast, MessageBox } from 'mint-ui'

export default {
  name: 'my-address',
  components: {
    ElmHeader
  },
  data() {
    return {
      address: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$http.get(
        `/user/user_info/${localStorage.ele_login}`
      )
      this.address = res.myAddress
    },
    handleEdit(address) {
      this.$router.push({
        name: 'addAddress',
        params: { address, edit: true }
      })
    },
    async handleDelete(address) {
      const res = await MessageBox.confirm('确定删除此地址?')
      if (res === 'confirm') {
        await this.$http.delete(
          `/user/address/${localStorage.ele_login}/${address._id}`
        )
        Toast({
          message: '删除成功',
          position: 'bottom',
          duration: 1000
        })
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-address {
  width: 100%;
  height: 100%;
  padding-bottom: 45px;
  .addressview-bottom {
    position: fixed;
    height: 13.866667vw;
    bottom: 0;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.266667vw solid #ddd;
    color: #3190e8;
    font-size: 1rem;
    i {
      font-size: 1.3rem;
      margin-right: 8px;
    }
  }
  .address-list-wrap {
    width: 100%;
    .address-wrap {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #fff;
      padding: 20px;
      border-bottom: 1px solid #eee;
      .info {
        flex: 1;
        .addaress-card-body {
          margin-bottom: 10px;
          span {
            margin-right: 5px;
          }
          .username {
            font-size: 1.3rem;
            font-weight: 700;
          }
        }
        .address {
          display: flex;
          align-items: center;
          .tag {
            border: 1px solid red;
            color: red;
            margin-right: 10px;
            padding: 2px;
          }
          .address-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .address-edit {
        i {
          margin-right: 5px;
          font-size: 1rem;
          color: #aaa;
        }
      }
    }
  }
}
</style>

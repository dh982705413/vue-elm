<template>
  <div class="addAddress">
    <elm-header
      :isLeft="true"
      title="添加地址"
      @go="$router.go(-1)"
    ></elm-header>
    <!-- 添加地址 -->
    <div class="viewbody">
      <div class="container">
        <form-block
          label="联系人"
          placeholder="姓名"
          :tags="sex"
          @checktag="checkSex"
          v-model="addresInfo.name"
        ></form-block>
        <form-block
          label="电话"
          placeholder="手机号码"
          v-model="addresInfo.phone"
        ></form-block>
        <form-block
          label="地址"
          placeholder="小区/写字楼/学习等"
          icon="angle-right"
          @click="showSearch = true"
          v-model="addresInfo.address"
        ></form-block>
        <form-block
          label="门牌号"
          placeholder="北苑5栋/420"
          textarea="textarea"
          icon="edit"
          v-model="addresInfo.bottom"
        ></form-block>
        <div class="formblock">
          <div class="label-wrap">
            标签
          </div>
          <tab-tag
            :tags="tags"
            @checktag="checkTag"
            :selectTag="addresInfo.tag"
          ></tab-tag>
        </div>
        <!-- 确认按钮 -->
        <div class="form-button-wrap">
          <button class="form-button" @click="handleSave">确定</button>
        </div>
        <!-- 确认按钮 end -->
      </div>
    </div>
    <!-- 添加地址 end -->
    <!-- 搜索地址 -->
    <address-search
      :isShow="showSearch"
      @close="showSearch = false"
      @click="selectAddress"
    ></address-search>
    <!-- 搜索地址 end -->
  </div>
</template>

<script>
import ElmHeader from '@/components/ElmHeader'
import FormBlock from '@/components/Orders/FormBlock'
import TabTag from '@/components/Orders/TabTag'
import AddressSearch from '@/components/Orders/AddressSearch'
import { Toast } from 'mint-ui'
export default {
  name: 'add-address',
  components: { ElmHeader, FormBlock, TabTag, AddressSearch },
  data() {
    return {
      tags: ['家', '学校', '公司'],
      sex: ['先生', '女士'],
      addresInfo: {
        tag: '',
        sex: '',
        address: '',
        phone: '',
        name: '',
        bottom: ''
      },
      showSearch: false
    }
  },
  created() {
    console.log(this.$route)
    this.addresInfo = this.$route.params.address || {}
  },
  methods: {
    checkTag(tag) {
      this.addresInfo.tag = tag
    },
    checkSex(sex) {
      this.addresInfo.sex = sex
    },
    selectAddress(item) {
      this.addresInfo.address = item.name + item.district + item.address
      this.showSearch = false
    },
    handleSave() {
      if (!this.addresInfo.name) {
        this.showMsg('请输入联系人')
        return
      }
      if (!this.addresInfo.phone) {
        this.showMsg('请输入手机号码')
        return
      }
      if (!this.addresInfo.address) {
        this.showMsg('请输入地址')
        return
      }
      if (this.$route.params.edit) {
        this.editAddress()
      } else {
        this.addAddress()
      }
    },
    showMsg(msg) {
      Toast({
        message: msg,
        position: 'bottom',
        duration: 2000
      })
    },
    async addAddress() {
      try {
        await this.$http.post(
          `/user/add_address/${localStorage.ele_login}`,
          this.addresInfo
        )
        this.showMsg('添加成功')
        this.$router.push('/myAddress')
      } catch {
        this.showMsg('添加失败')
      }
    },
    async editAddress() {
      try {
        await this.$http.post(
          `/user/edit_address/${localStorage.ele_login}/${this.addresInfo._id}`,
          this.addresInfo
        )
        this.showMsg('修改成功')
        this.$router.push('/myAddress')
      } catch {
        this.showMsg('修改失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addAddress {
  width: 100%;
  height: 100%;
  padding-bottom: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
  margin-left: 10px;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  outline: none;
  font-weight: 500;
}
</style>

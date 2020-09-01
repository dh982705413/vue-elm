<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="" />
    </div>
    <!-- 手机号 -->
    <input-group
      type="number"
      :btnTitle="btnTitle"
      :disabled="disabled"
      placeholder="手机号"
      :error="errors.phone"
      v-model="phone"
      @btnclick="getVerifyCode"
    ></input-group>
    <!-- 验证码 -->
    <input-group
      type="text"
      placeholder="验证码"
      v-model="verifyCode"
      :error="errors.verifyCode"
    ></input-group>
    <!-- 用户服务协议 -->
    <div class="login-des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/InputGroup'
export default {
  name: 'login',
  components: {
    InputGroup
  },
  data() {
    return {
      phone: '',
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      disabled: false
    }
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async login() {
      // 取消错误提醒
      this.errors = {}
      // 发送请求
      try {
        const res = await this.$http.post('/posts/sms_back', {
          phone: this.phone,
          code: this.verifyCode
        })
        console.log(res)
        localStorage.setItem('ele_login', true)
        this.$router.push('/')
      } catch (err) {
        this.errors = {
          verifyCode: err.response.data.msg
        }
      }
    },
    async getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn()
        const res = await this.$http.post('/posts/sms_send', {
          sid: '9d813ebcb019bcb0ac501ba5a138da09',
          token: '5c3bd84601b196c529fade447d55c9d7',
          appid: '0bc6136c3d0f4bc68c27de021091595b',
          templateid: '564049',
          phone: this.phone
        })
        console.log(res)
      }
    },
    validatePhone() {
      // ? 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空'
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请填写正确的手机号码'
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    },
    validateBtn() {
      let time = 60
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          this.btnTitle = `${time}后重试`
          this.disabled = true
          time--
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_var';
@import '../assets/scss/mixin';
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  background: map-get($map: $Login, $key: 'BgColor');
  .logo {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 150px;
    }
  }
  .login-des {
    margin-top: 10px;
    p {
      color: map-get($map: $Login, $key: 'DesText');
      line-height: 22px;
    }
    span {
      color: map-get($map: $Login, $key: 'UserKnow');
    }
  }
  .login_btn {
    margin-top: 20px;
    button {
      @include inputInit();
      width: 100%;
      height: 40px;
      background-color: map-get($map: $Login, $key: 'BtnColor');
      border-radius: 4px;
      color: map-get($map: $Login, $key: 'btnText');
      font-size: 14px;
      &[disabled] {
        // background-color: map-get($map: $Login, $key: 'disableBtn');
        background-color: #8bda81;
      }
    }
  }
}
</style>

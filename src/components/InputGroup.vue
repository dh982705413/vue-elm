<template>
  <div class="text-group">
    <!-- 组件结构 -->
    <div class="input_group" :class="{ 'is-invalid': error }">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      />
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnclick')">
        {{ btnTitle }}
      </button>
      <!-- 错误提醒 -->
    </div>
    <div class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'input-group',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
@import '../assets/scss/_var';
.text-group {
  margin-top: 10px;
  .input_group {
    height: 41px;
    @include flex(space-between);
    border: 1px solid map-get($map: $inputGroup, $key: 'inputBorderColor');
    border-radius: 4px;
    padding: 10px;
    input {
      @include inputInit();
      height: 100%;
      width: 60%;
    }
    button {
      @include inputInit();
      background: map-get($map: $inputGroup, $key: 'btnBgColor');
      &[disabled] {
        color: map-get($map: $inputGroup, $key: 'btnDisaleColor');
      }
    }
  }
  .is-invalid {
    border-color: map-get($map: $inputGroup, $key: 'errorBoderColor');
  }
  .invalid-feedback {
    height: 1em;
    color: map-get($map: $inputGroup, $key: 'errorBoderColor');
    padding-top: 5px;
  }
}
</style>

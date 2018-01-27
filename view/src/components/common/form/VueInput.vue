<template>
  <label class="input-container iblock m-t-20 font-14 relative" :style="{width: inputWidth}">
    <input
      ref="input"
      v-model="inputValue"
      @focus="$emit('onFocus', $event)"
      @blur="$emit('onBlur', $event)"
      @keydown.enter="pressEnter($event)"
      type="text"
      :class="{'not-empty': inputValue}"
      class="p-h-10" />
    <div class="hint-text absolute p-h-10">{{inputValue ? label : placeholder}}</div>
  </label>
</template>

<script>
  export default {
    props: {
      label: {type: String, required: true},
      placeholder: {type: String, required: true},
      value: String,
      width: [String, Number],
      type: String,
      fullWidth: Boolean,
      autoFocus: Boolean
    },
    data () {
      return {
        inputValue: ''
      }
    },
    computed: {
      inputWidth () {
        return this.fullWidth ? '100%' : (this.width ? this.width + 'px' : '')
      }
    },
    watch: {
      inputValue () {
        this.$emit('update:value', this.inputValue)
      },
      value () {
        this.inputValue = this.value
      }
    },
    methods: {
      pressEnter (event) {
        this.$emit('onEnter', event)
        this.$refs.input.blur()
        this.inputValue = ''
        this.$emit('update:value', this.inputValue)
      }
    },
    mounted () {
      const {autoFocus} = this

      if (autoFocus) {
        setTimeout(() => {
          this.$refs.input.focus()
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>
  label, label input {
    height: 32px;
  }
  input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #ddd;
    background-color: transparent;

    &:focus, &.not-empty {
      + .hint-text {
        font-size: 12px;
        bottom: 90%;
      }
    }
    &:focus {
      border-bottom-color: #409eff;
      + .hint-text {
        color: #409eff;
      }
    }
  }
  .hint-text {
    line-height: 32px;
    left: 0;
    bottom: 0;
    z-index: -1;
    color: #aaa;
    transition: all .2s linear;
  }
</style>

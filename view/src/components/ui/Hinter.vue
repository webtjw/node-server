<template>
  <div class="hinter-container relative" :class="status">
    <div v-if="status === 'loading'" class="loading-animation absolute font-0 a-c">
      <i class="iblock m-h-4" style="animation-delay: .3s;"></i>
      <i class="iblock m-h-4" style="animation-delay: .2s;"></i>
      <i class="iblock m-h-4" style="animation-delay: .1s;"></i>
      <i class="iblock m-h-4" style="animation-delay: 0s;"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    asyncTask: {type: Function}
  },
  data () {
    return {
      status: 'loading'
    }
  },
  methods: {
    setVerticalMiddle () {
      const {$el} = this
      const top = $el.offsetTop
      const clientHeight = document.documentElement.clientHeight
      $el.style.marginTop = (clientHeight - top) * 0.2 + 'px'
      $el.style.opacity = 1
    },
    async runAsync () {
      const result = await this.asyncTask()
      if (!result.success) {
        if (result.errorType === 'net') this.status = 'NoNet'
        else this.status = 'NoData'
      } else if (Array.isArray(result) && result.length === 0) this.status = 'NoData'
      else this.status = ''
      this.$emit('asyncReturn', result)
    }
  },
  mounted () {
    this.setVerticalMiddle()
    this.runAsync()
  }
}
</script>

<style lang="scss" scoped>
  .hinter-container {
    opacity: 0;
    width: 100%;
    min-height: 180px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 180px;
    &.loading {
      .loading-animation {
        left: 50%; top: 50%; transform: translate(-50%);
        i { width: 14px; height: 14px; border-radius: 50%/50%; background: #666; opacity: 0; animation: hinterLoading 3s cubic-bezier(0.68, 0.57, 0.55, 0.83) infinite;}
      }
    }
    &.NoData { background-image: url(../../assets/images/hint_no_data.jpg)};
    &.NoNet { background-image: url(../../assets/images/hint_no_network.jpg)};
  }
  @keyframes hinterLoading {
    0% { opacity: 0; transform: translateX(-500%) scale(.4);}
    40% { opacity: 1; transform: translateX(0) scale(1);}
    80% { opacity: 0; transform: translateX(500%) scale(.8);}
    100% { opacity: 0; transform: translateX(-500%) scale(.4);}
  }
</style>

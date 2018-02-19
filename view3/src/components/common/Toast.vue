<template>
  <div id="toast-box" class="fixed p-v-18 p-h-20 font-14 c-fff a-c" :style="{display: show ? 'block' : 'none'}">
    {{text}}
  </div>
</template>

<script>
  import Toast from '../../toolkits/Toast'

  export default {
    data () {
      return Toast.data
    }
  }
</script>

<style lang="scss" scoped>
  #toast-box {
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    min-width: 180px;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 8px;
    z-index: 1900;
  }
</style>

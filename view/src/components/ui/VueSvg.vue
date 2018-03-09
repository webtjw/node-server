<template>
  <div class="v-svg">
    <svg :viewBox="icon.viewBox">
      <use :xlink:href="`#${icon.id}`" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {required: true, type: Object}
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .v-svg svg { fill: currentColor;}
  .svg-13, .svg-13 svg { width: 13px; height: 13px;}
  .svg-14, .svg-14 svg { width: 14px; height: 14px;}
  .svg-15, .svg-15 svg { width: 15px; height: 15px;}
  .svg-16, .svg-16 svg { width: 16px; height: 16px;}
  .svg-17, .svg-17 svg { width: 17px; height: 17px;}
  .svg-18, .svg-18 svg { width: 18px; height: 18px;}
</style>

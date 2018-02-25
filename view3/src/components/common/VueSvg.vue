<template>
  <svg class="svg-fill-color">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
  export default {
    props: {
      name: {type: String, required: true}
    }
  }
</script>

<style lang="scss" scoped>
  .svg-fill-color { fill: currentColor;}

  .svg-13 { width: 13px; height: 13px;}
  .svg-14 { width: 14px; height: 14px;}
  .svg-16 { width: 16px; height: 16px;}
  .svg-18 { width: 18px; height: 18px;}
  .svg-20 { width: 20px; height: 20px;}
  .svg-22 { width: 22px; height: 22px;}
  .svg-40 { width: 40px; height: 40px;}
</style>

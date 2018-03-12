<template>
  <div class="svg-item" :title="svgValues.title || ''">
    <svg :viewBox="svgValues.viewBox">
      <use :xlink:href="`#${svgValues.id}`" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    icon: {required: true, type: [Object, String]},
    title: String
  },
  computed: {
    svgValues () {
      const {icon, title} = this

      if (Object.prototype.toString.call(icon) === '[object Object]') {
        const {viewBox, id} = icon
        return {viewBox: viewBox || '0 0 1024 1024', id: id, title}
      } else if (typeof icon === 'string') return {viewBox: '0 0 1024 1024', id: icon, title}
      else console.error('wrong svg params.')
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-item {
    display: inline-block;
    font-size: 0;
    svg {
      fill: currentColor;
      width: 16px;
    }
    &.svg-13 svg { width: 13px; height: 13px;}
    &.svg-14 svg { width: 14px; height: 14px;}
    &.svg-15 svg { width: 15px; height: 15px;}
    &.svg-16 svg { width: 16px; height: 16px;}
    &.svg-17 svg { width: 17px; height: 17px;}
    &.svg-18 svg { width: 18px; height: 18px;}
  }
</style>

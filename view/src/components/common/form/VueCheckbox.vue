<template>
  <div @click="changeValue" class="chexkbox-item iblock v-m p-h-14 p-v-4 pointer font-12" :class="{selected: item.selected}">
    {{item.name}}
  </div>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    methods: {
      changeValue () {
        this.item.selected = !this.item.selected
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chexkbox-item {
    border: 1px solid #ddd;
    border-radius: 3px;

    &.selected {
      background-color: #666;
      color: #fff;
    }
  }
</style>

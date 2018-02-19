<template>
  <div @click="() => $emit('clickBtn')" class="button-container iblock v-m p-v-8 p-h-16">{{label}}</div>
</template>

<script>
  export default {
    props: {
      label: String
    }
  }
</script>


<style lang="scss" scoped>
  .button-container {
    border: 1px solid #ddd;
    border-radius: 3px;
  }
</style>

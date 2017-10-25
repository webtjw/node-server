<template>
  <div class="a-c">
    <router-link :to="item.path" class="iblock font-14 m-v-10 p-h-6 hover-orange c-normal nav-link relative">
      {{item.name}}
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      item: {type: Object, required: true}
    }
  }
</script>

<style lang="scss" scoped>
  .nav-link {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 0;
      background-color: #EE7600;
      transition: width .2s ease-out;
    }
    &:hover::after {
      width: 100%;
    }
  }
</style>

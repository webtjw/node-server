<template>
  <div class="hinter-container m-v-40" :class="type"></div>
</template>

<script>
export default {
  props: {
    type: {type: String, default: 'NoData'}
  }
}
</script>

<style lang="scss" scoped>
  .hinter-container {
    width: 100%;
    min-height: 180px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 160px;
    &.NoData { background-image: url(../../assets/images/hint_no_data.jpg)};
    &.NoNet { background-image: url(../../assets/images/hint_no_network.jpg)};
    &.NoSearch { background-image: url(../../assets/images/hint_no_search.jpg)};
    &.Wrong { background-image: url(../../assets/images/hint_page_wrong.jpg)};
  }
</style>

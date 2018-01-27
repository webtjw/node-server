<template>
  <div class="nav-item p-v-8 m-v-10 p-h-20 a-c">
    <router-link :to="item.path" class="c-normal" :class="{selected}" flex="dir:left cross:center">
      <vue-svg :name="item.icon" class="svg-14"></vue-svg>
      <div class="p-l-6">{{item.name}}</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      selected: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

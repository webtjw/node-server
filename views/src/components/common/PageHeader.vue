<template>
  <h2 class="font-24 p-20 c-fff bg-333">{{zh}}<span class="font-14 m-l-8">{{en ? `/ ${en}` : ''}}</span></h2>
</template>

<script>
  export default {
    props: {
      zh: String,
      en: String
    }
  }
</script>

<style lang="scss" scoped>

</style>

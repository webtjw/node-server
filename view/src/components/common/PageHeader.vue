<template>
  <div class="page-header p-h-20 p-t-20 p-b-8 font-20">
    <div class="font-18 iblock" :title="title">{{zh}}<span class="font-12 m-l-8">{{en ? `/ ${en}` : ''}}</span></div>
  </div>
</template>

<script>
  export default {
    props: {
      zh: String,
      en: String,
      title: String
    }
  }
</script>

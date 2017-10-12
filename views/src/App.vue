<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view />
  </div>
</template>

<script>
  import TopBar from './components/common/TopBar'
  
  export default {
    name: 'app',
    components: {
      TopBar
    }
  }
</script>

<style>

</style>

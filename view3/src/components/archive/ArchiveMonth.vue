<template>
  <div class="p-b-40 archive-container p-h-20 relative">
    <div class="month p-b-20" flex="dir:left cross:center">
      <div class="circle m-r-10 relative"></div>
      <div>{{monthValue}}</div>
    </div>
    <archive-day v-for="day of monthData" :key="day.title" :day="day"></archive-day>
  </div>
</template>

<script>
  import ArchiveDay from './ArchiveDay'

  export default {
    props: {
      monthData: {
        required: true,
        type: Array
      }
    },
    computed: {
      monthValue () {
        let value = ''
        if (this.monthData && this.monthData.length) value = this.monthData[0].timestamp
        return value
      }
    },
    components: {
      ArchiveDay
    }
  }
</script>


<style lang="scss" scoped>
  $time_color: rgb(155, 155, 155);
  .archive-container::after {
    content: "";
    height: calc(100% - 20px - 10px);
    position: absolute;
    left: 30px;
    top: 25px;
    border-left: 1px solid $time_color;
    z-index: -1;
  }
  .archive-container:last-child::after {
    height: calc(100% - 20px - 10px - 50px);
  }
  .circle {
    width: 20px;
    height: 20px;
    border: 2px solid $time_color;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;

    &::before {
      content: "";
      width: 50%;
      height: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: $time_color;
    }
  }
</style>

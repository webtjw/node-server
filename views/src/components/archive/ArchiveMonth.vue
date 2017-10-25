<template>
  <div class="m-t-50 archive-container">
    <h3 class="p-b-20">{{monthValue}}</h3>
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
        if (this.monthData && this.monthData.length) value = this.monthData[0].id
        return value
      }
    },
    components: {
      ArchiveDay
    }
  }
</script>

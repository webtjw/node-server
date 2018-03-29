<template>
  <div class="m-v-40">
    <div class="m-v-30 p-h-20 font-14">
      <template v-if="tags && tags.length">
        <router-link class="m-r-30 iblock"
          v-for="item of tags"
          :key="item.name"
          :to="`/tag/${item.name}`">{{item.name}}<span class="font-10">{{'(' + item.number + ')'}}</span></router-link>
      </template>
      <hinter v-else></hinter>
    </div>
  </div>
</template>

<script>
import {getAllTags} from '@/actions'

export default {
  data () {
    return {
      tags: []
    }
  },
  methods: {
    async loadData () {
      let result = await getAllTags()
      if (result) {
        result = result.sort((a, b) => {
          return a.number < b.number
        })
        this.tags = result
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

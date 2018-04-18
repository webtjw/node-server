<template>
  <div class="m-v-40">
    <div class="m-v-30 p-h-20 font-16">
      <hinter :asyncTask="fetchData" @asyncReturn="fillData">
        <template v-if="tags && tags.length">
          <router-link class="m-r-30 iblock"
            v-for="item of tags"
            :key="item.name"
            :to="`/tag/${item.name}`">{{item.name}}<span class="font-14">{{'（' + item.number + '）'}}</span></router-link>
        </template>
      </hinter>
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
    async fetchData () {
      let result = await getAllTags()
      return result
    },
    fillData (result) {
      if (result && result.success && result.data) {
        this.tags = result.data.sort((a, b) => {
          return a.number < b.number
        })
      }
    }
  }
}
</script>

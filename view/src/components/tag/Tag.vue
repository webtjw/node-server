<template>
  <div class="m-v-40">
    <page-header zh="标签" en="Tags" title="文章涉及较多的知识点会形成文章标签"></page-header>
    <div class="m-v-30 p-h-20 font-14">
      <router-link class="m-r-30 iblock"
        v-for="item of tags"
        :key="item.name"
        :style="{fontSize: item.percentage}"
        :to="`/tags/${item.name}`">{{item.name}} <span class="font-10">{{`(${item.number})`}}</span></router-link>
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
      async fillRemote () {
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
      this.fillRemote()
    }
  }
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="m-v-40">
    <page-header zh="分类" en="Category" title="根据文章的主要内容的分类"></page-header>
    <div class="m-v-30 p-h-20 font-14">
      <router-link class="m-r-30 iblock"
        v-for="item of categotyList"
        :key="item.name"
        :style="{fontSize: item.percentage}"
        :to="`/category/${item.name}`">{{item.name}} <span class="font-10">{{`(${item.number})`}}</span></router-link>
    </div>
  </div>
</template>

<script>
  import PageHeader from '../common/PageHeader'
  import {getRemoteCat} from '@/actions'

  export default {
    data () {
      return {
        categotyList: []
      }
    },
    methods: {
      async fillRemote () {
        let result = await getRemoteCat()
        if (result) {
          result = result.sort((a, b) => {
            return a.number < b.number
          })
          this.categotyList = result
        }
      }
    },
    mounted () {
      this.fillRemote()
    },
    components: {PageHeader}
  }
</script>

<style lang="scss" scoped>

</style>

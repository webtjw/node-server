<template>
  <div class="paging-list m-v-40">
    <div class="paging-list-inner">
      <div v-for="item of listData" :key="item.title" class="article-item p-v-20 p-h-20" flex="dir:left cross:center">
        <router-link :to="`/article/${item.id}`" class="title font-15 c-normal" flex-box="0">{{item.title}}</router-link>
        <div class="tag p-l-20 p-r-4 bg-fff" flex-box="1" flex="dir:left cross:center">
          <template v-if="!hideTag">
            <vue-svg name="tag" class="svg-14 m-r-8"></vue-svg>
            <router-link :to="`/tags/${tag}`" v-for="tag of item.tags" :key="tag" class="tag-item m-r-8 font-10 c-normal">{{tag}}</router-link>
          </template>
        </div>
        <div class="p-l-10 font-12" flex-box="0">{{item.time}}</div>
      </div>
    </div>

      <pagination :index="index" :maxIndex="maxIndex" @onChange="pageChange"></pagination>
  </div>
</template>

<script>
  import Pagination from '@/components/common/pagination/Pagination'

  export default {
    props: {
      getData: {
        type: Function,
        required: true
      },
      hideTag: Boolean
    },
    data () {
      return {
        index: 1,
        maxIndex: 1,
        listData: []
      }
    },
    methods: {
      async afterLoad () {
        let result = await this.getData(this.index - 1)
        if (result && result.list) {
          result.list.forEach(item => {
            item.tags = item.tags.split(',')
          })
          this.listData = result.list
          this.maxIndex = result.sum
        }
      },
      pageChange (num) {
        if (num !== this.index) {
          this.index = num
          this.afterLoad()
        }
      }
    },
    mounted () {
      this.afterLoad()
    },
    components: {Pagination}
  }
</script>


<style lang="scss" scoped>
  .article-item:hover, .article-item:hover .tag {
    background-color: #fff;
  }
  .article-item, .tag {
    opacity: .8;
    transition: all .2s linear;
  }

  .article-item:hover, .article-item:hover .tag {
    background-color: #f5f5f5;
  }
  a:hover {
    text-decoration: underline;
  }
  .tag-item:hover {
    color: orangered;
  }
  .tag img {
    width: 14px;
    height: 14px;
  }
</style>

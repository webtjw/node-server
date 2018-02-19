<template>
  <div class="pagination p-v-20" flex="dir:left main:center" :class="{hide: showArray.length === 0}">
    <div class="pagination-inner font-13" flex="dir:left main:center cross:center">
      <ul flex="dir:left main:center cross:center">
        <li
          v-for="item of showArray"
          :key="item"
          :class="{cur: index === item}"
          @click="updatePage(item)"
          class="a-c pointer m-h-4">{{item}}</li>
      </ul>
      <div class="input-container m-l-20" flex="dir:left main:center cross:center">
        <div>前往</div>
        <div>
          <input class="a-c m-h-6 relative" type="text" v-model="inputPage" @keydown.13="updatePage(inputPage)"><span>页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      index: {type: Number, required: true},
      maxIndex: {type: Number, required: true}
    },
    data () {
      return {
        inputPage: '',
        showNumber: 5,
        pageNumber: 1
      }
    },
    computed: {
      showArray () {
        const {index, maxIndex} = this
        let pageNum = Math.ceil(maxIndex / this.showNumber)
        this.pageNumber = pageNum

        if (pageNum > 4) {
          if (index < 3) return [1, 2, 3, 4, 5]
          else if (index > (pageNum - 3)) return [pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
          else return [index - 2, index - 1, index, index + 1, index + 2]
        } else if (pageNum === 1) {
          return []
        } else {
          let ma = []
          for (let i = 0; i < pageNum; i++) {
            ma.push(i + 1)
          }
          return ma
        }
      }
    },
    methods: {
      updatePage (num) {
        const {pageNumber} = this
        num > pageNumber ? this.$toast.show(`最大页数为：${pageNumber}`) : this.$emit('onChange', +num)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination-inner {
    li {
      width: 1.4rem;
      line-height: 1.4rem;
      border-radius: 4px;
      background-color: #eee;
      color: #666;
      &.cur {
        background-color: #666;
        color: #fff;
      }
    }

    .input-container {
      input {
        border: 0;
        outline: 0;
        border-bottom: 1px solid #ddd;
        width: 1.8rem;
      }
    }
  }
</style>

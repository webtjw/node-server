<template>
  <div class="select-container relative">
    <vue-input
      :value.sync="inputValue"
      :width="width"
      :label="label"
      :placeholder="placeholder"
      @onFocus="isEditing = true"
      @onBlur="blurInput"
      @onEnter="$emit('onSelect', inputValue)" />
    <div class="select-list absolute p-t-10 bg-fff" :class="{hide: !isEditing || filteredList.length === 0}">
      <ul>
        <li
          v-for="item of filteredList"
          :key="item.id"
          :style="{minWidth: `${width}px`}"
          @click="clickItem(item)"
          class="select-item p-h-10 pointer">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VueInput from './VueInput'

  export default {
    props: {
      label: {type: String, required: true},
      placeholder: {type: String, required: true},
      dataList: Array,
      selected: null
    },
    data () {
      return {
        width: 160,
        inputValue: '',
        isEditing: false
      }
    },
    computed: {
      filteredList () {
        let {inputValue, dataList} = this

        if (!inputValue) return dataList
        else {
          let newList = []
          for (let item of dataList) {
            if (item.name.indexOf(inputValue) !== -1) newList.push(item)
          }
          return newList
        }
      }
    },
    methods: {
      blurInput (event) {
        setTimeout(() => {
          this.isEditing = false
        }, 1000)
      },
      clickItem (item) {
        this.$emit('onSelect', item)
        this.inputValue = item.name
        this.isEditing = false
      }
    },
    components: {VueInput}
  }
</script>

<style lang="scss" scoped>
  .select-list {
    left: 0;
    top: 100%;
    width: auto;
    z-index: 99;

    $liHeight: 32px;
    ul {
      overflow-y: auto;
      max-height: $liHeight * 4 + 2px;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
    li {
      line-height: $liHeight;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
</style>

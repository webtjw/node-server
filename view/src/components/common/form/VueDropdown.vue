<template>
  <div class="select-container" flex="dir:left cross:center" ref="container">
    <!-- labei title -->
    <div v-if="label">{{label}}</div>
    <!-- 下拉框 -->
    <div class="relative m-l-14">
      <!-- 显示部分 -->
      <div @click="toggleSelect" class="select-value p-h-12 p-v-8 pointer" flex="dir:left main:justify cross:center">
        <!-- 选中项 text -->
        <div class="p-r-8">{{selected | haveSelected}}</div>
        <vue-svg class="svg-16" name="down"></vue-svg>
      </div>
      <!-- 列表 -->
      <div class="select-list-container absolute p-t-10" :class="{hide: hideSelect}">
        <ul class="select-list bg-fff p-v-4 pointer">
          <li v-for="item of dataList" @click="selectItem(item)" :key="item.value" class="p-v-8 p-h-8">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Utils from '@/toolkits/Utils'

  export default {
    props: {
      label: String,
      placeholder: String,
      value: String,
      dataList: Array,
      selectedItem: Object,
      selected: Object
    },
    data () {
      return {
        hideSelect: true
      }
    },
    methods: {
      toggleSelect () {
        this.hideSelect = !this.hideSelect
      },
      selectItem (item) {
        item !== this.selected && this.$emit('select', item)
        this.toggleSelect()
      },
      // 点击页面其他地方也要隐藏下拉框
      outHide (event) {
        let target = event.target
        if (!this.hideSelect && !(target === this.$refs.parent || Utils.dom.haveElement(target, this.$refs.container))) {
          this.hideSelect = true
        }
      }
    },
    filters: {
      haveSelected: value => !!value && value.text ? value.text : '请选择'
    },
    mounted () {
      document.body.addEventListener('click', this.outHide)
    },
    beforeDestroy () {
      document.body.removeEventListener('click', this.outHide)
    }
  }
</script>

<style lang="scss" scoped>
  .select-value {
    border: 1px solid #ddd;
    border-radius: 2px;
  }
  .select-list-container {
    left: 0;
    top: 100%;
    overflow: hidden;
    min-width: 100%;
    
    ul, li {
      width: 100%;
    }
    ul {
      border-radius: 3px;
      border: 1px solid #ddd;

      &::before, &::after {
        content: "";
        position: absolute;
        left: 20%;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        transform: translateX(-50%);
      }
      &::before {
        border-bottom: 6px solid #ddd;
        top: 4px;
      }
      &::after {
        border-bottom: 6px solid #fff;
        top: 5px;
      }
      &.hide {
        height: 0px;
        &::before, &::after { display: none;}
      }
    }
    li:hover {
      background-color: #ecf5ff;
      color: #66b1ff;
    }
  }
</style>

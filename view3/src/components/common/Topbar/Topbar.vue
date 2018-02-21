<template>
  <div id="topbar">
    <div class="wrapper" flex="dir:left main:right cross:center">
      <nav flex="dir:left">
        <router-link class="nav-item m-l-12 p-h-8 p-v-8 font-14" v-for="nav in navList" :key="nav.name" :to="nav.path" flex="dir:left cross:center">
          <vue-svg :name="nav.icon" class="svg-14 m-r-6"></vue-svg>
          <span>{{nav.name}}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navList: [
          {name: '首页', path: '/', icon: 'index'},
          {name: '分类', path: '/category', icon: 'category'},
          {name: '标签', path: '/tags', icon: 'tag'},
          {name: '归档', path: '/archives', icon: 'archive'},
          {name: '关于', path: '/about', icon: 'about'}
        ]
      }
    }
  }
</script>

<style lang="scss">
  #topbar {
    border-bottom: 1px solid #e9e9e9;

    .wrapper {
      height: 64px;
      
      .nav-item {
        color: #333;
        transition: all .3s ease-out;
        background-color: #fff;
        &:hover {
          background-color: #333;
          color: #fff;
        }
      }
    }
  }
</style>

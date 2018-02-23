<template>
  <div id="topbar">
    <div class="wrapper" flex="dir:left main:right cross:center">
      <nav flex="dir:left">
        <router-link class="nav-item m-l-4 p-v-6 font-14" :class="{selected: index === navIndex}" v-for="(nav, index) in navList" :to="nav.path" :key="nav.name" @click="jump(nav.path, index)" flex="dir:left cross:center">
          <!-- <vue-svg :name="nav.icon" class="svg-14 m-r-6"></vue-svg> -->
          <span class="p-h-20">{{nav.name}}</span>
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
          {name: '首页', path: '/', prefix: 'index'},
          {name: '分类', path: '/category', prefix: 'category'},
          {name: '标签', path: '/tags', prefix: 'tags'},
          {name: '归档', path: '/archives', prefix: 'archive'},
          {name: '关于', path: '/about', prefix: 'about'}
        ],
        navIndex: 0
      }
    },
    methods: {
      matchNavIndex (path) {
        if (path === '/') this.navIndex = 0;
        else {
          var pathArray = path.split('/');
          var prefix = pathArray[1];
          prefix && this.navList.forEach((item, index) => {
            if (prefix === item.prefix) {
              this.navIndex = index;
            }
          })
        }
      }
    },
    watch: {
      $route (obj) {
        this.matchNavIndex(obj.path);
      }
    },
    mounted () {
      this.matchNavIndex(this.$route.path);
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
        background-color: #fff;
        cursor: pointer;
        transition: all .3s ease-out;
        &:hover, &.selected {
          color: #409EFF;
        }
        &:last-child span {
            border: 0;
        }

        span {
          border-right: 1px solid #999;
        }
      }
    }
  }
</style>

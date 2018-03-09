<template>
  <div id="topbar">
    <div class="wrapper" flex="dir:left cross:center">
      <router-link class="dev-entrance font-13" to="/login">cat's developer</router-link>
      <nav flex="dir:left main:right " flex-box="1">
        <router-link class="nav-item m-l-4 p-h-10 p-v-6 font-13" :class="{selected: index === navIndex}" v-for="(nav, index) in navList" :to="nav.path" :key="nav.name" @click="jump(nav.path, index)" flex="dir:left cross:center">
          <vue-svg :icon="nav.icon" class="svg-14 m-r-6"></vue-svg>
          <span>{{nav.name}}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import svgIndex from '../../../assets/images/svg/index.svg'
import svgCategory from '../../../assets/images/svg/category.svg'
import svgTag from '../../../assets/images/svg/tag.svg'
import svgArchive from '../../../assets/images/svg/archive.svg'
import svgAbout from '../../../assets/images/svg/about.svg'

export default {
  data () {
    return {
      navList: [
        {name: '首页', path: '/', prefix: '/', icon: svgIndex},
        {name: '分类', path: '/category', prefix: 'category', icon: svgCategory},
        {name: '标签', path: '/tags', prefix: 'tags', icon: svgTag},
        {name: '归档', path: '/archives', prefix: 'archives', icon: svgArchive},
        {name: '关于', path: '/about', prefix: 'about', icon: svgAbout}
      ],
      navIndex: 0
    }
  },
  methods: {
    matchNavIndex (path) {
      if (path !== '/') {
        const pathArray = path.split('/')
        const prefix = pathArray[1]
        prefix && this.navList.forEach((item, index) => {
          if (prefix === item.prefix) {
            this.navIndex = index
          }
        })
      } else this.navIndex = 0
    }
  },
  watch: {
    $route (obj) {
      this.matchNavIndex(obj.path)
    }
  },
  mounted () {
    this.matchNavIndex(this.$route.path)
  }
}
</script>

<style lang="scss">
  #topbar {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e6e6e6;

    .wrapper {
      height: 60px;
      .nav-item {
        color: #555;
        cursor: pointer;
        transition: all .3s ease-out;
        &:hover, &.selected {
          color: #333;
          background-color: #e1e1e1;
        }
        &:last-child span {
            border: 0;
        }
      }
      .dev-entrance {
        color: transparent;
      }
    }
  }
</style>

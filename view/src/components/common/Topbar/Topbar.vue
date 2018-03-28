<template>
  <div id="topbar">
    <div class="wrapper" flex="dir:left">
      <router-link class="dev-entrance font-15" to="/login">cat's developer</router-link>
      <nav flex="dir:left main:right " flex-box="1">
        <router-link class="nav-item p-h-20 p-v-6 font-15" :class="{selected: index === navIndex}" v-for="(nav, index) in navList" :to="nav.path" :key="nav.name" @click="jump(nav.path, index)">
          <!-- <vue-svg :icon="nav.icon" class="svg-14 m-r-6"></vue-svg> -->
          {{nav.name}}
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import svgIndex from '../../../assets/images/svg/svg-index.svg'
import svgTag from '../../../assets/images/svg/svg-tag.svg'
import svgArchive from '../../../assets/images/svg/svg-archive.svg'
import svgAbout from '../../../assets/images/svg/svg-about.svg'

export default {
  data () {
    return {
      navList: [
        {name: '首页', path: '/', prefix: '/', icon: svgIndex},
        {name: '标签', path: '/tag', prefix: 'tag', icon: svgTag},
        {name: '归档', path: '/archive', prefix: 'archive', icon: svgArchive},
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
    background-color: rgba(255, 255, 255, .5);
    border-bottom: 1px solid #e6e6e6;

    .wrapper {
      height: 90px;
      .nav-item {
        height: 100%;
        line-height: 82px;
        color: #666;
        cursor: pointer;
        transition: all .3s ease-out;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        &:hover, &.selected {
          color: #000;
        }
        &.selected {
          border-bottom-color: #666;
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

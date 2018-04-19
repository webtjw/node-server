<template>
  <div id="topbar">
    <div class="wrapper font-15" flex="dir:left">
      <router-link class="develop" :to="jumpPath" flex="cross:center">
        <img src="../../../assets/images/avatar.jpg" alt="">
      </router-link>
      <nav flex-box="1" flex="dir:left main:right">
        <router-link class="nav-item iblock p-h-24 m-h-2 relative" flex="dir:left cross:center"
         :class="{selected: index === navIndex}" v-for="(nav, index) in navList" :to="nav.path" :key="nav.name" @click="jump(nav.path, index)">
          <span>{{nav.name}}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import Utils from '../../../toolkits/Utils'
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
      navIndex: 0,
      jumpPath: '/login'
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
    },
    async toShowAddArticle () {
      Utils.isLogin(isLogin => {
        isLogin && (this.jumpPath = '/article/edit')
      })
    }
  },
  watch: {
    $route (obj) {
      this.matchNavIndex(obj.path)
    }
  },
  mounted () {
    this.matchNavIndex(this.$route.path)
    this.toShowAddArticle()
  }
}
</script>

<style lang="scss">
  #topbar {
    background-color: rgba(255, 255, 255, .5);
    border-bottom: 1px solid #e6e6e6;

    .wrapper {
      height: 70px;

      nav { height: 100%;}

      .nav-item {
        height: 100%;
        color: #666;
        cursor: pointer;
        transition: all .3s ease-out;
        text-decoration: none;
        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background-color: #22af6f;
          position: absolute;
          left: 0;
          bottom: 0;
          opacity: 0;
        }
        &:hover::before, &.selected::before {
          opacity: 1;
        }
        &.selected {
          border-bottom-color: #666;
        }
        &:last-child span {
            border: 0;
        }
      }
      .develop {
        img {
          width: 54px; height: 54px; border-radius: 50%; transition: all .5s ease-out;
          &:hover { transform: rotate(360deg);}
        }
      }
    }
  }
</style>

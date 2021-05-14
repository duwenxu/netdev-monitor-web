<template>
  <Layout class="main" style="height: 100%">
    <Sider class="left-slider" hide-trigger collapsible :width="menuWidth" :collapsed-width="64" v-model="collapsed"
           :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage"
                 :menu-list="menuList">
        <div class="main-logo">
          <template v-if="theme === 'light'">
            <div v-show="!collapsed" class="max-logo">
              <img src="@/assets/images/logo/39_light.png" key="max-logo"/>
              <span>卫通集中监控</span>
            </div>
            <img v-show="collapsed" class="min-logo" src="@/assets/images/logo/39_light.png" key="min-logo"/>
          </template>
          <template v-else-if="theme === 'dark'">
            <div v-show="!collapsed" class="max-logo">
              <img src="@/assets/images/logo/39.png" key="max-logo"/>
              <span>卫通集中监控</span>
            </div>
            <img v-show="collapsed" class="min-logo" src="@/assets/images/logo/39.png" key="min-logo"/>
          </template>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="main-header">
        <div class="main-tool" style="width: 100%;">
          <div class="main-trigger">
            <sider-trigger :collapsed="collapsed" icon="md-menu"
                           @on-change="handleCollapsedChange"></sider-trigger>
            <custom-bread-crumb class="main-bread-crumb"
                                v-show="screenWidth>768" show-icon :list="breadCrumbList"
                                :font-size="14"></custom-bread-crumb>
          </div>
          <div class="main-header-bar">
            <fullscreen @input="getScreen" v-model="isFullscreen" class="fullscreen" :screenWidth="screenWidth"/>
            <div class="themestatus">
              <Icon :type="theme === 'dark' ? 'ios-moon' : 'ios-sunny'" @click="handleChangeThemes" size="22"/>
            </div>
            <user :user-name="userName" :message-unread-count="unreadCount" :user-avator="userAvator"/>
          </div>
        </div>
      </Header>
      <Content :class="mainClass">
        <Layout class="main-content-wrapper">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="main-view-wrapper ">
            <div class="dark-page-border" :class="{'content': !noShowBgRouteList.includes($route.name)}">
              <template v-if="$route.meta.noalive">
                <router-view :key="key"/>
              </template>
              <template v-else>
                <keep-alive :include="cacheList">
                  <router-view/>
                </keep-alive>
              </template>
            </div>
            <ABackTop :height="100" :bottom="80" :right="50" container=".main-view-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  import User from './components/user'
  import SideMenu from './components/side-menu'
  import HeaderBar from './components/header-bar'
  import ABackTop from './components/a-back-top'
  import Fullscreen from './components/fullscreen'
  import ErrorStore from './components/error-store'
  import siderTrigger from './components/header-bar/sider-trigger'
  import customBreadCrumb from './components/header-bar/custom-bread-crumb'
  import TagsNav from './components/tags-nav'
  import {getNewTagList, getNextRoute, routeEqual, localRead} from '@/libs/util'
  import {mapMutations, mapActions, mapState, mapGetters} from 'vuex'
  import routers from '@/router/routers'
  import './main.less'

  export default {
    name: 'Main',
    components: {
      SideMenu,
      HeaderBar,
      Fullscreen,
      ErrorStore,
      ABackTop,
      customBreadCrumb,
      siderTrigger,
      User,
      TagsNav
    },
    data() {
      return {
        noShowBgRouteList: [
          'home'
        ],
        menuWidth: 260,
        themesStatus: '',
        collapsed: false,
        isFullscreen: false,
        screenWidth: 0,
        selectSpace: '',
        messageData: [],
        timer: ''
      }
    },
    computed: {
      ...mapGetters([
        'errorCount'
      ]),
      ...mapState({
        theme: state => state.user.theme
      }),
      key() {
        return this.$route.path + Math.random();
      },
      breadCrumbList() {
        let list = this.$store.state.app.breadCrumbList
        list.forEach((item, index) => {
          if (item.meta.showInHeader) {
            list.splice(index, 1)
          }
        })
        return list
      },
      headerLogoClass() {
        return [
          'main-header-logo',
          this.collapsed ? 'main-header-logo-collapsed' : ''
        ]
      },
      mainClass() {
        return [
          'main-content',
          this.collapsed ? 'main-content-collapsed' : ''
        ]
      },
      tagNavList() {
        return this.$store.state.app.tagNavList
      },
      tagRouter() {
        return this.$store.state.app.tagRouter
      },
      userAvatar() {
        return this.$store.state.user.avatarImgPath
      },
      userName() {
        return this.$store.state.user.userName
      },
      userAvator() {
        // return this.$store.state.user.avatorImgPath
        return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554255513&di=eb15a591b289c74ee7bf2896c7f1eed3&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a66b58158d4ba84a0e282b024923.png%402o.jpg'
      },
      unreadCount() {
        return this.$store.state.user.unreadCount
      },
      nickName() {
        return this.$store.state.user.nickName
      },
      cacheList() {
        const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
        return list
      },
      menuList() {
        return this.$store.getters.menuList
      },
      local() {
        return this.$store.state.app.local
      },
      hasReadErrorPage() {
        return this.$store.state.app.hasReadErrorPage
      }
    },

    methods: {
      ...mapMutations([
        'setBreadCrumb',
        'setTagNavList',
        'addTag',
        'setLocal',
        'saveSpace',
        'setHomeRoute',
        'setTheme',
        'setMediaWidthType'
      ]),
      getScreen(data) {
        this.$xy.vector.$emit('screenState', {state: data})
      },
      handleChangeThemes() {
        let value = 'light'
        if (this.theme === 'light') {
          value = 'dark'
        }
        this.setTheme(value)
      },
      turnToPage(route) {
        let tag = false
        let {name, params, query} = {}
        if (typeof route === 'string') name = route
        else {
          name = route.name
          params = route.params
          query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
        }
        this.$router.push({
          name,
          params,
          query
        })
        this.tagNavList.forEach(v => {
          if (route == v.name) {
            tag = true
          }
        })
        if (this.tagNavList.length >= 14) {
          if (!tag) {
            this.tagNavList.splice(1, 1)
          }
        }

      },
      handleCollapsedChange(state) {
        this.collapsed = state
      },
      handleCloseTag(res, type, route) {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else if (routeEqual(this.$route, route)) {
          if (type !== 'others') {
            const nextRoute = getNextRoute(this.tagNavList, route)
            this.$router.push(nextRoute)
          }
        }
        this.setTagNavList(res)
      },
      handleClick(item) {
        this.turnToPage(item)
      },
      setLayout() {
        let layout = localStorage.getItem('layout')
        if (!layout) {
          layout = 'left'
          localStorage.setItem('layout', layout)
        }
        this.layout = layout
      },
      mediaWidth(){
        const that = this
        that.screenWidth = document.body.clientWidth
        if (that.screenWidth <= 991 || that.screenWidth <= 1199 ) {
          that.menuWidth = 214
          that.setMediaWidthType(0)
        } else if (that.screenWidth <= 1919 || that.screenWidth >= 1920) {
          that.menuWidth = 260
          that.setMediaWidthType(1)
        }
      }
    },
    watch: {
      screenWidth(val) {
        const that = this
        if (val < 768) {
          // 小于768强制折叠
          that.handleCollapsedChange(true)
        } else {
          that.handleCollapsedChange(false)
        }
      },
      '$route'(newRoute) {
        const {name, query, params, meta} = newRoute
        this.addTag({
          route: {name, query, params, meta},
          type: 'push'
        })
        this.setBreadCrumb(newRoute)
        this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        this.$refs['sideMenu'].updateOpenName(newRoute.name)
      }
    },
    mounted() {
      this.setTheme(localRead('themeColor') || 'light')
      // this.initTheme()
      // 宽度适应
      this.mediaWidth()
      window.onresize = () => {
        return (() => {
          this.mediaWidth()
        })()
      }
      // 设置布局
      this.setLayout()
      // 初始化设置面包屑导航和标签导航
      this.setTagNavList()
      this.setHomeRoute(routers)
      this.addTag({
        route: this.$store.state.app.homeRoute
      })
      this.setBreadCrumb(this.$route)
      // 设置初始语言
      this.setLocal(this.$i18n.locale)
      // 如果当前打开页面不在标签栏中，跳到homeName页
      if (!this.tagNavList.find(item => item.name === this.$route.name)) {
        this.$router.push({
          name: this.$config.homeName
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
</style>

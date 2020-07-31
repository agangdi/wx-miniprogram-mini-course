<template>
  <div id="siderbar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
       :collapse-transition="collapseTransition"
       :default-active="activeMenu"
       :unique-opened="uniqueOpend"
       class="el-menu-vertical-demo"
       @open="handleOpen"
       @close="handleClose"
       :collapse="isCollapse">
        <el-submenu v-for="(navItem, navIndex) in navs" :key="navIndex" :index="navItem.index">
          <template slot="title">
            <i :class="navItem.icon"></i>
            <span slot="title">{{navItem.label}}</span>
          </template>
          <el-menu-item v-on:click="to(subNav)" v-for="(subNav, subIndex) in navItem.children" :key="subIndex" :index="subNav.index">
            <span>{{subNav.label}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import navs from './navs'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        uniqueOpend: true,
        activeMenu: '1-1',
        navs: navs.navs,
        collapseTransition: true
      };
    },
    computed: {
      ...mapGetters('setting', {
        isCollapse: 'sidebarCollapse'
      })
    },
    mounted() {
      console.log(this.$route.path)
      navs.navs.forEach(element => {
        if(element.router == this.$route.path) {
          this.activeMenu = element.index
        }
        if(element.children) {
          element.children.forEach(c => {
            if(c.router == this.$route.path) {
              this.activeMenu = c.index
            }
          })
        }
      });
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log('handleOpen', key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log('handleClose', key, keyPath);
      },
      to(subNav) {
        if(subNav.index === this.activeMenu) {
          this.$route.path !== subNav.router && this.$router.replace(subNav.router)
        }else{
          this.$router.push(subNav.router)
          this.activeMenu = subNav.index
        }
      }
    }
  }
</script>

<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100vh;
    margin: 0 !important;
  }
  #siderbar {
    height: 100vh;
    background-color: #efefef;
    position: relative;
    float: left;
  }
  .el-menu--collapse{
    height: 100vh;
  }
  .el-menu{
    background-color: #efefef;
  }
  .el-submenu{
    text-align: left;
  }
  .scrollbar-wrapper{
    height: 100%;
    overflow-x: hidden;
  }
</style>

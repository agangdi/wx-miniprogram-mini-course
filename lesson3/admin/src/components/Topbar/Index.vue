<template>
  <div id="topbar">
    <i v-on:click='onFold' :class="isCollapse ? 'el-icon-s-unfold icon-fold' : 'el-icon-s-fold icon-fold'" />
    <div id="userinfo">
      loginname
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    
  },
  methods: {
    ...mapMutations('setting', {
      toggleSidebarCollapse: 'toggleSidebarCollapse'
    }),
    onFold() {
      this.toggleSidebarCollapse()
    }
  }
}
</script>

<style lang="scss">
#topbar{
  width: 100%;
  height: 60px;
  margin-top: 15px;
  // border-bottom: 1px solid #efefef;
  .icon-fold{
    font-size: 28px;
    cursor: pointer;
    float: left;
  }
  #userinfo{
    float: right;
    margin-right: 25px;
  }
}
</style>
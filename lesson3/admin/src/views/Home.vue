<template>
  <div class="home">
    <Siderbar/>
    <div id="app-main" :class="!SiderbarCollapse ? 'full-width' : 'short-width'">
      <Topbar />
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Siderbar from '@/components/Sidebar/Index'
import Topbar from '@/components/Topbar/Index'
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  components: {
    Siderbar,
    Topbar
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('setting', {
      SiderbarCollapse: 'sidebarCollapse'
    })
  },
  methods: {
  }
}
</script>

<style scoped>
  .home{
    width: 100%;
    height: 100%;
  }
  #app-main{
    height: 100vh;
    overflow: scroll;
    float: right;
    transition: width 0.5s;
  }
  .full-width{
    width: calc(100vw - 230px);
  }
  .short-width{
    width: calc(100vw - 80px);
  }
</style>
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <sidebar class="sidebar-container" /> -->
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import LayoutMixin from './layout-mixin';
import Sidebar from './components/sidebar.vue';
import Navbar from './components/navbar.vue';
import AppMain from './components/app-main.vue';

export default defineComponent({
  components: { AppMain, Sidebar, Navbar },
  mixins: [ LayoutMixin ],
  computed: { 
    ...mapState('framework', {
      sidebar: (state: any): any => state.sidebar,
      device: (state: any): string => state.device,
      fixedHeader: (state: any): boolean => state.fixedHeader
    }),
    classObj() {
      let _self = <any>this;
      return {
        hideSidebar: !_self.sidebar.opened,
        openSidebar: _self.sidebar.opened,
        withoutAnimation: _self.sidebar.withoutAnimation,
        mobile: _self.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      let _self = <any>this;
      _self.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
})
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>

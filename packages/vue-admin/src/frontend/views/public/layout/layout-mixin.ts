
const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route: any) {
      let _self = <any>this;
      if (_self.device === 'mobile' && _self.sidebar.opened) {
        _self.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    let _self = <any>this;
    const isMobile = _self.$_isMobile()
    if (isMobile) {
      _self.$store.dispatch('framework/toggleDevice', 'mobile')
      _self.$store.dispatch('framework/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      let _self = <any>this;
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        _self.$store.dispatch('framework/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          _self.$store.dispatch('framework/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
} as any;

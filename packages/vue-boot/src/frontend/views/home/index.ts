import { defineComponent, h } from 'vue';

export default defineComponent({
  data() {
    return {
      page: 'vue boot'
    }
  },
  render() {
    return h('h1', {}, [
      `hello ${this.page}`
    ])
  }
});
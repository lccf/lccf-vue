<template>
  <div>
    <h2>{{ title }}</h2>
    <p>login url: {{ loginUrl }}</p>
    <button @click="showLoginUrl">show login url</button>
  </div>

</template>
<script lang="ts">
import { ContainerUtil } from '@malagu/core';
import { ConfigContext } from '@lccf-vue/vue-boot';
import { defineComponent, computed,  } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  data() {
    return {
      loginUrl: ''
    }
  },
  setup() {
    const store = useStore();
    const showLoginUrl = function() {
      const config = ContainerUtil.get<ConfigContext>(ConfigContext);
      let loginUrl = config.get<string>('pageUrl.user.login');
      this.loginUrl = loginUrl;
    }
    return {
      title: computed(() => store.state.title),
      showLoginUrl
    }
  },
})
</script>

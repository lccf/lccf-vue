<template>
  <div class="app-container">
    <h2>{{ title }}</h2>
    <p>login url: {{ loginUrl }}</p>
    <el-button type="primary" @click="showLoginUrl">show login url</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ContainerUtil } from '@malagu/core';
import { ConfigContext } from '@lccf-vue/vue-boot';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loginUrl = ref('');
const showLoginUrl = function() {
  const config = ContainerUtil.get<ConfigContext>(ConfigContext);
  let url = config.get<string>('pageUrl.user.login');
  loginUrl.value = url;
}
const title = computed(() => store.state.title);
</script>

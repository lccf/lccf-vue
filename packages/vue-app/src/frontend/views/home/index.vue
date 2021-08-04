<template>
  <div class="el-main">
    <h2>{{ title }}</h2>
    
    <p>框架公共页面：</p>
    <ul>
      <li>
        <el-link type="primary">
          <router-link to="/login">登录页</router-link>
        </el-link>
      </li>
      <li>
        <el-link type="primary">
          <router-link to="/404" type="primary">404</router-link>
        </el-link>
      </li>
    </ul>

    <p>配置链接：{{ loginUrl }}</p>
    <el-button @click="showLoginUrl" size="mini" type="success">读取配置链接</el-button>
  </div>

</template>
<script lang="ts">
import { ContainerUtil } from '@malagu/core';
import { ConfigContext } from '@lccf-vue/vue-boot';
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  data() {
    return {
    }
  },
  setup() {
    const store = useStore();
    const loginUrl = ref('');
    const showLoginUrl = function() {
      const config = ContainerUtil.get<ConfigContext>(ConfigContext);
      let url = config.get<string>('pageUrl.user.login');
      loginUrl.value = url;
    }
    return {
      title: computed(() => store.state.title),
      loginUrl,
      showLoginUrl
    }
  },
})
</script>

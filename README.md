### vue-boot示例

执行以下步骤运行 vue-app

- yarn install安装依赖
- yarn lerna run build --scope @lccf-vue/vue-boot
- yarn lerna run build --stream --scope @lccf-vue/vue-admin
- yarn lerna run serve --stream --scope @lccf-vue/vue-app

### 关于vue-admin
vue-admin 界面从 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 的移植，去除了部分个人觉得比较冗余的部分。
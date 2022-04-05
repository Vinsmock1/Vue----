<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "CommonTag",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
        close:'closeTag'
    }),
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    handleClose(tag, index) {
      /* 将length等同于index,后面好比较 */
      const length = this.tags.length - 1;
      this.close(tag)
      /* 如果点击路由和我们当前的路由不一致,则不需要修改焦点,直接return */
      /* if (tag.name !== this.$route.name) {
        return;
      } */
      /* index和length相等,说明是最后一个tag标签,当删除时应该往前面一个标签路由跳转 */
      if (index === length) {
        this.$router.push({
          name: this.tags[index -1].name,
        });
      } else {
        /* index和length不相等,说明是中间,当删除时往后面一个路由跳转 */
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>

<template>
  <mu-load-more
    class="content"
    :loading="loading"
    :refreshing="refreshing"
    :loaded-all="loadEnd"
    @load="loadNext"
    @refresh="refreshData"
  >
    <div class="content-list">
      <div class="content-item" v-for="(v, k) of list" :key="k">
        <div class="content-image">
          <img v-lazy="v.cover" @click="onSelect(v)">
        </div>
      </div>
    </div>
  </mu-load-more>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { getList } from '@/api';

export default {
  name: 'Content',
  props: {
    link: String,
  },
  data() {
    return {
      page: 0,
      list: [],
      loadEnd: false,
      loading: false,
      refreshing: false,
    };
  },
  async mounted() {
    const loading = this.$loading();
    await this.getNextPage();
    loading.close();
  },
  methods: {
    async getPage(page, cover) {
      const { link } = this;
      const data = await getList({ link, page });
      if (data.length) {
        this.list = cover ? data.slice(0) : this.list.concat(data);
        this.loadEnd = false;
      } else {
        this.loadEnd = true;
      }
    },

    async getNextPage() {
      if (this.loadEnd) return;
      await this.getPage(this.page + 1);
    },

    async refreshData() {
      this.refreshing = true;
      await this.getPage(1, true);
      this.refreshing = false;
    },

    async loadNext() {
      this.loading = true;
      await this.getNextPage();
      this.loading = false;
    },

    onSelect(item) {
      this.$emit('select', item);
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>

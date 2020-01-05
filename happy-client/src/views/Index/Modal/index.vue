<template>
  <div class="view" v-if="data">
    <mu-appbar class="view-bar" color="pink" :title="data.title">
      <mu-button icon slot="left" @click="close">
        <mu-icon value=":icon ion-md-arrow-back"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="view-container" v-loading="loading">
      <img v-for="(v, k) of images" :key="k" v-lazy="v">
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { getImage } from '@/api';

export default {
  name: 'Modal',
  props: {
    data: Object,
  },
  data() {
    return {
      images: [],
      loading: false,
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async getData() {
      this.loading = true;
      const { link, title } = this.data;
      const data = await getImage({ link, title });
      this.images = data.slice(0);
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>

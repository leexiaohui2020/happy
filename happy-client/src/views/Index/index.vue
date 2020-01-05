<template>
  <div class="page">
    <div ref="nav" class="page-nav">
      <mu-tabs :value.sync="current" color="pink" indicator-color="white" @change="onTabsChange">
        <mu-tab v-for="(v, k) of cate" :key="k">
          <span>{{ v.title }}</span>
        </mu-tab>
      </mu-tabs>
    </div>

    <div class="page-container">
      <div class="page-wrapper" :style="wrapperStyle">
        <div class="page-wrapper-item" v-for="(v, k) of cate" :key="k">
          <Content :link="v.link" @select="onSelectItem" v-if="cache[k]" />
        </div>
      </div>
    </div>

    <mu-drawer :open="drawerShow" right width="100%">
      <Modal :data="viewLink" v-if="viewLink" @close="closeModal" />
    </mu-drawer>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { getIndex } from '@/api';
import Content from './Content';
import Modal from './Modal';

export default {
  name: 'Index',
  components: { Content, Modal },
  data() {
    return {
      cate: [],
      cache: [],
      current: 0,
      viewLink: null,
    };
  },
  computed: {
    wrapperStyle() {
      return {
        width: `${this.cate.length * 100}%`,
        transform: `translateX(-${this.current * 100 / this.cate.length}%)`,
      };
    },
    drawerShow() {
      return !!this.viewLink;
    },
  },
  async mounted() {
    await this.getInitData();
    this.init = true;
    this.onTabsChange(this.current);
  },
  methods: {
    async getInitData() {
      const data = await getIndex();
      this.cate = data.cate;
    },

    onTabsChange(value) {
      const cache = this.cache.slice(0);
      cache[value] = true;
      this.cache = cache;
    },

    onSelectItem(item) {
      if (!this.drawerShow) {
        this.viewLink = item;
      }
    },

    closeModal() {
      this.viewLink = null;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>

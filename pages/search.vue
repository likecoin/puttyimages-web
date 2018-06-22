<template>
  <div class="search-page page-container">

    <div class="search-page__field">
      <search-icon class="search-page__icon" />
      <v-text-field
        v-model="searchQuery"
        :loading="isLoading"
        class="search-page__input"
        color="brown"
        hide-details
        placeholder="Search for any image"
        @keyup.native="onKeywordChange"
      />
    </div>

    <div class="mt-20">
      <v-card
        v-if="searchQuery.length && !isLoading && !images.length"
        class="text-xs-center py-20"
      >No Result Found</v-card>

      <img
        v-for="image in images"
        :key="image.url"
        :src="image.url"
      >
    </div>

  </div>
</template>

<script>
import SearchIcon from '~/assets/icons/search.svg';

export default {
  components: {
    SearchIcon,
  },
  data: () => ({
    images: [],
    isLoading: false,
    pageInfo: null,
    searchQuery: '',
    timer: null,
  }),
  head() {
    return {
      title: 'Search images - puttyimages',
    };
  },
  methods: {
    async onKeywordChange(e) {
      const { searchQuery } = this;
      if (searchQuery.length === 0) {
        this.isLoading = false;
        return;
      } else if (e) {
        this.isLoading = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.onKeywordChange(), 300);
        return;
      }
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const { data, pageInfo } = await res.json();
      this.isLoading = false;
      this.images = data;
      this.pageInfo = pageInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-page__field {
  display: flex;
  align-items: center;

  padding: 0 16px;

  border-radius: 2px;
  background: #efefef;
}
.search-page__icon {
  width: 23px;
  height: 23px;

  color: #aaa;
}
.search-page__input {
  margin-left: 14px;
  padding: 14px 0;
}
.search-page__input /deep/ input {
  text-align: center;
}
.application .search-page__input /deep/ .input-group__details:before {
  background-color: transparent;
}
</style>

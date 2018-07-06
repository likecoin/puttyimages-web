<template>
  <div class="search-page page-container page-container--fluid">

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

    <div class="mt-48">
      <masonry-images-grid
        :colCount.sync="colCount"
        :images="masonryImages"
      />

      <no-ssr>
        <infinite-loading
          v-if="searchQuery.length"
          ref="infiniteLoading"
          spinner="spiral"
          @infinite="infiniteHandler"
        >
          <span slot="no-more" />
          <div
            slot="no-results"
            class="search-page__no-results"
          >
            {{ $t('Search.label.placeholder', { searchQuery } ) }}
          </div>
        </infinite-loading>
      </no-ssr>
    </div>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import axios from '@/plugins/axios';

import MasonryImagesGrid, {
  mixin as masonryImagesGridMixin,
} from '~/components/MasonryImagesGrid';
import SearchIcon from '~/assets/icons/search.svg';

export default {
  components: {
    InfiniteLoading,
    MasonryImagesGrid,
    SearchIcon,
  },
  mixins: [masonryImagesGridMixin],
  data() {
    const { q, tags } = this.$route.query;

    let searchQuery = '';
    if (tags) {
      searchQuery = tags
        .split(',')
        .reduce((tagQuery, tag) => `${tagQuery}#${tag} `, '')
        .trim();
    } else if (q) {
      searchQuery = decodeURIComponent(q);
    }

    return {
      featuredImages: [],
      images: [],
      isLoading: false,
      pageInfo: null,
      rawImages: [],
      searchQuery,
      timer: null,
    };
  },
  computed: {
    masonryImages() {
      if (this.images.length > 0 || this.searchQuery.length > 0) {
        return this.images;
      }
      return this.featuredImages;
    },
  },
  head() {
    return {
      title: `${
        this.searchQuery ? `${this.searchQuery} - ` : ''
      }Search Images | puttyimages`,
    };
  },
  mounted() {
    this.onKeywordChange();
  },
  methods: {
    async infiniteHandler($state) {
      const { colCount, pageInfo, rawImages } = this;
      if (pageInfo && pageInfo.hasNextPage) {
        try {
          this.isLoading = true;
          const { data, pageInfo: nextPageInfo } = (await axios.get(
            pageInfo.next
          )).data;
          this.isLoading = false;
          this.rawImages = rawImages.concat(data);
          this.images = this.sortImagesByHeight(this.rawImages, colCount);
          this.pageInfo = nextPageInfo;
          $state.loaded();
        } catch (err) {
          this.isLoading = false;
        }
      }
    },
    matchRouteToSearchQuery() {
      const nextRoute = {
        name: 'search',
        query: {},
      };

      if (this.searchQuery) {
        nextRoute.query.q = this.searchQuery;
      }

      // Replace route history if:
      // - there is no 'q' field in query string or;
      // - there are more than one fields
      if (!this.$route.query.q || Object.keys(this.$route.query).length > 1) {
        this.$router.replace(nextRoute);
      } else {
        this.$router.push(nextRoute);
      }
    },
    async onKeywordChange(e) {
      const { colCount, searchQuery } = this;
      if (searchQuery.length === 0) {
        // fetch featured image list if no search result
        if (this.featuredImages.length === 0) {
          try {
            const { data } = await axios.get('/api/assets/featured/list');
            this.featuredImages = this.sortImagesByHeight(data, colCount);
          } catch (err) {
            console.error(err); // eslint-disable-line no-console
          }
        }
        this.isLoading = false;
        this.images = [];
        this.pageInfo = null;
        this.matchRouteToSearchQuery();
        return;
      } else if (e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.onKeywordChange(), 300);
        return;
      }

      this.isLoading = true;
      try {
        const { data, pageInfo } = (await axios.get(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        )).data;
        this.rawImages = data;
        this.images = this.sortImagesByHeight(data, colCount);
        this.pageInfo = pageInfo;

        const { stateChanger } = this.$refs.infiniteLoading;
        stateChanger.reset();
        if (data.length) {
          stateChanger.loaded();
        }
        this.matchRouteToSearchQuery();

        this.isLoading = false;
        stateChanger.complete();
      } catch (err) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.application .search-page__input /deep/ .input-group__details:before {
  background-color: transparent;
}
.search-page__field {
  display: flex;
  align-items: center;

  @include desktop-and-up {
    width: 60%;
  }
  margin: 0 auto;
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
.search-page__input /deep/ input::placeholder {
  text-align: center;
}

.search-page__no-results {
  color: color(gray-4a);

  @extend .text--size-18, .py-48;
}
</style>

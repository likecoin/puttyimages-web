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

    <div class="mt-20">
      <div class="search-page__masonry">
        <div
          v-for="image in images"
          :key="image.url"
          class="search-page__item"
        >
          <img
            :src="image.url"
            class="search-page__image"
          >
          <user-badge
            :user="image.user"
            class="search-page__button search-page__button--user"
          />
          <like-button
            :count="image.like.count"
            class="search-page__button search-page__button--like"
          />
          <v-btn
            class="btn--likecoin search-page__button search-page__button--use"
            color="secondary"
            @click="useImage(image)"
          >
            Use Image
          </v-btn>
        </div>
      </div>

      <no-ssr>
        <infinite-loading
          v-if="searchQuery.length"
          ref="infiniteLoading"
          @infinite="infiniteHandler"
        >
          <span slot="no-more" />
          <v-card
            slot="no-results"
            class="text-xs-center py-20"
          >
            No Result Found
          </v-card>
        </infinite-loading>
      </no-ssr>
    </div>

  </div>
</template>

<script>
import axios from '@/plugins/axios';
import InfiniteLoading from 'vue-infinite-loading';

import { createMixin as createTheImageDetailsDialogMixin } from '~/components/TheImageDetailsDialog';

import LikeButton from '~/components/LikeButton';
import SearchIcon from '~/assets/icons/search.svg';
import UserBadge from '~/components/UserBadge';

import { sortImagesByHeight } from '~/util/masonry';

export default {
  components: {
    InfiniteLoading,
    LikeButton,
    SearchIcon,
    UserBadge,
  },
  mixins: [createTheImageDetailsDialogMixin()],
  data: () => ({
    colCount: 3,
    images: [],
    isLoading: false,
    pageInfo: null,
    rawImages: [],
    searchQuery: '',
    timer: null,
  }),
  head() {
    return {
      title: 'Search images - puttyimages',
    };
  },
  beforeDestroy() {
    if (window) {
      window.removeEventListener('resize', this.handleResize);
    }
  },
  mounted() {
    if (window) {
      window.addEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      const { clientWidth } = document.body;
      let colCount = 1;
      if (clientWidth > 960) {
        colCount = 3;
      } else if (clientWidth > 600) {
        colCount = 2;
      }
      if (colCount !== this.colCount) {
        this.colCount = colCount;
        this.images = sortImagesByHeight(this.rawImages, colCount);
      }
    },
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
          this.images = sortImagesByHeight(this.rawImages, colCount);
          this.pageInfo = nextPageInfo;
          $state.loaded();
        } catch (err) {
          this.isLoading = false;
        }
      } else {
        $state.complete();
      }
    },
    async onKeywordChange(e) {
      const { colCount, searchQuery } = this;
      if (searchQuery.length === 0) {
        this.isLoading = false;
        this.images = [];
        this.pageInfo = null;
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
        this.isLoading = false;
        this.rawImages = data;
        this.images = sortImagesByHeight(data, colCount);
        this.pageInfo = pageInfo;
        const { stateChanger } = this.$refs.infiniteLoading;
        if (pageInfo.hasNextPage) {
          stateChanger.reset();
        } else {
          if (data.length) {
            stateChanger.loaded();
          }
          stateChanger.complete();
        }
      } catch (err) {
        this.isLoading = false;
      }
    },
    useImage(image) {
      this.setImageDetailsDialog({
        image,
        isFetched: true,
        isOpen: true,
        isUseImage: true,
      });
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
.search-page__button {
  position: absolute;

  visibility: hidden;

  width: 138px;
}
.search-page__button--like {
  bottom: 15px;
  left: 15px;

  font-size: 14px;
}
.search-page__button--use {
  right: 12px;
  bottom: 15px;

  font-size: 16px;
}
.search-page__button--user {
  top: 20px;
  left: 18px;
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
.search-page__image {
  max-width: 100%;
  max-height: (920 / 3) * 2px;
}
.search-page__item {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  break-inside: avoid;
  page-break-inside: avoid;

  min-height: 180px;

  padding-bottom: 10px;
}
.search-page__item:hover .search-page__button {
  visibility: visible;
}
.search-page__masonry {
  column-gap: 10px;

  @include desktop-and-up {
    column-count: 3;
  }
  @include tablet-only {
    column-count: 2;
  }
  @include mobile-only {
    column-count: 1;
  }
}
</style>

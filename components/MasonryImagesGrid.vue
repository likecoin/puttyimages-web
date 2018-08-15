<template>
  <div class="masonry-images-grid">
    <div
      v-for="image in images"
      :key="image.url"
      class="masonry-images-grid__item"
    >
      <div
        class="masonry-images-grid__item-overlay"
        @click="openDetails(image)"
      />

      <user-badge
        :label="image.likeOwner ? image.likeOwner[0] : ''"
        :link="image.link"
        :user="image.user"
        class="masonry-images-grid__button masonry-images-grid__button--user"
        type="min"
      >
        <template
          v-if="checkIsLikeEscrow(image)"
          slot="from"
        >
          <i18n
            class="masonry-images-grid__escrow-label"
            path="ImageDetails.label.from"
            tag="span"
          >
            <span>
              {{ getImageSourceFromUrl(image.link) }}
            </span>
          </i18n>
        </template>
      </user-badge>

      <img
        :src="image.url"
        class="masonry-images-grid__image"
        @click="openDetails(image)"
      >

      <!-- TODO: need to wait for small like button design -->
      <!-- <div class="masonry-images-grid__actions">
        <like-button
          :count="0"
          class="masonry-images-grid__button masonry-images-grid__button--like"
          color="white"
        />

        <v-btn
          class="btn--likecoin masonry-images-grid__button masonry-images-grid__button--use"
          color="secondary"
          depressed
          @click="openDetails(image, { isUseImage: true })"
        >
          {{ $t('General.button.useImage') }}
        </v-btn>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import LikeButton from '~/components/LikeButton';
import UserBadge from '~/components/UserBadge';

import { getImageSourceFromUrl } from '~/util/index';

const MIN_HEIGHT = 180;

function sortImagesByHeight(images, colCount) {
  const cols = new Array(colCount).fill('').map(() => []);
  const height = new Array(colCount).fill(0);
  const MAX_HEIGHT = (920 / colCount) * 2;
  images.forEach((image) => {
    const minHeight = Math.min(...height);
    const index = height.indexOf(minHeight);
    cols[index].push(image);
    height[index] += Math.min(Math.max(image.height, MIN_HEIGHT), MAX_HEIGHT);
  });
  return [].concat(...cols);
}

export default {
  name: 'masonry-images-grid',
  components: {
    LikeButton,
    UserBadge,
  },
  props: {
    colCount: {
      type: Number,
      default: 3,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions(['toggleImageDetailsDialog']),
    openDetails(image, options = {}) {
      this.toggleImageDetailsDialog({
        ...options,
        image,
        isFetched: true,
        isOpen: true,
      });
    },
    checkIsLikeEscrow({ likeEscrow }) {
      return !!likeEscrow;
    },
    getImageSourceFromUrl,
  },
};

export const mixin = {
  data() {
    return {
      colCount: 3,
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
    sortImagesByHeight,
  },
};
</script>


<style lang="scss" scoped>
@import '~assets/css/classes';

.masonry-images-grid {
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

  &__item {
    position: relative;

    display: flex;
    justify-content: center;

    min-height: 180px;

    break-inside: avoid;
    page-break-inside: avoid;
    @extend .mb-12;
    @include tablet-and-up {
      flex-direction: row;
    }
    @include mobile-only {
      flex-direction: column;
    }

    &:not(:first-child) {
      @extend .mt-64--xs;
    }

    &-overlay {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      opacity: 0;
      background-color: rgba(0, 0, 0, 0.53);

      @extend .hide--xs;
    }
  }

  &__image {
    align-self: center;

    max-width: 100%;
    max-height: (920 / 3) * 2px;
  }

  &__button--user,
  &__actions {
    @include tablet-and-up {
      position: absolute;

      opacity: 0;
    }
  }

  &__button--user {
    top: 20px;
    left: 16px;

    @extend .pa-16--xs;
    @include tablet-and-up {
      :global(a) {
        color: color(white);
      }
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 100%;

    @extend .pa-4;
    @include tablet-and-up {
      bottom: 8px;
    }
  }

  &__item > * {
    transition: opacity 0.2s ease-in-out;
  }

  &__item:hover > * {
    opacity: 1;
  }

  &__button {
    min-width: 138px;

    border-radius: 0;

    &--like {
      @extend .text--size-14;
    }

    &--use {
      @extend .text--size-16;
    }
  }

  &__escrow-label {
    color: color(gray-e6);

    @extend .text--size-10, .text--weight-600, .text--color-gray-9b--xs;

    span {
      @extend .text--underline, .text--capitalize;
    }
  }
}
</style>

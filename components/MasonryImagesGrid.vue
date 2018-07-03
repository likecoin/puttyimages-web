<template>
  <div class="masonry-images-grid">
    <div
      v-for="image in images"
      :key="image.url"
      class="masonry-images-grid__item"
    >
      <img
        :src="image.url"
        class="masonry-images-grid__image"
        @click="openDetails(image)"
      >
      <user-badge
        :user="image.user"
        class="masonry-images-grid__button masonry-images-grid__button--user"
      />
      <like-button
        :count="image.like.count"
        class="masonry-images-grid__button masonry-images-grid__button--like"
      />
      <v-btn
        class="btn--likecoin masonry-images-grid__button masonry-images-grid__button--use"
        color="secondary"
        @click="openDetails(image, { isUseImage: true })"
      >
        Use Image
      </v-btn>
    </div>
  </div>
</template>

<script>
import LikeButton from '~/components/LikeButton';
import UserBadge from '~/components/UserBadge';

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
    openDetails(image, options = {}) {
      this.$emit('open-details', image, options);
    },
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
    align-items: center;
    justify-content: center;

    break-inside: avoid;
    page-break-inside: avoid;

    min-height: 180px;

    padding-bottom: 10px;
  }

  &__image {
    max-width: 100%;
    max-height: (920 / 3) * 2px;
  }

  &__button {
    position: absolute;

    visibility: hidden;

    width: 138px;

    &--like {
      bottom: 15px;
      left: 15px;

      font-size: 14px;
    }

    &--use {
      right: 12px;
      bottom: 15px;

      font-size: 16px;
    }

    &--user {
      top: 20px;
      left: 18px;
    }
  }

  &__item:hover .masonry-images-grid__button {
    visibility: visible;
  }
}
</style>

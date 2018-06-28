<template>
  <div class="masonry">
    <div
      v-for="image in images"
      :key="image.url"
      class="masonry__item"
    >
      <img
        :src="image.url"
        class="masonry__image"
      >
      <user-badge
        :user="image.user"
        class="masonry__button masonry__button--user"
      />
      <like-button
        :count="image.like.count"
        class="masonry__button masonry__button--like"
      />
      <v-btn
        class="btn--likecoin masonry__button masonry__button--use"
        color="secondary"
      >
        Use Image
      </v-btn>
    </div>
  </div>
</template>

<script>
import LikeButton from '~/components/LikeButton';
import UserBadge from '~/components/UserBadge';

export default {
  name: 'masonry',
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
};
</script>


<style lang="scss" scoped>
@import '~assets/css/classes';

.masonry {
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

  &__item:hover .masonry__button {
    visibility: visible;
  }
}
</style>

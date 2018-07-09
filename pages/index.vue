<template>
  <div class="landing-page">

    <the-landing-carousel :images="getFeaturedImages" />

    <div class="landing-page__banner">
      <h1 class="landing-page__banner__slogan--line-1">
        {{ $t('Landing.Banner.label.sloganLine1') }}
      </h1>
      <h2 class="landing-page__banner__slogan--line-2">
        {{ $t('Landing.Banner.label.sloganLine2') }}
      </h2>

      <v-btn
        :to="{ name: 'upload' }"
        class="btn--likecoin mx-0 mt-32"
        color="secondary"
      >
        <v-icon>add_circle_outline</v-icon>
        <span>{{ $t('Landing.Banner.button.uploadImage') }}</span>
      </v-btn>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheLandingCarousel from '@/components/TheLandingCarousel';

export default {
  layout: 'index',
  components: {
    TheLandingCarousel,
  },
  async fetch({ store }) {
    if (store.state.ui.featuredImages.length === 0) {
      await store.dispatch('fetchFeaturedImages');
    }
  },
  data() {
    return {
      images: [],
    };
  },
  computed: {
    ...mapGetters(['getFeaturedImages']),
  },
  head() {
    return {
      title: 'puttyimages',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/classes';

.landing-page {
  &__banner {
    position: relative;

    max-width: 576px;

    @extend .mx-64--dy, .mt-32, .mt-16--xs, .pr-48;

    &__slogan--line-1 {
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

      @include mobile-only {
        max-width: 65vw;
      }

      @extend .text--color-white,
        .text--size-52,
        .text--size-44--sm,
        .text--size-32--xs,
        .text--height-1-2,
        .text--weight-600;
    }

    &__slogan--line-2 {
      max-width: 270px;

      text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);

      @extend .mt-8,
        .text--color-white,
        .text--size-24,
        .text--size-20--xs,
        .text--weight-400;
    }
  }
}
</style>
